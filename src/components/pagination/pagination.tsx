/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo, useEffect, useState } from 'react';

import { Pagination } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface PaginationsProps {
  data: any;
  currentPage: number;
  pageSize: number;
}

export const Paginations: React.FC<PaginationsProps> = memo(({ data, currentPage, pageSize }) => {
  const { t } = useTranslation();
  // const [totalItems, settotalItems] = useState<number>(1);
  const [totalPages, settotalPages] = useState<number>(0);
  const navigate = useNavigate();

  // API dan kelgan pagination ma'lumotlarini o'qish
  useEffect(() => {
    if (data) {
      settotalPages(data?.totalPages || 0);
      // settotalItems(data?.total || 0);
      navigate(`?page=${currentPage || 1}&size=${pageSize || 10}`, { replace: true });
    }
  }, [data]);

  // Sahifa raqamini URL query parametriga joylashtirish
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (Number(params.get('page')) !== currentPage || Number(params.get('size')) !== pageSize) {
      navigate(`?page=${currentPage}&size=${pageSize}`, { replace: true });
    }
  }, [currentPage, pageSize, navigate]);

  return (
    <>
      <div className="ml-auto w-max p-5 pt-0">
        <Pagination
          current={currentPage}
          total={totalPages * pageSize}
          pageSize={pageSize}
          pageSizeOptions={[10, 20, 40, 60, 80, 100]}
          showSizeChanger={true}
          onChange={(current, pageSize) => {
            navigate(`?page=${current}&size=${pageSize}`, { replace: true });
          }}
          onShowSizeChange={(current, pageSize) => {
            navigate(`?page=${current}&size=${pageSize}`, { replace: true });
          }}
          locale={{ items_per_page: t('/ Sahifa') }}
        />
      </div>
    </>
  );
});
