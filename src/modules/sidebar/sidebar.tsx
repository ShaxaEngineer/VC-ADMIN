/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

import { MenuFoldOutlined } from '@ant-design/icons';
import AnimateHeight from 'react-animate-height';
import { useTranslation } from 'react-i18next';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavLink, useLocation } from 'react-router-dom';

import { LOGO } from '@/assets';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { routesData } from '@/router';
import { authConfigSelector, themeConfigActions, themeConfigSelector } from '@/store';

export const Sidebar = () => {
  const [currentMenu, setCurrentMenu] = useState<string>('');
  const location = useLocation();
  const themeConfig = useAppSelector(themeConfigSelector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const toggleMenu = (value: any) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? '' : value;
    });
  };

  useEffect(() => {
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]',
    );
    if (selector) {
      selector.classList.add('active');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ul: any = selector.closest('ul.sub-menu');
      if (ul) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(themeConfigActions.toggleSidebar());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const { role } = useAppSelector(authConfigSelector);

  return (
    <div className={themeConfig.semidark ? 'dark' : ''}>
      <nav
        className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] transition-all duration-300 max-lg:shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] ${themeConfig.semidark ? 'text-white-dark' : ''}`}
      >
        <div className="h-full bg-[#F5F7F8] dark:bg-[#060818] max-lg:bg-white max-lg:dark:bg-black">
          <div className="flex items-center justify-start gap-3 bg-white px-4 py-3 shadow-sm dark:bg-black max-lg:shadow-none">
            <button
              type="button"
              className="collapse-icon text-xl transition duration-300 hover:text-primary dark:text-white-light dark:hover:text-primary rtl:rotate-180"
              onClick={() => dispatch(themeConfigActions.toggleSidebar())}
            >
              <MenuFoldOutlined />
            </button>
            <NavLink to="/" className="main-logo flex shrink-0 items-center">
              <img className="max-h-8 max-w-16 flex-none object-contain" src={LOGO} alt="logo" />
            </NavLink>
          </div>
          <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
            <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
              {routesData?.map((item) => {
                if (item?.index && item?.role?.some((element) => role?.includes(element))) {
                  if (item?.text) {
                    return (
                      <h2
                        key={item.id}
                        className="-mx-4 mb-1 flex w-full items-center truncate bg-transparent px-7 py-3 font-extrabold uppercase max-lg:bg-white-light/30 max-lg:dark:bg-dark max-lg:dark:bg-opacity-[0.08]"
                      >
                        <svg
                          className="hidden h-5 w-4 flex-none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        <span>{t(`${item?.title}`)}</span>
                      </h2>
                    );
                  } else {
                    if (item?.children) {
                      return (
                        <li key={item.id} className="menu nav-item">
                          <button
                            type="button"
                            className={`${currentMenu === item.id ? 'active' : ''} nav-link group w-full`}
                            onClick={() => toggleMenu(item.id)}
                          >
                            <div className="flex items-center">
                              <p className="flex shrink-0 items-center justify-center !text-sm group-hover:!text-primary">
                                {item?.icon}
                              </p>
                              <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                                {t(`${item?.title}`)}
                              </span>
                            </div>
                            <div
                              className={
                                currentMenu === item.id
                                  ? 'rotate-90 transition-all duration-300'
                                  : 'transition-all duration-300 rtl:rotate-180'
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9 5L15 12L9 19"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </button>
                          <AnimateHeight
                            duration={300}
                            height={currentMenu === item.id ? 'auto' : 0}
                          >
                            <ul className="sub-menu text-gray-500">
                              {item?.children?.map((children) => {
                                if (children.index)
                                  return (
                                    <li key={children.id}>
                                      <NavLink
                                        to={children?.path ? children.path : ''}
                                        className="w-full"
                                      >
                                        {t(`${children?.title}`)}
                                      </NavLink>
                                    </li>
                                  );
                              })}
                            </ul>
                          </AnimateHeight>
                        </li>
                      );
                    } else {
                      return (
                        <li key={item.id} className="menu nav-item">
                          <NavLink to={item?.path ? item.path : ''} className="group">
                            <div className="flex items-center">
                              <div className="flex shrink-0 items-center justify-center group-hover:!text-primary">
                                {item?.icon}
                              </div>
                              <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                                {t(`${item?.title}`)}
                              </span>
                            </div>
                          </NavLink>
                        </li>
                      );
                    }
                  }
                }
              })}
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};
