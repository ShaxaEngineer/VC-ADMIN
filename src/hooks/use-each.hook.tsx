import { Children, ReactNode } from 'react';

interface EachElementProps<T> {
  render: (item: T, index: number) => ReactNode;
  of: T[];
}

export const EachElement = <T,>({ render, of }: EachElementProps<T>): ReactNode => {
  return Children.toArray(of?.map((item, index) => render(item, index)));
};
