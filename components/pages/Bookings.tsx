import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import { getEndUsers } from '../../api';
import { EditIcon, DeleteIcon } from '../icons';
import { EndUser } from '../../types';
import Spinner from '../ui/Spinner';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<EndUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
        try {
            setLoading(true);
            const data = await getEndUsers();
            setUsers(data);
        } catch (err) {
            setError("فشل تحميل بيانات المستخدمين.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    loadUsers();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">إدارة المستخدمين</h1>
      </div>
      <Card>
      <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-3 px-4 font-semibold text-[#081b1f]">الاسم</th>
                <th className="py-3 px-4 font-semibold text-[#081b1f]">البريد الإلكتروني</th>
                <th className="py-3 px-4 font-semibold text-[#081b1f]">رقم الهاتف</th>
                <th className="py-3 px-4 font-semibold text-[#081b1f]">تاريخ التسجيل</th>
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
              ) : users.map(user => (
                <tr key={user.id} className="border-b hover:bg-gray-100 cursor-pointer">
                  <td className="py-3 px-4 text-gray-700 font-medium">{user.name}</td>
                  <td className="py-3 px-4 text-gray-700">{user.email}</td>
                  <td className="py-3 px-4 text-gray-700">{user.phone}</td>
                  <td className="py-3 px-4 text-gray-700">{user.registrationDate}</td>
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

export default UsersPage;