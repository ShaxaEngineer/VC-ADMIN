import React, { ReactNode, memo } from 'react';

import { LoadingOutlined } from '@ant-design/icons';

interface AddButtonProps {
  children?: ReactNode;
  click?: () => void;
  color?: string;
  disabled?: boolean;
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const AddButton: React.FC<AddButtonProps> = memo(
  ({
    children,
    click = () => {},
    color = '#00ab55',
    disabled = false,
    type = 'button',
    isLoading = false,
  }) => {
    return (
      <button
        disabled={disabled}
        onClick={click}
        style={{
          backgroundColor: `${color}`,
          boxShadow: `0px 12px 25px -14px ${color}`,
        }}
        type={type}
        className="relative flex w-max items-center justify-center gap-2 rounded-lg p-2 px-4 text-center text-sm text-white transition duration-300 hover:!shadow-none"
      >
        {isLoading ? (
          <div
            style={{
              backgroundColor: `${color}`,
              boxShadow: `0px 12px 25px -14px ${color}`,
            }}
            className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-md text-xl"
          >
            <LoadingOutlined />
          </div>
        ) : (
          ''
        )}
        {children}
      </button>
    );
  },
);
