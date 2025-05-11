import { LOGO } from '@/assets';

// import { useLang } from '@/hooks';

export const Loading = () => {
  // const { nowlang } = useLang();
  return (
    <>
      <div className="screen_loader fixed inset-0 z-[2000] grid place-content-center bg-[#F5F7F8] dark:bg-[#060818]">
        <div className="flex flex-col items-center justify-center gap-6 max-sm:gap-2">
          <div className="relative h-max w-[300px] overflow-hidden max-sm:w-[200px]">
            <img src={LOGO} alt="logo" className="h-max w-full object-contain object-center" />
            <div className="loader-logo"></div>
          </div>
          {/* <div className="loader text-5xl max-sm:text-3xl">
            {nowlang == 'uz' && (
              <>
                <span className="l">Y</span>
                <span className="o">u</span>
                <span className="a">k</span>
                <span className="d">l</span>
                <span className="i">a</span>
                <span className="n">n</span>
                <span className="g">m</span>
                <span className="d1">o</span>
                <span className="d2">q</span>
                <span className="d3">d</span>
                <span className="d4">a</span>
              </>
            )}
            {nowlang == 'en' && (
              <>
                <span className="l">L</span>
                <span className="o">o</span>
                <span className="a">a</span>
                <span className="d">d</span>
                <span className="i">i</span>
                <span className="n">n</span>
                <span className="g">g</span>
                <span className="d1">.</span>
                <span className="d2">.</span>
                <span className="d3">.</span>
                <span className="d4">.</span>
              </>
            )}
            {nowlang == 'ru' && (
              <>
                <span className="l">З</span>
                <span className="o">а</span>
                <span className="a">г</span>
                <span className="d">р</span>
                <span className="i">у</span>
                <span className="n">з</span>
                <span className="g">к</span>
                <span className="d1">а</span>
                <span className="d2">.</span>
                <span className="d3">.</span>
                <span className="d4">.</span>
              </>
            )}
            {nowlang == 'kril' && (
              <>
                <span className="l">Ю</span>
                <span className="o">к</span>
                <span className="a">л</span>
                <span className="d">а</span>
                <span className="i">н</span>
                <span className="n">м</span>
                <span className="g">о</span>
                <span className="d1">к</span>
                <span className="d2">д</span>
                <span className="d3">а</span>
                <span className="d4">.</span>
              </>
            )}
          </div> */}
        </div>
      </div>
    </>
  );
};
