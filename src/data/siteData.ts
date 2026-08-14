import heroBanner from '../assets/images/hero_abacus_banner_1786583611651.jpg';
import abacusClassroom from '../assets/images/abacus_classroom_1786583625338.jpg';
import abacusStudents from '../assets/images/abacus_students_1786583636068.jpg';
import abacusAwards from '../assets/images/abacus_awards_ghana_1786584419267.jpg';
import abacusCompetition from '../assets/images/abacus_competition_1786584440210.jpg';
import abacusPractice from '../assets/images/abacus_practice_ghana_1786585138708.jpg';

export const SITE_INFO = {
  brandName: "SAMATHS SOLUTIONS",
  tagline: "Where logic meets creativity",
  headline: "Is Your Child Struggling With Maths?",
  subheadline: "We Make Maths Fast, Fun, and Easy with Abacus Mental Maths",
  phoneDisplay: "0536541414",
  phoneRaw: "233536541414",
  email: "a0257673416@icloud.com",
  momoNumber: "0536541414",
  momoAccountName: "SAMATHS SOLUTIONS Business MoMo",
  location: "Sunyani, Accra, and all parts of Ghana",
  
  about: {
    title: "ABOUT US",
    leadText: "At SAMATHS SOLUTIONS, we believe every child can be a Maths champion.",
    description: "We are a leading Abacus Mental Maths company in Accra, Sunyani, Ghana. We partner with schools to deliver fun, brain-boosting classes that transform how children think, learn, and calculate.",
    methodology: "In just 2 classes a week, our certified teachers use the abacus to train children’s brains for speed, accuracy, focus and confidence.",
    currentServedSchools: "30 schools",
    totalStudents: "800+",
    schoolsPartnered: "8 and growing"
  },

  program: {
    title: "OUR PROGRAM",
    name: "School Abacus Program - 2x a Week",
    tagline: "We come to your school and handle everything.",
    ages: "4 - 14 years",
    duration: "1 term = 12 weeks",
    fee: "Per term",
    learningOutcomes: [
      {
        number: 1,
        title: "Mental Calculation",
        description: "Add, subtract, multiply & divide without a calculator",
        icon: "Calculator"
      },
      {
        number: 2,
        title: "Concentration & Memory",
        description: "Stay focused longer in class",
        icon: "Brain"
      },
      {
        number: 3,
        title: "Speed & Accuracy",
        description: "Finish homework and exams faster",
        icon: "Zap"
      },
      {
        number: 4,
        title: "Confidence",
        description: "No more fear of Maths",
        icon: "Smile"
      }
    ]
  },

  whyChooseUs: [
    {
      title: "Proven Results",
      description: "See improvement in class within 1 term",
      icon: "TrendingUp"
    },
    {
      title: "Stress-Free for Schools",
      description: "We provide teachers, materials & reports",
      icon: "ShieldCheck"
    },
    {
      title: "Fun Lessons",
      description: "Kids look forward to abacus day",
      icon: "Sparkles"
    },
    {
      title: "Affordable",
      description: "Accessible, quality brain-boosting education per term",
      icon: "Banknote"
    },
    {
      title: "Progress Reports",
      description: "Parents get updates every term",
      icon: "FileCheck"
    }
  ],

  ourReach: {
    title: "OUR REACH",
    description: "We are proud to work with schools across Sunyani and Ghana to build the next generation of smart, confident problem solvers.",
    stats: [
      { label: "Total Students Trained", value: 800, suffix: "+", prefix: "" },
      { label: "Schools Currently Served", value: 30, suffix: " Schools", prefix: "" },
      { label: "Schools Partnered", value: 8, suffix: " & Growing", prefix: "" },
      { label: "Weekly Classes", value: 2, suffix: "x / Week", prefix: "" }
    ]
  },

  gallery: [
    {
      id: "gal-1",
      title: "Interactive Abacus Classroom Session",
      category: "Classroom Lessons",
      location: "Sunyani School Partner",
      imageUrl: abacusClassroom,
      description: "Certified SAMATHS instructors leading engaging hands-on abacus mental calculation lessons."
    },
    {
      id: "gal-2",
      title: "Focused Mental Arithmetic Practice",
      category: "Classroom Lessons",
      location: "Accra Partner Campus",
      imageUrl: abacusStudents,
      description: "Students developing speed, precision, and concentration using abacus bead movements."
    },
    {
      id: "gal-3",
      title: "Abacus Excellence Awards & Certificates",
      category: "Certificates & Awards",
      location: "Sunyani, Ghana",
      imageUrl: abacusAwards,
      description: "Proud pupils celebrating end-of-term abacus progress certificates and medals."
    },
    {
      id: "gal-4",
      title: "Inter-School Abacus Speed Competition",
      category: "Competitions & Demos",
      location: "Bono Region School League",
      imageUrl: abacusCompetition,
      description: "Students demonstrating rapid calculator-free addition and multiplication in live challenges."
    },
    {
      id: "gal-5",
      title: "Live Abacus Demo for School Headmistress",
      category: "Competitions & Demos",
      location: "Sunyani",
      imageUrl: heroBanner,
      description: "Demonstrating brain training results to school administrators during free trial sessions."
    },
    {
      id: "gal-6",
      title: "Library Abacus Speed Calculation Practice",
      category: "Classroom Lessons",
      location: "Sunyani Elementary Library",
      imageUrl: abacusPractice,
      description: "Pupils practicing multi-digit addition and subtraction using colorful abacus frames."
    }
  ],

  cta: {
    forParents: {
      title: "FOR PARENTS",
      lead: "Give your child the brain advantage.",
      action: "Register your child today. Limited slots per school.",
      paymentNote: "Pay to Business MoMo: [0536541414]"
    },
    forSchools: {
      title: "FOR SCHOOL OWNERS & HEADMISTRESSES",
      lead: "Partner with SAMATHS SOLUTIONS and make your school the #1 for Maths excellence.",
      action: "Book a session for your students today."
    }
  },

  images: {
    heroBanner,
    abacusClassroom,
    abacusStudents,
    abacusAwards,
    abacusCompetition,
    abacusPractice
  }
};
