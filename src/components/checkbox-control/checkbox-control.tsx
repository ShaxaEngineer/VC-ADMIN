/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Checkbox } from 'antd';
import { Control, Controller } from 'react-hook-form';

interface ICheckboxControl {
  name: string;
  title: string;
  required?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  control: Control<any>;
  onChange?: (value: any) => void;
}

export const CheckboxControl: React.FC<ICheckboxControl> = ({
  name = '',
  title = '',
  required = false,
  control,
  defaultChecked = false,
  disabled = false,
  onChange = () => {},
}) => {
  return (
    <div className="w-max">
      <Controller
        name={name}
        control={control}
        rules={{ required: required }}
        render={({ field }) => (
          <Checkbox
            {...field}
            defaultChecked={defaultChecked}
            checked={field.value}
            disabled={disabled}
            onChange={(e) => {
              field.onChange(e);
              onChange(e);
            }}
          >
            <p className="relative mb-0 select-none text-sm font-normal text-black dark:text-white">
              {title}
              <span
                className={`absolute right-0 top-[-6px] text-lg text-red-600 ${required ? '' : 'hidden'}`}
              >
                *
              </span>
            </p>
          </Checkbox>
        )}
      />
    </div>
  );
};
