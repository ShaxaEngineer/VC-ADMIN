import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export const LoadingSection = ({ loading }: { loading: boolean }) => {
  if (loading) {
    return (
      <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-white dark:bg-black">
        <div className="flex min-h-[10rem] items-center justify-center">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
      </div>
    );
  }
};
