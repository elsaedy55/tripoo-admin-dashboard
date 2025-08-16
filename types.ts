
export type TripStatus = 'نشطة' | 'متوقفة';
export type StaffRole = 'مدير' | 'مشرف' | 'محرر بيانات';

// --- Detailed Data Structures for New Spec ---

// Services and Seats for Trips
export type Service = 'wifi' | 'bathroom' | 'general_screen' | 'private_screen' | 'meals' | 'drinks';
export type SeatType = 'vip' | 'economy' | 'business';

// A single stop in a trip's route
export interface Stop {
  name: string;
  arrivalTime: string;
}

// مودل الرحلة (Trip) مرتب منطقياً
export interface Trip {
  // بيانات الشركة
  id: string;
  company: string;
  companyLogo: string;

  // خط السير الأساسي
  route: { from: string; to: string };
  departureTime: string;
  duration: string;

  // المحطات
  stopsDeparture: Stop[]; // محطات القيام
  stopsArrival: Stop[];   // محطات الوصول

  // الأسعار بين كل محطة قيام وكل محطة وصول
  pricesBetweenStations: { from: string; to: string; price: number }[];

  // الخدمات والمقاعد
  services: Service[];
  seatTypes: SeatType[];

  // بيانات إضافية
  price: number; // السعر الأساسي (من أول محطة لأخر محطة)
  status: TripStatus;
  clicks: number;
  conversionLink: string;
}

// The main Company entity
export interface Branch {
  name: string;
  address: string;
  locationLink: string;
  governate: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  whatsapp: string;
  website: string;
  tripCount: number;
  conversionRate: string;
  totalConversions: number;
  branches: Branch[];
}

// The End User entity
export interface EndUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  lastLogin: string;
}

// The Staff Member entity (formerly User)
export interface Staff {
  id: string;
  name: string;
  email: string;
  role: StaffRole;
  joinDate: string;
  lastLogin: string;
}

// --- Analytics Types for Dashboard ---

export interface DailyStat {
    day: string;
    clicks: number;
    conversions: number;
}

export interface TopTrip {
    id: string;
    route: string;
    visits: number;
    conversions: number;
}

export interface HeatmapData {
    city: string;
    weight: number;
}
