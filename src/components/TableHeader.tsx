import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Column, SortState } from '../types';

interface TableHeaderProps {
  columns: Column[];
  sortState: SortState;
  onSort: (column: string) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({ columns, sortState, onSort }) => {
  return (
    <thead className="bg-gray-50 text-gray-700">
      <tr>
        {columns.map((column) => (
          <th 
            key={column.key} 
            className={`
              py-3 px-4 text-left text-sm font-semibold 
              whitespace-nowrap border-b border-gray-200
              ${column.sortable ? 'cursor-pointer hover:bg-gray-100 transition-colors' : ''}
            `}
            onClick={() => column.sortable && onSort(column.key)}
          >
            <div className="flex items-center gap-1">
              <span>{column.label}</span>
              {column.sortable && (
                <div className="flex flex-col ml-1">
                  <ChevronUp 
                    size={14} 
                    className={`${sortState.column === column.key && sortState.direction === 'asc' 
                      ? 'text-blue-600' 
                      : 'text-gray-400'} -mb-1`} 
                  />
                  <ChevronDown 
                    size={14} 
                    className={`${sortState.column === column.key && sortState.direction === 'desc' 
                      ? 'text-blue-600' 
                      : 'text-gray-400'}`} 
                  />
                </div>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;