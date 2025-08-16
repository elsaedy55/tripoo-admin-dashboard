import React, { useState, useEffect } from 'react';
import { getGovernates, addTripWithRepeat } from '../../api';
import { Company, Service, Trip } from '../../types';
import { PlusIcon, XIcon } from '../icons';

interface AddTripModalProps {
  companies: Company[];
  onAddTrip: (trip: Trip) => void;
  onClose: () => void;
}

const defaultTrip: Trip = {
  id: '',
  company: '',
  companyLogo: '',
  route: { from: '', to: '' },
  departureTime: '',
  duration: '',
  stopsDeparture: [],
  stopsArrival: [],
  pricesBetweenStations: [],
  services: [],
  seatTypes: [],
  price: 0,
  status: 'نشطة',
  clicks: 0,
  conversionLink: '',
};

const serviceOptions: { key: Service; label: string; icon?: React.ReactNode }[] = [
  { key: 'wifi', label: 'واي فاي' },
  { key: 'bathroom', label: 'حمام' },
  { key: 'general_screen', label: 'شاشة عامة' },
  { key: 'private_screen', label: 'شاشة خاصة' },
  { key: 'meals', label: 'وجبات' },
  { key: 'drinks', label: 'مشروبات' },
];
const seatOptions = ['عادية', 'مميزة', 'VIP'];

const AddTripModal: React.FC<AddTripModalProps> = ({ companies, onAddTrip, onClose }) => {
  const [tab, setTab] = useState(0);
  const [trip, setTrip] = useState({ ...defaultTrip });
  const [depStopBranch, setDepStopBranch] = useState('');
  const [depStopTime, setDepStopTime] = useState('');
  const [arrStopBranch, setArrStopBranch] = useState('');
  const [arrStopTime, setArrStopTime] = useState('');
  const [governates, setGovernates] = useState<string[]>([]);
  const [durationHours, setDurationHours] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('');
  const [stationPrices, setStationPrices] = useState<{ from: string; to: string; price: number | '' }[]>([]);

  useEffect(() => {
    getGovernates().then(setGovernates);
  }, []);

  const handleChange = (field: string, value: any) => {
    setTrip(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (durationHours || durationMinutes) {
      let label = '';
      if (durationHours) label += `${durationHours} ساعة`;
      if (durationMinutes) label += (label ? ' و ' : '') + `${durationMinutes} دقيقة`;
      setTrip(prev => ({ ...prev, duration: label }));
    }
  }, [durationHours, durationMinutes]);

  const handleAddDepStop = () => {
    if (depStopBranch && depStopTime) {
      setTrip(prev => ({
        ...prev,
        stopsDeparture: [...prev.stopsDeparture, { name: depStopBranch, arrivalTime: depStopTime }],
      }));
      setDepStopBranch('');
      setDepStopTime('');
      setTimeout(() => {
        updateStationPrices();
      }, 0);
    }
  };

  const handleAddArrStop = () => {
    if (arrStopBranch && arrStopTime) {
      setTrip(prev => ({
        ...prev,
        stopsArrival: [...prev.stopsArrival, { name: arrStopBranch, arrivalTime: arrStopTime }],
      }));
      setArrStopBranch('');
      setArrStopTime('');
      setTimeout(() => {
        updateStationPrices();
      }, 0);
    }
  };

  const updateStationPrices = () => {
    const stops = [...trip.stopsDeparture, { name: depStopBranch, arrivalTime: depStopTime }].filter(s => s.name);
    const pairs: { from: string; to: string; price: number | '' }[] = [];
    for (let i = 0; i < stops.length - 1; i++) {
      for (let j = i + 1; j < stops.length; j++) {
        const existing = stationPrices.find(p => p.from === stops[i].name && p.to === stops[j].name);
        pairs.push({
          from: stops[i].name,
          to: stops[j].name,
          price: existing ? existing.price : '',
        });
      }
    }
    setStationPrices(pairs);
  };

  const handleStationPriceChange = (idx: number, value: string) => {
    const updated = [...stationPrices];
    updated[idx].price = value === '' ? '' : Number(value);
    setStationPrices(updated);
    setTrip(prev => ({ ...prev, pricesBetweenStations: updated }));
  };

  const handleRemoveDepStop = (idx: number) => {
    setTrip(prev => ({
      ...prev,
      stopsDeparture: prev.stopsDeparture.filter((_, i) => i !== idx),
    }));
  };

  const handleRemoveArrStop = (idx: number) => {
    setTrip(prev => ({
      ...prev,
      stopsArrival: prev.stopsArrival.filter((_, i) => i !== idx),
    }));
  };

  const handleRemoveStationPrice = (idx: number) => {
    const updated = stationPrices.filter((_, i) => i !== idx);
    setStationPrices(updated);
    setTrip(prev => ({ ...prev, pricesBetweenStations: updated }));
  };

  const handleServiceToggle = (service: Service) => {
    setTrip(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSeatSelect = (seat: string) => {
    setTrip(prev => ({
      ...prev,
      seatTypes: [seat],
    }));
  };

  const handleSave = async () => {
    if (!trip.company || !trip.route.from || !trip.route.to || !trip.departureTime) return;
    const tripData = { ...trip, id: Date.now().toString(), companyLogo: companies.find(c => c.name === trip.company)?.logo || '' };
    await addTripWithRepeat(tripData, {
      option: 'none',
      untilType: 'none'
    });
    onAddTrip(tripData);
    onClose();
    setTrip({ ...defaultTrip });
    setTab(0);
  };

}

export default AddTripModal;
