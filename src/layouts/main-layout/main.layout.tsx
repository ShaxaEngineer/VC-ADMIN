import { PropsWithChildren, Suspense, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { Header, Settings, Sidebar } from '@/modules';
import { themeConfigActions } from '@/store';
import { themeConfigSelector } from '@/store';

export const MainLayout = ({ children }: PropsWithChildren) => {
  const themeConfig = useSelector(themeConfigSelector);
  const [showTopButton, setShowTopButton] = useState(false);

  const goToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const onScrollHandler = () => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScrollHandler);
    return () => {
      window.removeEventListener('onscroll', onScrollHandler);
    };
  }, []);

  return (
    <div className="relative">
      {/* BEGIN MAIN CONTAINER 🔝 */}
      {/* sidebar menu overlay */}
      <div
        className={`${(!themeConfig.sidebar && 'hidden') || ''} fixed inset-0 z-50 bg-[black]/60 lg:hidden`}
        onClick={() => themeConfigActions.toggleSidebar()}
      ></div>
      <div className="fixed bottom-6 z-50 ltr:right-6 rtl:left-6">
        {showTopButton && (
          <button
            type="button"
            className="btn btn-outline-primary animate-pulse rounded-full bg-[#F5F7F8] p-2 dark:bg-[#060818] dark:hover:bg-primary"
            onClick={goToTop}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l4-4m0 0l4 4m-4-4v18" />
            </svg>
          </button>
        )}
      </div>
      {/* BEGIN APP SETTING LAUNCHER */}
      <Settings />
      {/* END APP SETTING LAUNCHER */}
      <div
        className={`${themeConfig.navbar} main-container min-h-screen text-black dark:text-white-dark`}
      >
        {/* BEGIN SIDEBAR */}
        <Sidebar />
        {/* END SIDEBAR */}
        <div className="main-content flex min-h-screen flex-col">
          {/* BEGIN TOP NAVBAR */}
          <Header />
          {/* END TOP NAVBAR */}
          {/* BEGIN CONTENT AREA */}
          <Suspense>
            <div className={`${themeConfig.animation} animate__animated p-6`}>{children}</div>
          </Suspense>
          {/* END CONTENT AREA */}
          {/* BEGIN FOOTER */}
          {/* <Footer /> */}
          {/* END FOOTER */}
        </div>
      </div>
    </div>
  );
};
