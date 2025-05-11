/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { DatePicker } from 'antd';
import { ConfigProvider } from 'antd';
import uzUz from 'antd/locale/uz_UZ';
import { Control, Controller } from 'react-hook-form';

interface DateControlProps {
  name: string;
  title: string;
  placeholder?: any;
  required?: boolean;
  control: Control<any>;
  size?: 'large' | 'middle' | 'small';
  format?: string;
  disabled?: boolean;
  PickerComponent?: any;
}

export const DateControl: React.FC<DateControlProps> = ({
  name = '',
  title = '',
  placeholder = 'KK.OO.YYYY',
  required = false,
  disabled = false,
  control,
  size = 'large',
  format = 'DD.MM.YYYY',
  PickerComponent = DatePicker,
}) => {
  return (
    <div className="w-full">
      <label
        className={`relative mb-1 w-max px-3 text-sm font-normal ${
          disabled ? 'text-red-600' : 'text-black dark:text-white'
        }`}
      >
        {title}
        {required && <div className="absolute right-0 top-[-6px] text-lg text-red-600">*</div>}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{ required: required }}
        render={({ field }) => (
          <ConfigProvider locale={uzUz}>
            <PickerComponent
              {...field}
              format={format}
              placeholder={placeholder}
              disabled={disabled}
              size={size}
              className="w-full p-[0.4375rem] hover:border-primary focus:border-primary"
            />
          </ConfigProvider>
        )}
      />
    </div>
  );
};
