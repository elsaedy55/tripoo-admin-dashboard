import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import { BusIcon, BuildingIcon, TrendingUpIcon, UsersIcon, MapIcon, ArrowRightLeftIcon } from '../icons';
import { getDashboardStats, getDailyStats, getTopTrips, getHeatmapData } from '../../api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Spinner from '../ui/Spinner';
import { DailyStat, TopTrip, HeatmapData } from '../../types';

interface DashboardStats {
    companiesCount: number;
    tripsCount: number;
    usersCount: number;
    totalConversions: number;
    topCompany: string;
    topRoute: string;
}

const KpiCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; small?: boolean }> = ({ title, value, icon, small = false }) => (
  <Card className="flex items-center">
    <div className={`p-3 bg-gray-100 rounded-lg me-4 ${small ? 'p-2' : 'p-3'}`}>
        {icon}
    </div>
    <div>
        <p className={`text-gray-600 ${small ? 'text-sm' : 'text-base'}`}>{title}</p>
        <p className={`font-bold text-[#081b1f] ${small ? 'text-xl' : 'text-2xl'}`}>{value}</p>
    </div>
  </Card>
);


const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [dailyStats, setDailyStats] = useState<DailyStat[]>([]);
  const [topTrips, setTopTrips] = useState<TopTrip[]>([]);
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);
            const [statsData, dailyStatsData, topTripsData, heatmapDataResult] = await Promise.all([
                getDashboardStats(),
                getDailyStats(),
                getTopTrips(),
                getHeatmapData(),
            ]);
            setStats(statsData);
            setDailyStats(dailyStatsData);
            setTopTrips(topTripsData);
            setHeatmapData(heatmapDataResult);
        } catch (err) {
            setError('فشل في تحميل بيانات لوحة التحكم. يرجى المحاولة مرة أخرى.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[calc(100vh-10rem)] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-8 bg-red-50 rounded-lg font-semibold">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">ملخص الأداء</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="عدد الشركات" value={stats?.companiesCount ?? 0} icon={<BuildingIcon className="w-7 h-7 text-[#5bd4b0]"/>} />
        <KpiCard title="عدد الرحلات" value={stats?.tripsCount ?? 0} icon={<BusIcon className="w-7 h-7 text-[#5bd4b0]"/>} />
        <KpiCard title="عدد المستخدمين" value={stats?.usersCount.toLocaleString() ?? 0} icon={<UsersIcon className="w-7 h-7 text-[#5bd4b0]"/>} />
        <KpiCard title="إجمالي التحويلات" value={stats?.totalConversions.toLocaleString() ?? 0} icon={<TrendingUpIcon className="w-7 h-7 text-[#5bd4b0]"/>} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <KpiCard title="أكثر شركة بتحويلات" value={stats?.topCompany ?? 'N/A'} icon={<BuildingIcon className="w-6 h-6 text-[#5bd4b0]"/>} small/>
        <KpiCard title="أكثر خط سير نشاطًا" value={stats?.topRoute ?? 'N/A'} icon={<ArrowRightLeftIcon className="w-6 h-6 text-[#5bd4b0]"/>} small/>
      </div>

      <Card>
          <h2 className="text-2xl font-bold mb-4">النقرات والتحويلات (آخر 30 يوم)</h2>
          <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyStats} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis dataKey="day" stroke="#a1a1aa" fontSize={12} />
                  <YAxis stroke="#a1a1aa" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '0.5rem' }} />
                  <Legend />
                  <Line type="monotone" dataKey="clicks" name="النقرات" stroke="#8884d8" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="conversions" name="التحويلات" stroke="#5bd4b0" strokeWidth={2} dot={false} />
              </LineChart>
          </ResponsiveContainer>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3">
            <h2 className="text-2xl font-bold mb-4">أفضل 5 رحلات أداءً</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-right">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2 px-3 font-semibold text-[#081b1f]">خط السير</th>
                            <th className="py-2 px-3 font-semibold text-[#081b1f]">الزيارات</th>
                            <th className="py-2 px-3 font-semibold text-[#081b1f]">التحويلات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topTrips.map((item) => (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-3 text-gray-700 font-medium">{item.route}</td>
                                <td className="py-3 px-3 text-gray-700">{item.visits.toLocaleString()}</td>
                                <td className="py-3 px-3 text-green-600 font-bold">{item.conversions.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
        <Card className="lg:col-span-2">
            <div className="flex items-center mb-4">
                <MapIcon className="w-7 h-7 text-[#5bd4b0] me-3"/>
                <h2 className="text-2xl font-bold">خريطة نشاط المدن</h2>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
                 {heatmapData.sort((a,b) => b.weight - a.weight).map((item) => (
                    <div 
                        key={item.city} 
                        className="p-3 rounded-lg text-white font-bold flex items-center justify-center text-sm shadow-inner"
                        style={{ backgroundColor: `rgba(91, 212, 176, ${item.weight / 10})`}}
                    >
                        {item.city}
                    </div>
                ))}
            </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
