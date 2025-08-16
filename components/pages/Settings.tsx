
import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';

type Tab = 'general' | 'contact' | 'analytics' | 'import' | 'roles' | 'governates';

const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('general');

        const [governates, setGovernates] = useState<string[]>([]);
        const [newGovernate, setNewGovernate] = useState('');
        useEffect(() => {
            import('../../api').then(api => {
                api.getGovernates().then(setGovernates);
            });
        }, []);

        const handleAddGovernate = async () => {
            if (newGovernate.trim()) {
                const api = await import('../../api');
                const updated = await api.addGovernate(newGovernate.trim());
                setGovernates(updated);
                setNewGovernate('');
            }
        };

        const renderContent = () => {
                switch (activeTab) {
            case 'general':
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-[#081b1f]">الإعدادات العامة</h3>
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">اسم المنصة</label>
                            <input type="text" defaultValue="Tripoo" className="w-full p-2 rounded-md bg-gray-100 border border-gray-300 text-[#081b1f] focus:outline-none focus:ring-1 focus:ring-[#5bd4b0] focus:border-[#5bd4b0]"/>
                        </div>
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">اللوجو</label>
                            <input type="file" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#5bd4b0] file:text-white hover:file:bg-opacity-90 cursor-pointer"/>
                        </div>
                    </div>
                );
            case 'contact':
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-[#081b1f]">إعدادات التواصل</h3>
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">رابط فيسبوك</label>
                            <input type="url" placeholder="https://facebook.com/..." className="w-full p-2 rounded-md bg-gray-100 border border-gray-300 text-[#081b1f] focus:outline-none focus:ring-1 focus:ring-[#5bd4b0] focus:border-[#5bd4b0]"/>
                        </div>
                         <div>
                            <label className="block mb-2 font-medium text-gray-700">البريد الرسمي للتواصل</label>
                            <input type="email" placeholder="contact@tripoo.com" className="w-full p-2 rounded-md bg-gray-100 border border-gray-300 text-[#081b1f] focus:outline-none focus:ring-1 focus:ring-[#5bd4b0] focus:border-[#5bd4b0]"/>
                        </div>
                    </div>
                );
            case 'analytics':
                 return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-[#081b1f]">إعدادات التحليلات</h3>
                         <div>
                            <label className="block mb-2 font-medium text-gray-700">Google Analytics ID</label>
                            <input type="text" placeholder="UA-XXXXXXXXX-X" className="w-full p-2 rounded-md bg-gray-100 border border-gray-300 text-[#081b1f] focus:outline-none focus:ring-1 focus:ring-[#5bd4b0] focus:border-[#5bd4b0]"/>
                        </div>
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Facebook Pixel ID</label>
                            <input type="text" placeholder="ادخل ID البيكسل" className="w-full p-2 rounded-md bg-gray-100 border border-gray-300 text-[#081b1f] focus:outline-none focus:ring-1 focus:ring-[#5bd4b0] focus:border-[#5bd4b0]"/>
                        </div>
                    </div>
                );
            case 'import':
                 return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-[#081b1f]">استيراد البيانات</h3>
                        <p className="text-gray-600">يمكنك رفع ملف Excel يحتوي على رحلات جديدة لإضافتها دفعة واحدة.</p>
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">رفع ملف رحلات</label>
                            <input type="file" accept=".xlsx, .xls, .csv" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#5bd4b0] file:text-white hover:file:bg-opacity-90 cursor-pointer"/>
                        </div>
                    </div>
                 );
            case 'roles':
                 return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-[#081b1f]">الأدوار والصلاحيات</h3>
                        <p className="text-gray-600">تحكم في ما يمكن لكل دور من الموظفين الوصول إليه وتعديله.</p>
                        {/* A more complex UI would be here to manage permissions for each role */}
                        <div className="p-4 bg-gray-50 rounded-lg text-center">
                            <p>سيتم بناء واجهة إدارة الصلاحيات هنا.</p>
                        </div>
                    </div>
                 );
                        case 'governates':
                                return (
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold text-[#081b1f]">إدارة المحافظات</h3>
                                        <div className="flex gap-2 mb-4">
                                            <input
                                                type="text"
                                                placeholder="اسم المحافظة الجديدة"
                                                className="w-full h-10 px-4 rounded-lg bg-gray-100"
                                                value={newGovernate}
                                                onChange={e => setNewGovernate(e.target.value)}
                                            />
                                            <button
                                                className="bg-[#5bd4b0] text-white px-6 rounded-lg font-bold"
                                                onClick={handleAddGovernate}
                                                type="button"
                                            >
                                                إضافة
                                            </button>
                                        </div>
                                        <ul className="space-y-2">
                                            {governates.map((g, idx) => (
                                                <li key={idx} className="bg-gray-100 px-4 py-2 rounded-lg">{g}</li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                        default:
                                return null;
        }
    }
  
  const TabButton: React.FC<{tabId: Tab; currentTab: Tab; label: string;}> = ({ tabId, currentTab, label }) => (
       <button onClick={() => setActiveTab(tabId)} className={`py-2 px-4 transition-colors font-medium ${currentTab === tabId ? 'border-b-2 border-[#5bd4b0] text-[#5bd4b0]' : 'text-gray-500 hover:text-[#081b1f]'}`}>
           {label}
       </button>
  );

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">الإعدادات</h1>
      <Card>
        <div className="flex border-b border-gray-200 overflow-x-auto">
          <TabButton tabId="general" currentTab={activeTab} label="عامة" />
          <TabButton tabId="contact" currentTab={activeTab} label="التواصل" />
          <TabButton tabId="analytics" currentTab={activeTab} label="التحليلات" />
          <TabButton tabId="import" currentTab={activeTab} label="استيراد البيانات" />
          <TabButton tabId="roles" currentTab={activeTab} label="الأدوار والصلاحيات" />
          <TabButton tabId="governates" currentTab={activeTab} label="المحافظات" />
        </div>
        <div className="pt-6">
            {renderContent()}
        </div>
      </Card>
    </div>
  );
};

export default Settings;
