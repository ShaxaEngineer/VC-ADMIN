/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo } from 'react';

import { Select } from 'antd';

interface SelectFilterProps {
  placeholder?: string;
  size?: 'small' | 'middle' | 'large';
  children: React.ReactNode;
  value?: string | number | null;
  onChange?: (value: string) => void;
  width?: string;
  maxWidth?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

export const SelectFilter: React.FC<SelectFilterProps> = memo(
  ({
    placeholder = '',
    size = 'large',
    children,
    value = null,
    onChange = (): any => {},
    width = '100%',
    maxWidth = '300px',
    loading = false,
    disabled = false,
    className = 'border-[var(--bordre-gray)] hover:border-primary focus:border-primary w-full',
  }) => {
    // input selectlani filterlash
    const filterOption = (input: string, option: any) => {
      if (typeof option?.children == 'string')
        return (option?.children ?? '')?.toLowerCase()?.includes(input?.toLowerCase());
    };

    return (
      <div style={{ width: width, maxWidth: maxWidth }} className="relative">
        <Select
          value={value}
          onChange={(e: any) => onChange(e)}
          showSearch
          allowClear
          optionFilterProp="children"
          filterOption={filterOption}
          className={className}
          size={size}
          placeholder={placeholder}
          loading={loading}
          disabled={disabled}
        >
          {children}
        </Select>
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-full select-none rounded-md bg-gray-300/20"></div>
      </div>
    );
  },
);
