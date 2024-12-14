// Dynamic Table Component with Flexible Columns (TypeScript)
import { TableProps } from '../../types/tabel';



export const Table: React.FC<TableProps> = ({ children }) => {
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        {children}
      </table>
    </div>
  );
};

