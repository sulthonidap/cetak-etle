import React, { useState, useMemo } from 'react';
import { Record, Column, SortState } from '../types';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import EmptyState from './EmptyState';
import { Search, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

interface DataTableProps {
  data: Record[];
  columns: Column[];
  isLoading: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  isLoading,
  searchTerm,
  onSearchChange,
}) => {
  const [sortState, setSortState] = useState<SortState>({
    column: null,
    direction: null,
  });

  const handleSort = (column: string) => {
    setSortState((prev) => {
      if (prev.column === column) {
        if (prev.direction === 'asc') {
          return { column: column as keyof Record, direction: 'desc' };
        } else if (prev.direction === 'desc') {
          return { column: null, direction: null };
        } else {
          return { column: column as keyof Record, direction: 'asc' };
        }
      } else {
        return { column: column as keyof Record, direction: 'asc' };
      }
    });
  };

  const sortedData = useMemo(() => {
    if (!sortState.column || !sortState.direction) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[sortState.column!];
      const bValue = b[sortState.column!];

      if (aValue === bValue) return 0;
      
      const compareResult = aValue < bValue ? -1 : 1;
      return sortState.direction === 'asc' ? compareResult : -compareResult;
    });
  }, [data, sortState]);

  const handleExportToExcel = () => {
    const exportData = sortedData.map((record, idx) => ({
      'No.': idx + 1,
      'No. Surat': '',
      'No. Referensi': record.ref_number,
      'Lokasi': record.lokasi_cam,
      'Plat': record.plat_number,
      'Pemilik': record.pemilik || '',
      'Alamat': record.alamat_regiden,
      'Warna Plat': record.warna_plat || '',
      'Warna Kendaraan': record.warna_kendaraan || '',
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Records');
    
    // Generate file name with current date
    const date = new Date().toISOString().split('T')[0];
    const fileName = `traffic-violations-${date}.xlsx`;
    
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Jumlah Data : {data.length}</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search records..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64 text-sm"
            />
          </div>
          <button
            onClick={handleExportToExcel}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download size={18} />
            <span>Export to Excel</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <TableHeader
            columns={columns}
            sortState={sortState}
            onSort={handleSort}
          />
          
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.length > 0 ? (
              sortedData.map((record) => (
                <TableRow key={record.id} record={record} columns={columns} />
              ))
            ) : (
              <tr>
                <td colSpan={columns.length}>
                  <EmptyState searchTerm={searchTerm} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-600">
        <div>
          Showing <span className="font-medium">{sortedData.length}</span> records
        </div>
        <div className="text-right">
          <button 
            className="px-4 py-2 bg-gray-100 rounded-md mr-2 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={true}
          >
            Previous
          </button>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={true}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;