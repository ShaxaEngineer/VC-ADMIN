/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, createElement } from 'react';

interface IconProps {
  type: keyof JSX.IntrinsicElements | any;
  className?: string;
}

export const Icon: FC<IconProps> = ({ type, className = 'size-3 fill-[#656571] stroke-white' }) => {
  const IconElement = createElement(type, { className });
  return IconElement;
};
