// إضافة رحلة مع خيارات التكرار
export const addTripWithRepeat = (trip: Trip, repeat: {
    option: 'none' | 'daily' | 'weekly' | 'monthly',
    untilType: 'none' | 'week' | 'month' | 'date',
    untilDate?: string
}): Promise<{ trip: Trip; repeat: object }> => {
    MOCK_TRIPS.push(trip);
    // هنا يمكن محاكاة إضافة رحلات متكررة حسب الخيارات
    return simulateFetch({ trip, repeat });
};
// إضافة رحلة جديدة
export const addTrip = (trip: Trip): Promise<Trip> => {
    MOCK_TRIPS.push(trip);
    return simulateFetch(trip);
};
import { MOCK_TRIPS, MOCK_COMPANIES, MOCK_END_USERS, MOCK_STAFF, MOCK_DAILY_STATS, MOCK_TOP_TRIPS, MOCK_HEATMAP_DATA, MOCK_GOVERNATES } from './constants';
// المحافظات
export const getGovernates = (): Promise<string[]> => simulateFetch(MOCK_GOVERNATES);

export const addGovernate = (name: string): Promise<string[]> => {
    if (!MOCK_GOVERNATES.includes(name)) {
        MOCK_GOVERNATES.push(name);
    }
    return simulateFetch(MOCK_GOVERNATES);
};
import { Trip, Company, EndUser, Staff, DailyStat, TopTrip, HeatmapData } from './types';

// Simulate network delay
const API_DELAY = 800;

/**
 * A helper function to simulate a network request.
 * @param data The data to be returned by the mock API.
 * @returns A promise that resolves with the data after a delay.
 */
const simulateFetch = <T>(data: T): Promise<T> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(data);
        }, API_DELAY);
    });
};

// --- API Functions ---

export const getTrips = (): Promise<Trip[]> => simulateFetch(MOCK_TRIPS);

export const getCompanies = (): Promise<Company[]> => simulateFetch(MOCK_COMPANIES);

export const getEndUsers = (): Promise<EndUser[]> => simulateFetch(MOCK_END_USERS);

export const getStaff = (): Promise<Staff[]> => simulateFetch(MOCK_STAFF);


// --- Dashboard Specific APIs ---

export const getDashboardStats = (): Promise<{
    companiesCount: number;
    tripsCount: number;
    usersCount: number;
    totalConversions: number;
    topCompany: string;
    topRoute: string;
}> => {
    const totalConversions = MOCK_COMPANIES.reduce((sum, company) => sum + company.totalConversions, 0);
    const topCompany = MOCK_COMPANIES.sort((a, b) => b.totalConversions - a.totalConversions)[0]?.name || 'N/A';
    const topRoute = MOCK_TOP_TRIPS[0]?.route || 'N/A';
    
    return simulateFetch({
        companiesCount: MOCK_COMPANIES.length,
        tripsCount: MOCK_TRIPS.length,
        usersCount: MOCK_END_USERS.length,
        totalConversions,
        topCompany,
        topRoute,
    });
};

export const getDailyStats = (): Promise<DailyStat[]> => simulateFetch(MOCK_DAILY_STATS);

export const getTopTrips = (): Promise<TopTrip[]> => simulateFetch(MOCK_TOP_TRIPS);

export const getHeatmapData = (): Promise<HeatmapData[]> => simulateFetch(MOCK_HEATMAP_DATA);
