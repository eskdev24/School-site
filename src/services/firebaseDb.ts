import {
  ref,
  push,
  set,
  update,
  remove,
  onValue,
  serverTimestamp,
} from 'firebase/database';
import { rtdb, auth } from './firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface DatabaseErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleDatabaseError(error: unknown, operationType: OperationType, path: string | null): DatabaseErrorInfo {
  const errInfo: DatabaseErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
    },
    operationType,
    path
  };
  console.warn('Realtime Database Operation:', JSON.stringify(errInfo));
  return errInfo;
}

// Alias for backward compatibility if any component references it
export const handleFirestoreError = handleDatabaseError;

export interface FirebaseParentRegistration {
  id?: string;
  childName: string;
  childAge: string;
  schoolName: string;
  location: string;
  parentName: string;
  phone: string;
  email?: string;
  paymentMethod: string;
  paymentStatus: string;
  status: 'pending' | 'verified' | 'contacted' | 'enrolled';
  createdAt?: any;
  timestampDisplay?: string;
}

export interface FirebaseDemoBooking {
  id?: string;
  schoolName: string;
  location: string;
  contactPerson: string;
  role: string;
  phone: string;
  email?: string;
  estimatedStudents: string;
  preferredDate?: string;
  additionalNotes?: string;
  status: 'new' | 'contacted' | 'scheduled' | 'completed';
  createdAt?: any;
  timestampDisplay?: string;
}

export interface FirebaseContactInquiry {
  id?: string;
  fullName: string;
  phone: string;
  email?: string;
  role?: string;
  location?: string;
  subject?: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt?: any;
  timestampDisplay?: string;
}

const PARENT_PATH = 'parent_registrations';
const DEMO_PATH = 'demo_bookings';
const CONTACT_PATH = 'contact_inquiries';

