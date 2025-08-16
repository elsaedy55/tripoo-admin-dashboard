import React, { useState, useEffect } from 'react';
import { getCompanies } from '../../api';
import Card from '../ui/Card';
import { EditIcon, DeleteIcon, PhoneIcon, GlobeIcon } from '../icons';
import { Company } from '../../types';
import Spinner from '../ui/Spinner';
import AddCompanyModal from './AddCompanyModal';

const Companies: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleAddCompany = (company: Company) => {
    setCompanies(prev => [...prev, company]);
  };

    useEffect(() => {
        const loadCompanies = async () => {
            try {
                setLoading(true);
                const data = await getCompanies();
                setCompanies(data);
            } catch (err) {
                setError("فشل تحميل بيانات الشركات.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadCompanies();
    }, []);


    // NOTE FOR DEVS: Clicking a row should navigate to `/companies/${company.id}` which would show a detailed view.
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">إدارة الشركات</h1>
        <button
          className="bg-[#5bd4b0] text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors text-lg"
          onClick={() => setIsAddOpen(true)}
        >
          إضافة شركة
        </button>
      </div>
      <AddCompanyModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAddCompany={handleAddCompany}
      />

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-3 px-4 font-semibold text-[#081b1f] text-right">الشركة</th>
                <th className="py-3 px-4 font-semibold text-[#081b1f] text-center">التواصل</th>
                <th className="py-3 px-4 font-semibold text-[#081b1f] text-center">عدد الرحلات</th>
                <th className="py-3 px-4 font-semibold text-[#081b1f] text-center">معدل التحويل</th>
                <th className="py-3 px-4 font-semibold text-[#081b1f] text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-16">
                    <div className="flex justify-center">
                      <Spinner />
                    </div>
                  </td>
                </tr>
              ) : error ? (
                 <tr>
                  <td colSpan={5} className="text-center py-16 text-red-500 font-semibold">{error}</td>
                </tr>
              ) : companies.map(company => (
                <tr key={company.id} className="border-b hover:bg-gray-100 cursor-pointer">
                  <td className="py-3 px-4 flex items-center text-gray-700 font-medium">
                    <img src={company.logo} alt={company.name} className="w-10 h-10 rounded-full me-4"/>
                    {company.name}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    <div className="flex items-center justify-center space-x-3 space-x-reverse">
                        <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-700">
                           <PhoneIcon className="w-5 h-5"/>
                        </a>
                        <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                           <GlobeIcon className="w-5 h-5"/>
                        </a>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-center">{company.tripCount}</td>
                  <td className="py-3 px-4 text-green-600 font-bold text-center">{company.conversionRate}</td>
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

export default Companies;