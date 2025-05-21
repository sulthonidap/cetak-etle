import React from 'react';
import { Record, Column } from '../types';
import { formatDate, truncateString } from '../utils/formatters';

interface TableRowProps {
  record: Record;
  columns: Column[];
}

const TableRow: React.FC<TableRowProps> = ({ record, columns }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-blue-50/40 transition-colors">
      {columns.map((column) => (
        <td key={`${record.id}-${column.key}`} className="py-3 px-4 text-sm text-gray-800">
          {renderCellContent(record, column.key)}
        </td>
      ))}
    </tr>
  );
};

const renderCellContent = (record: Record, key: keyof Record) => {
  const value = record[key];
  
  // Handle null or undefined values
  if (value === null || value === undefined) {
    return <span className="text-gray-400">-</span>;
  }
  
  // Format date fields
  if (key.includes('date')) {
    return formatDate(value as string);
  }
  
  // Add appropriate styling for status
  if (key === 'status') {
    return getStatusBadge(value as string);
  }
  
  // Format validation status
  if (key === 'validasi') {
    return getValidationBadge(value as string);
  }
  
  // Truncate long strings
  if (typeof value === 'string' && value.length > 30) {
    return truncateString(value);
  }
  
  return value;
};

const getStatusBadge = (status: string) => {
  let bgColor, textColor;
  
  switch (status.toLowerCase()) {
    case 'selesai':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    case 'diproses':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
  }
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};

const getValidationBadge = (validation: string) => {
  let bgColor, textColor;
  
  switch (validation.toLowerCase()) {
    case 'valid':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    case 'invalid':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      break;
    default:
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
  }
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {validation}
    </span>
  );
};

export default TableRow;