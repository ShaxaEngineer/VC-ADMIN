/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Radio } from 'antd';
import { Control, Controller } from 'react-hook-form';

interface IRadioControl {
  name: string;
  title: string;
  required?: boolean;
  defaultValue?: any;
  disabled?: boolean;
  control: Control<any>;
  options: { label: string; value: any }[];
  onChange?: (value: any) => void;
}

export const RadioControl: React.FC<IRadioControl> = ({
  name = '',
  title = '',
  required = false,
  defaultValue,
  disabled = false,
  control,
  options = [],
  onChange = () => {},
}) => {
  return (
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
      <div className="rounded-md border border-gray-400/50 p-2 dark:border-gray-600/40">
        <Controller
          name={name}
          control={control}
          rules={{ required: required }}
          defaultValue={defaultValue}
          render={({ field }) => (
            <Radio.Group
              {...field}
              disabled={disabled}
              onChange={(e) => {
                field.onChange(e.target.value);
                onChange(e.target.value);
              }}
            >
              {options.map((option) => (
                <Radio
                  key={option.value}
                  value={option.value}
                  className="text-base font-normal text-black dark:text-white"
                >
                  {option.label}
                </Radio>
              ))}
            </Radio.Group>
          )}
        />
      </div>
    </div>
  );
};
