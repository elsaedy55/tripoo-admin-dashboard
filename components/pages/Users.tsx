import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import { getStaff } from '../../api';
import { EditIcon, DeleteIcon } from '../icons';
import { Staff, StaffRole } from '../../types';
import Spinner from '../ui/Spinner';

const StaffPage: React.FC = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStaff = async () => {
        try {
            setLoading(true);
            const data = await getStaff();
            setStaff(data);
        } catch (err) {
            setError("فشل تحميل بيانات الموظفين.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    loadStaff();
  }, []);

  const getRoleColor = (role: StaffRole) => {
    switch (role) {
      case 'مدير': return 'bg-red-200 text-red-800';
      case 'مشرف': return 'bg-blue-200 text-blue-800';
      case 'محرر بيانات': return 'bg-green-200 text-green-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">إدارة الموظفين</h1>
        <button className="bg-[#5bd4b0] text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors text-lg">
          إضافة موظف
        </button>
      </div>
      <Card>
      <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-3 px-4 font-semibold text-[#081b1f]">الاسم</th>
                <th className="py-3 px-4 font-semibold text-[#081b1f]">البريد الإلكتروني</th>
                <th className="py-3 px-4 font-semibold text-[#081b1f]">الدور</th>
                <th className="py-3 px-4 font-semibold text-[#081b1f]">تاريخ الانضمام</th>
                <th className="py-3 px-4 font-semibold text-[#081b1f]">آخر دخول</th>
                <th className="py-3 px-4 font-semibold text-[#081b1f]">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-16">
                    <div className="flex justify-center">
                      <Spinner />
                    </div>
                  </td>
                </tr>
              ) : error ? (
                 <tr>
                  <td colSpan={6} className="text-center py-16 text-red-500 font-semibold">{error}</td>
                </tr>
              ) : staff.map(user => (
                <tr key={user.id} className="border-b hover:bg-gray-100 cursor-pointer">
                  <td className="py-3 px-4 text-gray-700 font-medium">{user.name}</td>
                  <td className="py-3 px-4 text-gray-700">{user.email}</td>
                  <td className="py-3 px-4 text-gray-700">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRoleColor(user.role)}`}>
                        {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{user.joinDate}</td>
                  <td className="py-3 px-4 text-gray-700">{user.lastLogin}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center space-x-2 space-x-reverse">
                        <button className="p-2 text-blue-500 hover:text-blue-700"><EditIcon className="w-5 h-5"/></button>
                        <button className="p-2 text-red-500 hover:text-red-700"><DeleteIcon className="w-5 h-5"/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default StaffPage;