/* eslint-disable @typescript-eslint/no-explicit-any */
import { LOGO } from '@/assets';
import { ContainerBg } from '@/components';

export const Home = () => {
  return (
    <>
      <ContainerBg className="h-[calc(100vh_-_107px)] w-full overflow-auto">
        <div className="flex h-full w-full flex-col items-center justify-center gap-1">
          <img className="w-56 object-cover object-center max-md:w-40" src={LOGO} alt="KMO" />
        </div>
      </ContainerBg>
    </>
  );
};
