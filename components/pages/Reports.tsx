
import React from 'react';
import Card from '../ui/Card';

const Reports: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">التقارير</h1>
        <div className="flex space-x-2 space-x-reverse">
            <button className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">تصدير Excel</button>
            <button className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">تصدير PDF</button>
        </div>
      </div>
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Filters */}
            <div className="md:col-span-1 space-y-4">
                <h3 className="text-xl font-semibold">إعدادات التقرير</h3>
                 <div>
                    <label htmlFor="date-range" className="block text-sm font-medium text-[#081b1f] mb-1 text-right">اختر الفترة</label>
                    <select id="date-range" name="date-range" className="mt-1 block w-full p-2 text-base bg-gray-100 border-gray-300 text-[#081b1f] focus:outline-none focus:ring-1 focus:ring-[#5bd4b0] focus:border-[#5bd4b0] rounded-md">
                        <option>آخر 7 أيام</option>
                        <option>آخر 30 يوم</option>
                        <option>هذا الشهر</option>
                        <option>مخصص</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="report-type" className="block text-sm font-medium text-[#081b1f] mb-1 text-right">نوع التقرير</label>
                    <select id="report-type" name="report-type" className="mt-1 block w-full p-2 text-base bg-gray-100 border-gray-300 text-[#081b1f] focus:outline-none focus:ring-1 focus:ring-[#5bd4b0] focus:border-[#5bd4b0] rounded-md">
                        <option>تقرير إجمالي التحويلات</option>
                        <option>تقرير أداء الشركات</option>
                        <option>تقرير أداء الرحلات</option>
                        <option>تقرير المستخدمين النشطين</option>
                        <option>تقرير المدن الأكثر طلباً</option>
                    </select>
                </div>
                <button className="w-full bg-[#5bd4b0] text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
                    إنشاء التقرير
                </button>
            </div>
            {/* Report Display Area */}
            <div className="md:col-span-3">
                <Card>
                    <div className="flex flex-col items-center justify-center h-96 text-center border-2 border-dashed border-gray-300 rounded-lg">
                        <h2 className="text-2xl font-semibold text-[#081b1f]">عرض التقرير</h2>
                        <p className="mt-2 text-gray-600">
                           اختر الإعدادات ثم اضغط على "إنشاء التقرير" لعرض البيانات هنا.
                        </p>
                    </div>
                </Card>
            </div>
        </div>
      </Card>
    </div>
  );
};

export default Reports;
