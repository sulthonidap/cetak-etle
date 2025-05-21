import React from 'react';
import { Search } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
  searchTerm?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = 'No data available',
  searchTerm
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="bg-gray-100 rounded-full p-4 mb-4">
        <Search size={32} className="text-gray-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {searchTerm ? 'No matching records found' : message}
      </h3>
      
      {searchTerm && (
        <p className="text-gray-600">
          No records match the search term "<span className="font-medium">{searchTerm}</span>"
        </p>
      )}
      
      {!searchTerm && (
        <p className="text-gray-600">
        Coba tekan filter berwarna biru di atas
        </p>
      )}
    </div>
  );
};

export default EmptyState;