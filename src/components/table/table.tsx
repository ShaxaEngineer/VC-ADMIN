import React, { ReactNode, memo } from 'react';

import { ExceptionOutlined, LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

interface Column {
  title: string;
  class?: string;
}

interface TableProps {
  columns?: Column[];
  children: ReactNode;
  loading?: boolean;
}

export const Table: React.FC<TableProps> = memo(({ columns = [], children, loading = false }) => {
  return (
    <div className="my-5 h-max w-full overflow-x-auto">
      <table
        className={`table-hover table w-full border-collapse border-spacing-0 border-b border-t border-solid border-white-light/20 dark:!border-[#1a2941]/40`}
      >
        <thead className="table-header-group bg-[#F5F7F8] dark:!bg-[#1a2941]/40">
          <tr className="table-row align-middle text-inherit outline-0">
            {columns?.map((e, i) => (
              <th key={i} className={`${e?.class}`}>
                {e?.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-row-group border-inherit align-middle">
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="py-4 text-center">
                <div className="flex min-h-[10rem] items-center justify-center">
                  <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
                </div>
              </td>
            </tr>
          ) : children ? (
            children
          ) : (
            <tr>
              <td colSpan={columns.length} className="py-4 text-center">
                <div className="flex min-h-[10rem] flex-col items-center justify-center gap-1 text-gray-400 dark:text-white-dark">
                  <ExceptionOutlined style={{ fontSize: 48 }} />
                  <span className="text-base font-semibold">No data</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
});
