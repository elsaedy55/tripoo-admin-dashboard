import React, { useState, useMemo, useEffect } from 'react';
import { getTrips, getCompanies, addTrip } from '../../api';
import Card from '../ui/Card';
import { EditIcon, DeleteIcon, SearchIcon, WifiIcon, TvIcon } from '../icons';
import AddTripModal from './AddTripModal';
import { TripStatus, Service, Trip, Company } from '../../types';
import Spinner from '../ui/Spinner';

const TRIPS_PER_PAGE = 10;

const serviceIcons: Record<Service, React.ReactNode> = {
  wifi: <span title="واي فاي"><WifiIcon className="w-4 h-4 text-blue-500" /></span>,
  bathroom: <span title="حمام">🚻</span>,
  general_screen: <span title="شاشة عامة"><TvIcon className="w-4 h-4 text-gray-600" /></span>,
  private_screen: <span title="شاشة خاصة"><TvIcon className="w-4 h-4 text-purple-500" /></span>,
  meals: <span title="وجبات">🍴</span>,
  drinks: <span title="مشروبات">🥤</span>,
};

const Trips: React.FC = () => {
  const [allTrips, setAllTrips] = useState<Trip[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<{ company: string; service: string }>({ company: 'all', service: 'all' });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleAddTrip = async (trip: Trip) => {
    setLoading(true);
    await addTrip(trip);
    const tripsData = await getTrips();
    setAllTrips(tripsData);
    setLoading(false);
  };

  useEffect(() => {
    const loadData = async () => {
        try {
            setLoading(true);
            const [tripsData, companiesData] = await Promise.all([getTrips(), getCompanies()]);
            setAllTrips(tripsData);
            setCompanies(companiesData);
        } catch (err) {
            setError("فشل تحميل بيانات الرحلات.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    loadData();
  }, []);

  const filteredTrips = useMemo(() => {
    if (loading) return [];
    return allTrips.filter(trip => {
      const searchMatch =
        trip.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.route.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.route.to.toLowerCase().includes(searchTerm.toLowerCase());

      const companyMatch = filters.company === 'all' || trip.company === filters.company;
      const serviceMatch = filters.service === 'all' || trip.services.includes(filters.service as Service);
      
      return searchMatch && companyMatch && serviceMatch;
    });
  }, [searchTerm, filters, allTrips, loading]);

  const totalPages = Math.ceil(filteredTrips.length / TRIPS_PER_PAGE);
  const paginatedTrips = filteredTrips.slice(
    (currentPage - 1) * TRIPS_PER_PAGE,
    currentPage * TRIPS_PER_PAGE
  );

  const getStatusColor = (status: TripStatus) => {
    return status === 'نشطة' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">إدارة الرحلات</h1>
        <button
          className="bg-[#5bd4b0] text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors text-lg"
          onClick={() => setIsAddModalOpen(true)}
        >
          إضافة رحلة
        </button>
      </div>
      <AddTripModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        companies={companies}
        onAddTrip={handleAddTrip}
      />

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative md:col-span-1">
            <SearchIcon className="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="بحث حي..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full h-10 px-4 pr-10 rounded-lg bg-gray-100 text-[#081b1f] focus:outline-none focus:ring-2 focus:ring-[#5bd4b0]"
            />
          </div>
          <select 
            className="w-full h-10 px-4 rounded-lg bg-gray-100 text-[#081b1f] focus:outline-none focus:ring-2 focus:ring-[#5bd4b0]"
            value={filters.company}
            onChange={e => setFilters(f => ({ ...f, company: e.target.value }))}
          >
            <option value="all">كل الشركات</option>
            {companies.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          <select 
            className="w-full h-10 px-4 rounded-lg bg-gray-100 text-[#081b1f] focus:outline-none focus:ring-2 focus:ring-[#5bd4b0]"
            value={filters.service}
            onChange={e => setFilters(f => ({ ...f, service: e.target.value }))}
          >
            <option value="all">كل الخدمات</option>
            <option value="wifi">واي فاي</option>
            <option value="private_screen">شاشة خاصة</option>
            <option value="meals">وجبات</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-3 px-4 font-semibold text-[#081b1f]">الشركة</th>
                <th className="py-3 px-4 font-semibold text-[#081b1f]">خط السير</th>
                <th className="py-3 px-4 font-semibold text-[#081b1f]">الانطلاق</th>
                <th className="py-3 px-4 font-semibold text-[#081b1f]">المدة</th>
                <th className="py-3 px-4 font-semibold text-[#081b1f]">الخدمات</th>
                <th className="py-3 px-4 font-semibold text-[#081b1f]">النقرات</th>
                <th className="py-3 px-4 font-semibold text-[#081b1f]">الحالة</th>
                <th className="py-3 px-4 font-semibold text-[#081b1f]">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-16">
                    <div className="flex justify-center">
                      <Spinner />
                    </div>
                  </td>
                </tr>
              ) : error ? (
                 <tr>
                  <td colSpan={8} className="text-center py-16 text-red-500 font-semibold">{error}</td>
                </tr>
              ) : paginatedTrips.map(trip => (
                <tr key={trip.id} className="border-b hover:bg-gray-100 cursor-pointer">
                  <td className="py-3 px-4 text-gray-700 font-medium flex items-center">
                    <img src={trip.companyLogo} alt={trip.company} className="w-8 h-8 rounded-full me-3"/>
                    {trip.company}
                  </td>
                  <td className="py-3 px-4 text-gray-700">{`${trip.route.from} → ${trip.route.to}`}</td>
                  <td className="py-3 px-4 text-gray-700">{trip.departureTime}</td>
                  <td className="py-3 px-4 text-gray-700">{trip.duration}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-start gap-2">
                        {trip.services.map(s => <span key={s}>{serviceIcons[s]}</span>)}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700 font-bold">{trip.clicks}</td>
                  <td className="py-3 px-4 text-gray-700">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(trip.status)}`}>
                      {trip.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex items-center justify-center space-x-2 space-x-reverse">
                    <button className="p-2 text-blue-500 hover:text-blue-700"><EditIcon className="w-5 h-5"/></button>
                    <button className="p-2 text-red-500 hover:text-red-700"><DeleteIcon className="w-5 h-5"/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {!loading && !error && (
            <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-600">
                    عرض {paginatedTrips.length} من {filteredTrips.length} رحلة
                </span>
                <div className="flex items-center space-x-2 space-x-reverse">
                    <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    >
                    السابق
                    </button>
                    <span className="text-sm font-bold">
                    صفحة {currentPage} من {totalPages}
                    </span>
                    <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    >
                    التالي
                    </button>
                </div>
            </div>
        )}
      </Card>
    </div>
  );
};

export default Trips;