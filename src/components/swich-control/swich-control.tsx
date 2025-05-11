/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Switch } from 'antd';
import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface ISwichControl {
  name: string;
  title: string;
  required?: boolean;
  defaultChecked?: boolean;
  control: Control<any>;
  size: 'small' | 'default';
  yes?: string;
  no?: string;
  onChange?: (value: any) => void;
}

export const SwichControl: React.FC<ISwichControl> = ({
  name = '',
  title = '',
  required = false,
  control,
  size = 'default',
  yes,
  no,
  defaultChecked = false,
  onChange = () => {},
}) => {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <label className="relative mb-1 px-3 text-sm font-normal text-black dark:text-white">
        {title}
        <div
          className={`absolute right-0 top-[-6px] text-lg text-red-600 ${required ? '' : 'hidden'}`}
        >
          *
        </div>
      </label>
      <Controller
        name={name}
        control={control}
        rules={{ required: required }}
        render={({ field }) => (
          <Switch
            {...field}
            onChange={(e) => {
              field.onChange(e);
              onChange(e);
            }}
            defaultChecked={defaultChecked}
            checked={field.value}
            checkedChildren={yes || t('Ha')}
            unCheckedChildren={no || t("Yo'q")}
            size={size}
            className="bg-red-600"
          />
        )}
      />
    </div>
  );
};
