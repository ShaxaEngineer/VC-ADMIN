/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, memo } from 'react';
import React from 'react';

import { Select } from 'antd';
import { Control, Controller } from 'react-hook-form';

interface SelectControlProps {
  name: string;
  title?: string;
  placeholder?: string;
  required?: boolean;
  control: Control<any>;
  size?: 'large' | 'middle' | 'small';
  children: ReactNode;
  mode?: 'multiple' | 'tags';
  disabled?: boolean;
  loading?: boolean;
  onChange?: (value: any) => void;
}

export const SelectControl: React.FC<SelectControlProps> = memo(
  ({
    name = '',
    title = '',
    placeholder = '',
    required = false,
    control,
    size = 'large',
    children,
    mode,
    disabled = false,
    loading = false,
    onChange = () => {},
  }) => {
    // input selectlani filterlash
    const filterOption = (input: string, option: any): any => {
      if (typeof option?.children == 'string')
        return (option?.children ?? '')?.toLowerCase()?.includes(input?.toLowerCase());
    };

    return (
      <>
        {/* Korxonani tanlang */}
        <div className="w-full">
          {title && (
            <label className="relative mb-1 w-max px-3 text-sm font-normal text-black dark:text-white">
              {title}
              <div
                className={`absolute right-0 top-[-6px] text-lg text-red-600 ${
                  required ? '' : 'hidden'
                }`}
              >
                *
              </div>
            </label>
          )}
          <Controller
            name={name}
            control={control}
            rules={{ required: required }}
            render={({ field }) => (
              <Select
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  onChange(e);
                }}
                disabled={disabled}
                value={field.value}
                loading={loading}
                mode={mode}
                showSearch
                allowClear
                optionFilterProp="children"
                maxTagCount="responsive"
                filterOption={filterOption}
                className="w-full border-[#e0e6ed] hover:border-primary focus:border-primary dark:border-[#1b2e4b]"
                size={size}
                placeholder={placeholder}
              >
                {children}
              </Select>
            )}
          />
        </div>
      </>
    );
  },
);
