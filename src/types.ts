export interface DemoBookingData {
  schoolName: string;
  contactPerson: string;
  role: string;
  phone: string;
  email: string;
  location: string;
  estimatedStudents: string;
  preferredDate: string;
  additionalNotes?: string;
}

export interface ParentRegistrationData {
  childName: string;
  childAge: string;
  schoolName: string;
  parentName: string;
  phone: string;
  email: string;
  location: string;
  paymentMethod: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  userType: 'Parent' | 'School Owner/Headmistress' | 'Other';
  message: string;
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ProgramOutcome {
  number: number;
  title: string;
  description: string;
  icon: string;
}

export interface SchoolPartner {
  id: string;
  name: string;
  location: string;
  logoUrl?: string;
  badge: string;
}
