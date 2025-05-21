import React, { useState, useEffect, useCallback } from 'react';
import { Database, AlertTriangle } from 'lucide-react';
import DataTable from './DataTable';
import LoadingIndicator from './LoadingIndicator';
import { Record, Column } from '../types';
import { fetchData } from '../services/api';

const POLRES_OPTIONS = [
  {
    label: 'Magelang Kota',
    value: 'magelang',
    apiUser: 'magelangkota.supervisor@mail.com',
    apiPass: 'Magk$2025',
  },
  {
    label: 'Polrestabes Semarang',
    value: 'demak',
    apiUser: 'semarangkota.validasi@mail.com',
    apiPass: 'SmgKt!2025',
  },
  // Tambahkan polres lain di sini
];

// Function to get current date in DD-MM-YYYY format
const getFormattedDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const year = today.getFullYear();
  return `${day}-${month}-${year}`;
};

const HomePage: React.FC = () => {
  const [data, setData] = useState<Record[]>([]);
  const [filteredData, setFilteredData] = useState<Record[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [date, setDate] = useState(getFormattedDate());
  const [date1, setDate1] = useState(getFormattedDate());
  const [polres, setPolres] = useState<string>(''); // Set default value here

  // Define visible columns with human-readable labels
  const columns: Column[] = [
    { key: 'display_date', label: 'Tanggal Cetak', sortable: true },
    { key: 'ref_number', label: 'No. Referensi', sortable: true },
    { key: 'jenis_kendaraan', label: 'Jenis Kendaraan', sortable: true },
    { key: 'plat_number', label: 'TNKB', sortable: true },
    { key: 'lokasi_cam', label: 'Lokasi Kamera', sortable: true },
    { key: 'pelanggaran', label: 'Pelanggaran', sortable: true },
    { key: 'alamat_regiden', label: 'Alamat', sortable: true },
  ];

  // Fetch data from API
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const selectedPolres = POLRES_OPTIONS.find(opt => opt.value === polres) || POLRES_OPTIONS[0]; // Default to first option if none selected
      const result = await fetchData(date, date1, selectedPolres.apiUser, selectedPolres.apiPass);
      setData(result);
      setFilteredData(result);
    } catch (err) {
      setError('Failed to load data. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // loadData(); // Hapus pemanggilan otomatis saat mount atau perubahan filter
    // eslint-disable-next-line
  }, []); // Dependensi kosong agar hanya berjalan sekali saat mount (tanpa memuat data)

  // Filter data based on search term
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      setFilteredData(data);
      return;
    }
    
    const lowerTerm = term.toLowerCase();
    const filtered = data.filter((record) => {
      return Object.values(record).some((value) => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(lowerTerm);
        }
        return false;
      });
    });
    
    setFilteredData(filtered);
  }, [data]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Database size={24} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Download Cetak
            </h1>
          </div>
          <p className="text-gray-600 max-w-3xl">
            View and manage traffic violation records from the system. Search, sort, and filter to find specific records.
          </p>
        </header>

        <main className="bg-white rounded-xl shadow-sm overflow-hidden p-4 md:p-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Dari Tanggal</label>
                <input
                  type="date"
                  value={date.split('-').reverse().join('-')}
                  onChange={e => setDate(e.target.value.split('-').reverse().join('-'))}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Sampai Tanggal</label>
                <input
                  type="date"
                  value={date1.split('-').reverse().join('-')}
                  onChange={e => setDate1(e.target.value.split('-').reverse().join('-'))}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Pilih Polres</label>
                <select
                  value={polres}
                  onChange={e => setPolres(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Pilih Polres</option>
                  {POLRES_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={loadData}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                  </svg>
                  Filter Data
                </button>
              </div>
            </div>

            {/* Tambahkan kondisi rendering berdasarkan apakah polres sudah dipilih */}
            {polres === '' ? (
              <div className="flex items-center justify-center p-6 text-gray-600 bg-gray-100 rounded-lg border border-gray-200">
                <p>Silakan pilih Polres dan tekan Filter untuk menampilkan data.</p>
              </div>
            ) : error ? (
              <div className="flex items-center p-4 text-amber-800 bg-amber-50 rounded-lg border border-amber-200 mb-4">
                <AlertTriangle className="mr-3 text-amber-500" size={20} />
                <span>{error}</span>
              </div>
            ) : loading ? (
              <LoadingIndicator />
            ) : (
              <DataTable
                data={filteredData}
                columns={columns}
                isLoading={loading}
                searchTerm={searchTerm}
                onSearchChange={handleSearch}
              />
            )}
          </div>
        </main>
        
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2025 Traffic Management System. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;