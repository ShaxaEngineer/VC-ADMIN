import React, { memo } from 'react';

import { Input } from 'antd';

interface InputFilterProps {
  placeholder?: string;
  size?: 'small' | 'middle' | 'large';
  value?: string | null;
  onChange?: (value: string) => void;
  width?: string;
}

export const InputFilter: React.FC<InputFilterProps> = memo(
  ({ placeholder = '', size = 'large', value = null, onChange = () => {}, width = '100%' }) => {
    return (
      <div style={{ width: width }} className="relative">
        <Input
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          size={size}
          className="hover:border-primary focus:border-primary"
        />
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-full select-none rounded-md bg-gray-300/20"></div>
      </div>
    );
  },
);
