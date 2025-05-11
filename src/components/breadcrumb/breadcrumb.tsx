import React, { ReactNode, memo } from 'react';

import { HomeFilled, RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  link: ReactNode;
  linkOn?: ReactNode;
  data?: ReactNode;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = memo(({ link, linkOn, data }) => {
  return (
    <div className="mb-6 max-sm:mb-4">
      <div className="panel flex items-center justify-between overflow-hidden overflow-x-auto whitespace-nowrap rounded-md p-3 max-md:justify-end max-sm:p-2">
        <div className="flex items-center justify-start gap-4 text-xl font-medium text-gray-500 dark:text-gray-300 max-md:hidden">
          {link}
          {data}
        </div>
        <div className="flex items-center justify-end gap-3 max-md:justify-start max-md:overflow-x-hidden">
          <Link to="/" className="text-sm text-primary">
            <HomeFilled />
          </Link>
          {linkOn ? (
            <>
              <p className="scale-75 text-xs text-gray-500 dark:text-gray-300">
                <RightOutlined />
              </p>
              <p className="whitespace-nowrap text-base text-gray-500 dark:text-gray-300">
                {linkOn}
              </p>
            </>
          ) : null}
          <p className="scale-75 text-xs text-gray-500 dark:text-gray-300">
            <RightOutlined />
          </p>
          <p className="whitespace-nowrap text-base text-gray-500 dark:text-gray-300">{link}</p>
          <p className="scale-75 text-xs text-gray-500 dark:text-gray-300">
            <RightOutlined />
          </p>
        </div>
      </div>
    </div>
  );
});
