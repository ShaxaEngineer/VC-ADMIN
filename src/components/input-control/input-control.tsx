/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from 'react';

import { Input } from 'antd';
import { Control, Controller } from 'react-hook-form';

interface InputControlProps {
  name: string;
  title?: string;
  type?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  control: Control<any>;
  size?: 'large' | 'middle' | 'small';
  disabled?: boolean;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  InputComponent?: any;
  rows?: number;
}

export const InputControl: React.FC<InputControlProps> = memo(
  ({
    name = '',
    title = '',
    type = 'text',
    placeholder = '',
    required = false,
    control,
    size = 'large',
    disabled = false,
    suffix = '',
    prefix = '',
    InputComponent = Input,
    rows,
    className = '',
  }) => {
    return (
      <>
        <div className="w-full">
          {title && (
            <label
              className={`relative mb-1 w-max max-w-full text-wrap px-3 text-sm font-normal ${
                disabled ? 'text-red-600' : 'text-black dark:text-white'
              }`}
            >
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
              <InputComponent
                type={type}
                disabled={disabled}
                {...field}
                placeholder={placeholder}
                size={size}
                suffix={suffix}
                prefix={prefix}
                className={`p-2 hover:border-primary focus:border-primary ${className}`}
                rows={rows}
              />
            )}
          />
        </div>
      </>
    );
  },
);
