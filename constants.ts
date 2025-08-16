export const MOCK_GOVERNATES: string[] = [
  'القاهرة',
  'الإسكندرية',
  'الجيزة',
  'المنيا',
  'أسيوط',
  'سوهاج',
  'قنا',
  'الأقصر',
  'أسوان',
  'الغردقة',
  'شرم الشيخ',
  'دمياط',
  'بور سعيد',
  'طنطا',
  'الفيوم',
  'مطروح',
  'دهب',
];

import { Trip, Company, EndUser, Staff, DailyStat, TopTrip, HeatmapData } from './types';

export const MOCK_TRIPS: Trip[] = [
  {
    id: 'TR-101',
    company: 'النقل السريع',
    companyLogo: 'https://picsum.photos/seed/fast/40/40',
    route: { from: 'القاهرة', to: 'الإسكندرية' },
    departureTime: '08:00 ص',
    duration: '3 ساعات',
    stopsDeparture: [{ name: 'طنطا', arrivalTime: '09:30 ص' }],
    stopsArrival: [],
    clicks: 1250,
    status: 'نشطة',
    price: 150,
    conversionLink: 'https://example.com/fast-bus/cai-alex',
    services: ['wifi', 'bathroom', 'general_screen'],
    seatTypes: ['economy', 'business'],
    pricesBetweenStations: []
  },
  {
    id: 'TR-102',
    company: 'الرحلات الذهبية',
    companyLogo: 'https://picsum.photos/seed/golden/40/40',
    route: { from: 'القاهره', to: 'سوهاج' },
    departureTime: '10:30 م',
    duration: '9 ساعات',
    stopsDeparture: [],
    stopsArrival: [],
    clicks: 2300,
    status: 'نشطة',
    price: 250,
    conversionLink: 'https://example.com/golden/ryd-jed',
    services: ['wifi', 'private_screen', 'meals', 'bathroom'],
    seatTypes: ['vip', 'business'],
    pricesBetweenStations: []
  },
  {
    id: 'TR-103',
    company: 'سوبر جيت',
    companyLogo: 'https://picsum.photos/seed/super/40/40',
    route: { from: 'الأقصر', to: 'أسوان' },
    departureTime: '09:00 ص',
    duration: '4 ساعات',
    stopsDeparture: [{ name: 'كوم أمبو', arrivalTime: '11:00 ص' }],
    stopsArrival: [{ name: 'إدفو', arrivalTime: '12:00 م' }],
    clicks: 950,
    status: 'متوقفة',
    price: 80,
    conversionLink: 'https://example.com/superjet/lux-asw',
    services: ['bathroom'],
    seatTypes: ['economy'],
    pricesBetweenStations: []
  },
  {
    id: 'TR-104',
    company: 'بلو باص',
    companyLogo: 'https://picsum.photos/seed/blue/40/40',
    route: { from: 'دهب', to: 'القاهرة' },
    departureTime: '11:00 م',
    duration: '8 ساعات',
    stopsDeparture: [{ name: 'شرم الشيخ', arrivalTime: '12:00 ص' }],
    stopsArrival: [],
    clicks: 1800,
    status: 'نشطة',
    price: 280,
    conversionLink: 'https://example.com/bluebus/dhb-cai',
    services: ['wifi', 'private_screen', 'drinks'],
    seatTypes: ['economy', 'business'],
    pricesBetweenStations: []
  },
];

