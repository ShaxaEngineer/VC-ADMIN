/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { ColorPicker } from 'antd';
import { Control, Controller } from 'react-hook-form';

interface IColorPickerControl {
  name: string;
  title: string;
  required?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  showText?: boolean;
  control: Control<any>;
  onChange?: (value: string) => void;
}

export const ColorPickerControl: React.FC<IColorPickerControl> = ({
  name = '',
  title = '',
  required = false,
  defaultValue = '#1677ff',
  disabled = false,
  showText = true,
  control,
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
      <Controller
        name={name}
        control={control}
        rules={{ required: required }}
        defaultValue={defaultValue}
        render={({ field }) => (
          <ColorPicker
            {...field}
            disabled={disabled}
            defaultValue={field.value || defaultValue}
            showText={showText}
            size="large"
            onChange={(color) => {
              const hexColor = color.toHexString(); // Rangni HEX formatda olish
              field.onChange(hexColor);
              onChange(hexColor);
            }}
          />
        )}
      />
    </div>
  );
};
