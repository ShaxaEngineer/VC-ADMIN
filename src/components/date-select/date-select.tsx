/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { ConfigProvider, DatePicker } from 'antd';
import uzUz from 'antd/locale/uz_UZ';
import { Dayjs } from 'dayjs';

import { getDateForm } from '@/utils';

interface DateControlProps {
  placeholder?: any;
  size?: 'large' | 'middle' | 'small';
  format?: string;
  formatDateForm?: string;
  disabled?: boolean;
  PickerComponent?: any;
  value?: string | null | Dayjs;
  onChange?: (value: any) => void;
  width?: string;
}

export const DateSelect: React.FC<DateControlProps> = ({
  placeholder = 'KK.OO.YYYY',
  disabled = false,
  size = 'large',
  format = 'DD.MM.YYYY',
  formatDateForm = 'YYYY-MM-DD',
  PickerComponent = DatePicker,
  value = null,
  onChange = () => {},
  width = '100%',
}) => {
  return (
    <div style={{ width: width }} className="relative">
      <ConfigProvider locale={uzUz}>
        <PickerComponent
          value={value && getDateForm(value, null)}
          onChange={(e: any) => onChange(getDateForm(e, formatDateForm))}
          format={format}
          placeholder={placeholder}
          disabled={disabled}
          size={size}
          className="w-full hover:border-primary focus:border-primary"
        />
      </ConfigProvider>
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-full select-none rounded-md bg-gray-300/20"></div>
    </div>
  );
};