export const MOCK_COMPANIES: Company[] = [
  {
    id: 'CO-01',
    name: 'النقل السريع',
    logo: 'https://picsum.photos/seed/fast/40/40',
    whatsapp: '201012345678',
    website: 'https://fastbus.com',
    tripCount: 32,
    conversionRate: '15.2%',
    totalConversions: 5820,
    branches: [
  { name: 'فرع القاهرة', address: 'شارع التحرير، وسط البلد، القاهرة', locationLink: 'https://maps.google.com/?q=القاهرة', governate: 'القاهرة' },
  { name: 'فرع الإسكندرية', address: 'شارع فؤاد، محطة الرمل، الإسكندرية', locationLink: 'https://maps.google.com/?q=الإسكندرية', governate: 'الإسكندرية' },
  { name: 'فرع طنطا', address: 'شارع الجيش، طنطا', locationLink: 'https://maps.google.com/?q=طنطا', governate: 'طنطا' },
    ],
  },
  {
    id: 'CO-02',
    name: 'الرحلات الذهبية',
    logo: 'https://picsum.photos/seed/golden/40/40',
    whatsapp: '966501234567',
    website: 'https://golden.sa',
    tripCount: 18,
    conversionRate: '21.5%',
    totalConversions: 9850,
    branches: [
  { name: 'فرع سوهاج', address: 'شارع الجمهورية، سوهاج', locationLink: 'https://maps.google.com/?q=سوهاج', governate: 'سوهاج' },
  { name: 'فرع القاهرة', address: 'شارع النصر، مدينة نصر، القاهرة', locationLink: 'https://maps.google.com/?q=مدينة+نصر', governate: 'القاهرة' },
  { name: 'فرع المنيا', address: 'شارع طه حسين، المنيا', locationLink: 'https://maps.google.com/?q=المنيا', governate: 'المنيا' },
    ],
  },
  {
    id: 'CO-03',
    name: 'سوبر جيت',
    logo: 'https://picsum.photos/seed/super/40/40',
    whatsapp: '201212345678',
    website: 'https://superjet.com.eg',
    tripCount: 55,
    conversionRate: '11.8%',
    totalConversions: 7340,
    branches: [
  { name: 'فرع الأقصر', address: 'محطة القطار، الأقصر', locationLink: 'https://maps.google.com/?q=الأقصر', governate: 'الأقصر' },
  { name: 'فرع أسوان', address: 'شارع الكورنيش، أسوان', locationLink: 'https://maps.google.com/?q=أسوان', governate: 'أسوان' },
  { name: 'فرع قنا', address: 'شارع البحر، قنا', locationLink: 'https://maps.google.com/?q=قنا', governate: 'قنا' },
    ],
  },
  {
    id: 'CO-04',
    name: 'بلو باص',
    logo: 'https://picsum.photos/seed/blue/40/40',
    whatsapp: '201512345678',
    website: 'https://bluebus.com.eg',
    tripCount: 25,
    conversionRate: '18.3%',
    totalConversions: 4100,
    branches: [
  { name: 'فرع دهب', address: 'طريق دهب الرئيسي، دهب', locationLink: 'https://maps.google.com/?q=دهب', governate: 'دهب' },
  { name: 'فرع شرم الشيخ', address: 'شارع السلام، شرم الشيخ', locationLink: 'https://maps.google.com/?q=شرم+الشيخ', governate: 'شرم الشيخ' },
  { name: 'فرع الغردقة', address: 'شارع النصر، الغردقة', locationLink: 'https://maps.google.com/?q=الغردقة', governate: 'الغردقة' },
    ],
  },
];

export const MOCK_END_USERS: EndUser[] = [
  { id: 'EU-01', name: 'أحمد محمود', email: 'ahmed.m@example.com', phone: '01098765432', registrationDate: '2023-05-12', lastLogin: 'منذ 3 أيام' },
  { id: 'EU-02', name: 'فاطمة الزهراء', email: 'fatima.z@example.com', phone: '01112345678', registrationDate: '2023-08-20', lastLogin: 'اليوم' },
  { id: 'EU-03', name: 'خالد وليد', email: 'khaled.w@example.com', phone: '01234567890', registrationDate: '2024-01-05', lastLogin: 'هذا الأسبوع' },
];

export const MOCK_STAFF: Staff[] = [
    { id: 'ST-01', name: 'علي حسن', email: 'ali.hassan@tripoo.com', role: 'مدير', joinDate: '2022-01-15', lastLogin: 'منذ 5 دقائق' },
    { id: 'ST-02', name: 'منى صالح', email: 'mona.saleh@tripoo.com', role: 'مشرف', joinDate: '2022-08-01', lastLogin: 'منذ ساعتين' },
    { id: 'ST-03', name: 'كريم عبد الله', email: 'karim.a@tripoo.com', role: 'محرر بيانات', joinDate: '2023-02-10', lastLogin: 'بالأمس' },
];

// --- New Dashboard Analytics Data ---

export const MOCK_DAILY_STATS: DailyStat[] = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const clicks = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
    const conversions = Math.floor(clicks * (Math.random() * (0.2 - 0.05) + 0.05));
    return {
        day: `${date.getDate()}/${date.getMonth() + 1}`,
        clicks: clicks,
        conversions: conversions,
    };
});

export const MOCK_TOP_TRIPS: TopTrip[] = [
    { id: 'TR-102', route: 'سوهاج → القاهرة', visits: 22100, conversions: 2300 },
    { id: 'TR-104', route: 'دهب → القاهرة', visits: 18500, conversions: 1800 },
    { id: 'TR-101', route: 'القاهرة → الإسكندرية', visits: 25800, conversions: 1250 },
    { id: 'TR-103', route: 'الأقصر → أسوان', visits: 15300, conversions: 950 },
    { id: 'TR-XYZ', route: 'القاهرة → الغردقة', visits: 14900, conversions: 920 },
];

export const MOCK_HEATMAP_DATA: HeatmapData[] = [
    { city: 'القاهرة', weight: 10 },
    { city: 'بور سعيد', weight: 9 },
    { city: 'سوهاح', weight: 8 },
    { city: 'الإسكندرية', weight: 8 },
    { city: 'دهب', weight: 7 },
    { city: 'الغردقة', weight: 6 },
    { city: 'شرم الشيخ', weight: 6 },
    { city: 'الأقصر', weight: 5 },
    { city: 'دمياط', weight: 5 },
    { city: 'أسوان', weight: 4 },
];