// Helper for local display timestamp
const getAccraTimeString = () => {
  return new Date().toLocaleString('en-GB', {
    timeZone: 'Africa/Accra',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/* ============================================================
   PARENT REGISTRATIONS (REALTIME DATABASE)
============================================================ */

export async function saveParentRegistration(data: {
  childName: string;
  childAge: string;
  schoolName: string;
  location: string;
  parentName: string;
  phone: string;
  email?: string;
  paymentMethod?: string;
  paymentStatus?: string;
}): Promise<{ id: string; success: boolean }> {
  try {
    const parentRef = ref(rtdb, PARENT_PATH);
    const newRef = push(parentRef);
    const payload = {
      childName: data.childName.trim(),
      childAge: data.childAge,
      schoolName: data.schoolName.trim(),
      location: data.location,
      parentName: data.parentName.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || '',
      paymentMethod: data.paymentMethod || 'Business MoMo (0536541414)',
      paymentStatus: data.paymentStatus || 'Pending MoMo Verification',
      status: 'pending',
      timestampDisplay: getAccraTimeString(),
      createdAt: serverTimestamp(),
    };

    await set(newRef, payload);
    return { id: newRef.key || '', success: true };
  } catch (error) {
    handleDatabaseError(error, OperationType.CREATE, PARENT_PATH);
    throw error;
  }
}

export function subscribeParentRegistrations(
  onData: (items: FirebaseParentRegistration[]) => void,
  onError?: (error: Error) => void
) {
  const parentRef = ref(rtdb, PARENT_PATH);
  return onValue(
    parentRef,
    (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        onData([]);
        return;
      }
      const items: FirebaseParentRegistration[] = Object.keys(data).map((key) => {
        const item = data[key];
        return {
          id: key,
          childName: item.childName || '',
          childAge: item.childAge || '',
          schoolName: item.schoolName || '',
          location: item.location || '',
          parentName: item.parentName || '',
          phone: item.phone || '',
          email: item.email || '',
          paymentMethod: item.paymentMethod || 'Business MoMo',
          paymentStatus: item.paymentStatus || 'Pending',
          status: item.status || 'pending',
          timestampDisplay: item.timestampDisplay || 'Recently',
          createdAt: item.createdAt,
        };
      });
      // Sort newest first
      items.sort((a, b) => {
        const timeA = typeof a.createdAt === 'number' ? a.createdAt : 0;
        const timeB = typeof b.createdAt === 'number' ? b.createdAt : 0;
        return timeB - timeA;
      });
      onData(items);
    },
    (err) => {
      handleDatabaseError(err, OperationType.LIST, PARENT_PATH);
      if (onError) onError(err);
    }
  );
}

export async function updateParentRegistrationStatus(
  id: string,
  status: FirebaseParentRegistration['status'],
  paymentStatus?: string
) {
  try {
    const itemRef = ref(rtdb, `${PARENT_PATH}/${id}`);
    const updates: Record<string, any> = { status };
    if (paymentStatus) updates.paymentStatus = paymentStatus;
    await update(itemRef, updates);
  } catch (error) {
    handleDatabaseError(error, OperationType.UPDATE, `${PARENT_PATH}/${id}`);
    throw error;
  }
}

export async function deleteParentRegistration(id: string) {
  try {
    const itemRef = ref(rtdb, `${PARENT_PATH}/${id}`);
    await remove(itemRef);
  } catch (error) {
    handleDatabaseError(error, OperationType.DELETE, `${PARENT_PATH}/${id}`);
    throw error;
  }
}

/* ============================================================
   SCHOOL DEMO BOOKINGS (REALTIME DATABASE)
============================================================ */

export async function saveDemoBooking(data: {
  schoolName: string;
  location: string;
  contactPerson: string;
  role: string;
  phone: string;
  email?: string;
  estimatedStudents: string;
  preferredDate?: string;
  additionalNotes?: string;
}): Promise<{ id: string; success: boolean }> {
  try {
    const demoRef = ref(rtdb, DEMO_PATH);
    const newRef = push(demoRef);
    const payload = {
      schoolName: data.schoolName.trim(),
      location: data.location,
      contactPerson: data.contactPerson.trim(),
      role: data.role,
      phone: data.phone.trim(),
      email: data.email?.trim() || '',
      estimatedStudents: data.estimatedStudents,
      preferredDate: data.preferredDate || '',
      additionalNotes: data.additionalNotes?.trim() || '',
      status: 'new',
      timestampDisplay: getAccraTimeString(),
      createdAt: serverTimestamp(),
    };

    await set(newRef, payload);
    return { id: newRef.key || '', success: true };
  } catch (error) {
    handleDatabaseError(error, OperationType.CREATE, DEMO_PATH);
    throw error;
  }
}

export function subscribeDemoBookings(
  onData: (items: FirebaseDemoBooking[]) => void,
  onError?: (error: Error) => void
) {
  const demoRef = ref(rtdb, DEMO_PATH);
  return onValue(
    demoRef,
    (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        onData([]);
        return;
      }
      const items: FirebaseDemoBooking[] = Object.keys(data).map((key) => {
        const item = data[key];
        return {
          id: key,
          schoolName: item.schoolName || '',
          location: item.location || '',
          contactPerson: item.contactPerson || '',
          role: item.role || '',
          phone: item.phone || '',
          email: item.email || '',
          estimatedStudents: item.estimatedStudents || '',
          preferredDate: item.preferredDate || '',
          additionalNotes: item.additionalNotes || '',
          status: item.status || 'new',
          timestampDisplay: item.timestampDisplay || 'Recently',
          createdAt: item.createdAt,
        };
      });
      // Sort newest first
      items.sort((a, b) => {
        const timeA = typeof a.createdAt === 'number' ? a.createdAt : 0;
        const timeB = typeof b.createdAt === 'number' ? b.createdAt : 0;
        return timeB - timeA;
      });
      onData(items);
    },
    (err) => {
      handleDatabaseError(err, OperationType.LIST, DEMO_PATH);
      if (onError) onError(err);
    }
  );
}

export async function updateDemoBookingStatus(
  id: string,
  status: FirebaseDemoBooking['status']
) {
  try {
    const itemRef = ref(rtdb, `${DEMO_PATH}/${id}`);
    await update(itemRef, { status });
  } catch (error) {
    handleDatabaseError(error, OperationType.UPDATE, `${DEMO_PATH}/${id}`);
    throw error;
  }
}

export async function deleteDemoBooking(id: string) {
  try {
    const itemRef = ref(rtdb, `${DEMO_PATH}/${id}`);
    await remove(itemRef);
  } catch (error) {
    handleDatabaseError(error, OperationType.DELETE, `${DEMO_PATH}/${id}`);
    throw error;
  }
}

/* ============================================================
   CONTACT INQUIRIES (REALTIME DATABASE)
============================================================ */

export async function saveContactInquiry(data: {
  fullName: string;
  phone: string;
  email?: string;
  role?: string;
  location?: string;
  subject?: string;
  message: string;
}): Promise<{ id: string; success: boolean }> {
  try {
    const contactRef = ref(rtdb, CONTACT_PATH);
    const newRef = push(contactRef);
    const payload = {
      fullName: data.fullName.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || '',
      role: data.role || 'Parent',
      location: data.location || 'Sunyani',
      subject: data.subject || 'General Inquiry',
      message: data.message.trim(),
      status: 'unread',
      timestampDisplay: getAccraTimeString(),
      createdAt: serverTimestamp(),
    };

    await set(newRef, payload);
    return { id: newRef.key || '', success: true };
  } catch (error) {
    handleDatabaseError(error, OperationType.CREATE, CONTACT_PATH);
    throw error;
  }
}

export function subscribeContactInquiries(
  onData: (items: FirebaseContactInquiry[]) => void,
  onError?: (error: Error) => void
) {
  const contactRef = ref(rtdb, CONTACT_PATH);
  return onValue(
    contactRef,
    (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        onData([]);
        return;
      }
      const items: FirebaseContactInquiry[] = Object.keys(data).map((key) => {
        const item = data[key];
        return {
          id: key,
          fullName: item.fullName || '',
          phone: item.phone || '',
          email: item.email || '',
          role: item.role || 'Parent',
          location: item.location || '',
          subject: item.subject || 'General Inquiry',
          message: item.message || '',
          status: item.status || 'unread',
          timestampDisplay: item.timestampDisplay || 'Recently',
          createdAt: item.createdAt,
        };
      });
      // Sort newest first
      items.sort((a, b) => {
        const timeA = typeof a.createdAt === 'number' ? a.createdAt : 0;
        const timeB = typeof b.createdAt === 'number' ? b.createdAt : 0;
        return timeB - timeA;
      });
      onData(items);
    },
    (err) => {
      handleDatabaseError(err, OperationType.LIST, CONTACT_PATH);
      if (onError) onError(err);
    }
  );
}

export async function updateContactInquiryStatus(
  id: string,
  status: FirebaseContactInquiry['status']
) {
  try {
    const itemRef = ref(rtdb, `${CONTACT_PATH}/${id}`);
    await update(itemRef, { status });
  } catch (error) {
    handleDatabaseError(error, OperationType.UPDATE, `${CONTACT_PATH}/${id}`);
    throw error;
  }
}

export async function deleteContactInquiry(id: string) {
  try {
    const itemRef = ref(rtdb, `${CONTACT_PATH}/${id}`);
    await remove(itemRef);
  } catch (error) {
    handleDatabaseError(error, OperationType.DELETE, `${CONTACT_PATH}/${id}`);
    throw error;
  }
}
