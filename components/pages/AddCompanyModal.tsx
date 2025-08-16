import React, { useState } from 'react';
import { MOCK_GOVERNATES } from '../../constants';
import Modal from '../ui/Modal';
import { Company, Branch } from '../../types';
import { PlusIcon, XIcon } from '../icons';

interface AddCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCompany: (company: Company) => void;
}

const defaultBranch: Branch = {
  name: '',
  address: '',
  locationLink: '',
  governate: '',
};
// ...existing code...
// تمت إزالة التصدير الافتراضي المكرر

const defaultCompany: Omit<Company, 'id'> = {
  name: '',
  logo: '',
  whatsapp: '',
  website: '',
  tripCount: 0,
  conversionRate: '0%',
  totalConversions: 0,
  branches: [],
};

const AddCompanyModal: React.FC<AddCompanyModalProps> = ({ isOpen, onClose, onAddCompany }) => {

  const [attachments, setAttachments] = useState<string[]>([]);
  const TABS = [
    "البيانات الأساسية",
    "بيانات التواصل",
    "الخدمات",
    "الفروع",
    "المرفقات"
  ];
  const [activeTab, setActiveTab] = useState(0);
  const [company, setCompany] = useState({ ...defaultCompany });
  const [branch, setBranch] = useState({ ...defaultBranch });
  const [branches, setBranches] = useState<Branch[]>([]);
  // تحقق من صحة رقم الهاتف المصري
  const isValidEgyptianPhone = (phone: string) => /^01[0125][0-9]{8}$/.test(phone);
  // تحقق من صحة البريد الإلكتروني
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // تحقق من صحة الرابط
  const isValidUrl = (url: string) => {
    try {
      if (!url) return true;
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  // رسائل تحقق فورية
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [branchMsg, setBranchMsg] = useState<string>('');

  const validateTab = (tabIndex: number) => {
    const newErrors: {[key: string]: string} = {};
    let ok = true;
    if (tabIndex === 0) {
      if (!company.name) { newErrors.name = 'اسم الشركة مطلوب'; ok = false; }
      if (!company.logo) { newErrors.logo = 'شعار الشركة مطلوب'; ok = false; }
    }
    if (tabIndex === 1) {
      if (!company.phone || !isValidEgyptianPhone(company.phone)) { newErrors.phone = 'رقم الهاتف غير صحيح'; ok = false; }
      if (!company.email || !isValidEmail(company.email)) { newErrors.email = 'البريد الإلكتروني غير صحيح'; ok = false; }
    }
    setErrors(prev => ({ ...prev, ...newErrors }));
    return ok;
  };

  const handleChange = (field: string, value: any) => {
    setCompany(prev => ({ ...prev, [field]: value }));
    // تحقق فوري للحقول الأساسية
    let error = "";
    if (field === "name" && !value) error = "اسم الشركة مطلوب";
    if (field === "logo" && !value) error = "شعار الشركة مطلوب";
    if (field === "phone" && value && !isValidEgyptianPhone(value)) error = "رقم الهاتف غير صحيح";
    if (field === "email" && value && !isValidEmail(value)) error = "البريد الإلكتروني غير صحيح";
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleBranchChange = (field: string, value: any) => {
    setBranch(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="إضافة شركة جديدة" width="max-w-3xl">
      <div className="space-y-4">
        {/* Tabs */}
        <div className="flex border-b mb-4">
          {TABS.map((tab, idx) => (
            <button
              key={tab}
              className={`px-6 py-3 -mb-px border-b-4 font-bold text-base transition-colors focus:outline-none ${activeTab === idx ? 'border-[#1dbf73] text-[#1dbf73] bg-[#eafaf6] shadow-lg' : 'border-transparent text-gray-500 bg-white'}`}
              style={activeTab === idx ? { fontSize: '1.1rem', fontWeight: 700 } : {}}
              onClick={() => setActiveTab(idx)}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* محتوى كل تبويب */}
        <div className="min-h-[300px]">
          {/* هنا يتم وضع محتوى كل تبويب فعلياً */}
          {activeTab === 0 && (
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-gray-700 font-semibold">اسم الشركة <span className='text-red-500'>*</span></label>
                  <input
                    type="text"
                    className={`w-full h-10 px-4 rounded-lg bg-gray-100 border ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="اسم الشركة"
                    value={company.name}
                    onChange={e => handleChange('name', e.target.value)}
                  />
                  {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name}</span>}
                </div>
                <div>
                  <label className="block mb-2 text-gray-700 font-semibold">شعار الشركة (Logo) <span className='text-red-500'>*</span></label>
                  <input
                    type="file"
                    accept="image/*"
                    className={`w-full h-10 px-4 rounded-lg bg-gray-100 border ${errors.logo ? 'border-red-500' : 'border-gray-200'}`}
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          handleChange('logo', ev.target?.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {company.logo && typeof company.logo === 'string' && company.logo.startsWith('data:image') && (
                    <img src={company.logo} alt="شعار الشركة" className="mt-2 h-12 w-12 object-contain rounded" />
                  )}
                  {errors.logo && <span className="text-red-500 text-xs mt-1 block">{errors.logo}</span>}
                </div>
                <div className="col-span-2">
                  <label className="block mb-2 text-gray-700 font-semibold">نبذة مختصرة</label>
                  <textarea
                    className="w-full h-20 px-4 py-2 rounded-lg bg-gray-100 resize-none"
                    placeholder="اكتب نبذة مختصرة عن الشركة (سطرين–3 سطور)"
                    value={company.description || ''}
                    onChange={e => handleChange('description', e.target.value)}
                    maxLength={300}
                  />
                </div>
                <div className="col-span-2 flex items-center gap-4 mt-2">
                  <label className="text-gray-700 font-semibold">حالة الشركة:</label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={company.active ?? true}
                      onChange={e => handleChange('active', e.target.checked)}
                      className="sr-only"
                    />
                    <span className={`w-10 h-6 flex items-center rounded-full p-1 ${company.active ? 'bg-[#5bd4b0]' : 'bg-gray-300'}`}>
                      <span className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${company.active ? 'translate-x-4' : ''}`}></span>
                    </span>
                    <span className="ml-2 text-sm font-bold">{company.active ? 'نشطة' : 'غير نشطة'}</span>
                  </label>
                </div>
              </div>
            </div>
          )}
          {activeTab === 1 && (
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-gray-700 font-semibold">رقم الهاتف الرئيسي <span className='text-red-500'>*</span></label>
                  <input
                    type="text"
                    className={`w-full h-10 px-4 rounded-lg bg-gray-100 border ${errors.phone ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="مثال: 01012345678"
                    value={company.phone || ''}
                    onChange={e => handleChange('phone', e.target.value)}
                  />
                  {errors.phone && <span className="text-red-500 text-xs mt-1 block">{errors.phone}</span>}
                </div>
                <div>
                  <label className="block mb-2 text-gray-700 font-semibold">البريد الإلكتروني <span className='text-red-500'>*</span></label>
                  <input
                    type="email"
                    className={`w-full h-10 px-4 rounded-lg bg-gray-100 border ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="example@email.com"
                    value={company.email || ''}
                    onChange={e => handleChange('email', e.target.value)}
                  />
                  {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
                </div>
                <div>
                  <label className="block mb-2 text-gray-700 font-semibold">رقم واتساب <span className='text-red-500'>*</span></label>
                  <input
                    type="text"
                    className="w-full h-10 px-4 rounded-lg bg-gray-100"
                    placeholder="مثال: 01012345678"
                    value={company.whatsapp || ''}
                    onChange={e => handleChange('whatsapp', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700 font-semibold">الموقع الإلكتروني</label>
                  <input
                    type="url"
                    className="w-full h-10 px-4 rounded-lg bg-gray-100"
                    placeholder="https://example.com"
                    value={company.website || ''}
                    onChange={e => handleChange('website', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700 font-semibold">فيسبوك</label>
                  <input
                    type="url"
                    className="w-full h-10 px-4 rounded-lg bg-gray-100"
                    placeholder="https://facebook.com/company"
                    value={company.facebook || ''}
                    onChange={e => handleChange('facebook', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700 font-semibold">إنستجرام</label>
                  <input
                    type="url"
                    className="w-full h-10 px-4 rounded-lg bg-gray-100"
                    placeholder="https://instagram.com/company"
                    value={company.instagram || ''}
                    onChange={e => handleChange('instagram', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700 font-semibold">تويتر (X)</label>
                  <input
                    type="url"
                    className="w-full h-10 px-4 rounded-lg bg-gray-100"
                    placeholder="https://twitter.com/company"
                    value={company.twitter || ''}
                    onChange={e => handleChange('twitter', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
          {activeTab === 2 && (
            <div>{/* القسم 3 – الخدمات */}</div>
          )}
          {activeTab === 3 && (
            <div>
              <div className="bg-white rounded-xl shadow p-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-gray-700 font-semibold">اسم الفرع <span className='text-red-500'>*</span></label>
                    <input
                      type="text"
                      className="w-full h-10 px-4 rounded-lg bg-gray-100"
                      placeholder="اسم الفرع"
                      value={branch.name}
                      onChange={e => handleBranchChange('name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700 font-semibold">المحافظة <span className='text-red-500'>*</span></label>
                    <select
                      className="w-full h-10 px-4 rounded-lg bg-gray-100"
                      value={branch.governate}
                      onChange={e => handleBranchChange('governate', e.target.value)}
                    >
                      <option value="">اختر المحافظة</option>
                      {MOCK_GOVERNATES.map(gov => (
                        <option key={gov} value={gov}>{gov}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block mb-2 text-gray-700 font-semibold">العنوان التفصيلي <span className='text-red-500'>*</span></label>
                    <input
                      type="text"
                      className="w-full h-10 px-4 rounded-lg bg-gray-100"
                      placeholder="العنوان التفصيلي"
                      value={branch.address}
                      onChange={e => handleBranchChange('address', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700 font-semibold">الموقع الجغرافي (رابط)</label>
                    <input
                      type="url"
                      className="w-full h-10 px-4 rounded-lg bg-gray-100"
                      placeholder="رابط من خرائط جوجل"
                      value={branch.locationLink}
                      onChange={e => handleBranchChange('locationLink', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700 font-semibold">هاتف الفرع <span className='text-red-500'>*</span></label>
                    <input
                      type="text"
                      className="w-full h-10 px-4 rounded-lg bg-gray-100"
                      placeholder="رقم الهاتف"
                      value={branch.phone || ''}
                      onChange={e => handleBranchChange('phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700 font-semibold">واتساب الفرع (اختياري)</label>
                    <input
                      type="text"
                      className="w-full h-10 px-4 rounded-lg bg-gray-100"
                      placeholder="رقم واتساب الفرع"
                      value={branch.whatsapp || ''}
                      onChange={e => handleBranchChange('whatsapp', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700 font-semibold">مواعيد العمل</label>
                    <input
                      type="text"
                      className="w-full h-10 px-4 rounded-lg bg-gray-100"
                      placeholder="مثال: 8 ص – 10 م"
                      value={branch.workingHours || ''}
                      onChange={e => handleBranchChange('workingHours', e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-[#5bd4b0] text-white px-8 py-2 rounded-lg flex items-center justify-center text-lg font-bold shadow"
                    onClick={() => {
                      if (branch.name && branch.address && branch.governate) {
                        setBranches(prev => [...prev, branch]);
                        setBranch({ ...defaultBranch });
                        setBranchMsg('تمت إضافة الفرع بنجاح');
                        setTimeout(() => setBranchMsg(''), 2500);
                      } else {
                        // highlight required fields
                        const bErr: {[key: string]: string} = {};
                        if (!branch.name) bErr.branchName = 'اسم الفرع مطلوب';
                        if (!branch.address) bErr.branchAddress = 'العنوان مطلوب';
                        if (!branch.governate) bErr.branchGovernate = 'المحافظة مطلوبة';
                        setErrors(prev => ({ ...prev, ...bErr }));
                      }
                    }}
                    type="button"
                  >
                    <PlusIcon className="w-5 h-5 mr-2" /> إضافة فرع
                  </button>
                </div>
              </div>
              {/* جدول الفروع المضافة */}
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-right">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-3 font-semibold text-[#081b1f]">اسم الفرع</th>
                      <th className="py-2 px-3 font-semibold text-[#081b1f]">المحافظة</th>
                      <th className="py-2 px-3 font-semibold text-[#081b1f]">العنوان</th>
                      <th className="py-2 px-3 font-semibold text-[#081b1f]">الموقع الجغرافي</th>
                      <th className="py-2 px-3 font-semibold text-[#081b1f]">هاتف الفرع</th>
                      <th className="py-2 px-3 font-semibold text-[#081b1f]">واتساب الفرع</th>
                      <th className="py-2 px-3 font-semibold text-[#081b1f]">مواعيد العمل</th>
                      <th className="py-2 px-3 font-semibold text-[#081b1f]">إجراء</th>
                    </tr>
                  </thead>
                  <tbody>
                    {branches.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="text-center py-6 text-gray-400">لا يوجد فروع مضافة</td>
                      </tr>
                    ) : branches.map((b, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="py-2 px-3">{b.name}</td>
                        <td className="py-2 px-3">{b.governate}</td>
                        <td className="py-2 px-3">{b.address}</td>
                        <td className="py-2 px-3">
                          <a href={b.locationLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">رابط</a>
                        </td>
                        <td className="py-2 px-3">{b.phone}</td>
                        <td className="py-2 px-3">{b.whatsapp}</td>
                        <td className="py-2 px-3">{b.workingHours}</td>
                        <td className="py-2 px-3">
                          <button className="text-red-500" onClick={() => setBranches(prev => prev.filter((_, i) => i !== idx))}>
                            <XIcon className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === 4 && (
            <div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700 font-semibold">صور للمكاتب / الحافلات (رفع صور متعددة)</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={e => {
                    const files = Array.from(e.target.files || []);
                    files.forEach(file => {
                      if (file instanceof Blob) {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          setAttachments(prev => [...prev, ev.target?.result as string]);
                        };
                        reader.readAsDataURL(file);
                      }
                    });
                  }}
                />
              </div>
              {attachments.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {attachments.map((img, idx) => (
                    <div key={idx} className="relative">
                      <img src={img} alt={`مرفق ${idx + 1}`} className="h-24 w-24 object-cover rounded shadow" />
                      <button
                        type="button"
                        className="absolute top-1 left-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        onClick={() => setAttachments(prev => prev.filter((_, i) => i !== idx))}
                        title="حذف الصورة"
                      >
                        <XIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        {/* أزرار التنقل والحفظ */}
        <div className="mt-4">
          {branchMsg && (
            <div className="mb-3 text-sm text-green-600 font-semibold">{branchMsg}</div>
          )}
          <div className="mt-2 flex flex-row-reverse justify-between items-center gap-2">
          <button
            className="bg-gray-200 text-gray-700 px-4 py-1 rounded text-sm"
            style={{ fontWeight: 400 }}
            onClick={onClose}
          >
            إلغاء
          </button>
          <div className="flex items-center gap-2">
            <button
              className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded text-sm"
              onClick={() => { if (activeTab > 0) setActiveTab(activeTab - 1); }}
              type="button"
            >
              السابق
            </button>
            <button
              className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded text-sm"
              onClick={() => { if (activeTab < TABS.length - 1) { if (validateTab(activeTab)) setActiveTab(activeTab + 1); } }}
              type="button"
            >
              التالي
            </button>
          </div>
          <button
            className="bg-[#5bd4b0] text-white px-8 py-3 rounded-lg text-lg hover:bg-[#4bbd99] transition-all"
            style={{ fontWeight: 500 }}
            onClick={() => {
              // تحقق من الحقول الأساسية قبل الحفظ
              let hasError = false;
              const requiredFields = ["name", "logo", "phone", "email"];
              let newErrors: {[key: string]: string} = {};
              if (!company.name) { newErrors.name = "اسم الشركة مطلوب"; hasError = true; }
              if (!company.logo) { newErrors.logo = "شعار الشركة مطلوب"; hasError = true; }
              if (!company.phone || !isValidEgyptianPhone(company.phone)) { newErrors.phone = "رقم الهاتف غير صحيح"; hasError = true; }
              if (!company.email || !isValidEmail(company.email)) { newErrors.email = "البريد الإلكتروني غير صحيح"; hasError = true; }
              setErrors(prev => ({ ...prev, ...newErrors }));
              if (hasError) return;
              // إرسال البيانات للـ API
              const newCompany: Company = {
                ...company,
                id: Date.now().toString(),
                branches,
                attachments,
              };
              onAddCompany(newCompany);
              onClose();
              setCompany({ ...defaultCompany });
              setBranches([]);
              setAttachments([]);
              setErrors({});
            }}
          >
            حفظ الشركة
          </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default AddCompanyModal;
// تمت إزالة جميع البقايا والتكرار بعد نهاية المكون
