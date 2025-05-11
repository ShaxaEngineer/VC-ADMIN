/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

import { CaretDownOutlined, MenuFoldOutlined } from '@ant-design/icons';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { LOGO } from '@/assets';
import { Dropdown } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { routesData } from '@/router';
import { authConfigSelector, logOut, themeConfigActions, themeConfigSelector } from '@/store';

export const Header = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [date, setDate] = useState(new Date());

  // time
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const months = [
    t('Yanvar'),
    t('Fevral'),
    t('Mart'),
    t('Aprel'),
    t('May'),
    t('Iyun'),
    t('Iyul'),
    t('Avgust'),
    t('Sentabr'),
    t('Oktabr'),
    t('Noyabr'),
    t('Dekabr'),
  ];

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    const selector = document.querySelector(
      'ul.horizontal-menu a[href="' + window.location.pathname + '"]',
    );
    if (selector) {
      selector.classList.add('active');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');

      for (let i = 0; i < all.length; i++) {
        all[0]?.classList.remove('active');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ul: any = selector.closest('ul.sub-menu');

      if (ul) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
        if (ele) {
          ele = ele[0];
          setTimeout(() => {
            ele?.classList.add('active');
          });
        }
      }
    }
  }, [location]);

  const isRtl = useAppSelector(themeConfigSelector).rtlClass === 'rtl' ? true : false;

  const themeConfig = useAppSelector(themeConfigSelector);

  const setLocale = (flag: string) => {
    setFlag(flag);
    if (flag.toLowerCase() === 'ae') {
      dispatch(themeConfigActions.toggleRTL('rtl'));
    } else {
      dispatch(themeConfigActions.toggleRTL('ltr'));
    }
  };

  const [flag, setFlag] = useState(themeConfig.locale);

  const { role } = useAppSelector(authConfigSelector);

  return (
    <header
      className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}
    >
      <div className="shadow-sm">
        <div className="relative flex w-full items-center bg-white px-5 py-2 dark:bg-black">
          {/* menu logo */}
          <div className="horizontal-logo flex items-center justify-between gap-3 lg:hidden ltr:mr-2 rtl:ml-2">
            <button
              type="button"
              className="collapse-icon flex-none text-xl hover:text-primary dark:text-[#d0d2d6] dark:hover:text-primary"
              onClick={() => {
                dispatch(themeConfigActions.toggleSidebar());
              }}
            >
              <MenuFoldOutlined />
            </button>
            <Link to="/" className="main-logo flex shrink-0 items-center max-sm:hidden">
              <img
                className="inline max-h-8 max-w-16 object-contain ltr:-ml-1 rtl:-mr-1"
                src={LOGO}
                alt="logo"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-1.5 dark:text-[#d0d2d6] sm:flex-1 lg:space-x-2 ltr:ml-auto ltr:sm:ml-0 rtl:mr-auto rtl:space-x-reverse sm:rtl:mr-0">
            <div className="flex w-full items-center justify-center gap-1 sm:ltr:mr-auto sm:rtl:ml-auto"></div>
            {/* time */}
            <div className="flex w-max min-w-[8.8rem] items-center justify-end text-base font-semibold text-black/70 dark:text-dark-light/60 max-md:hidden">
              {date.getDate()} {months[date.getMonth()]}, {formatTime(date)}
            </div>
            {/* line vertical */}
            <div className="!mx-5 h-9 w-[1px] bg-white-light/60 dark:bg-dark/60 max-sm:hidden"></div>
            {/* language */}
            <div className="dropdown shrink-0">
              <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                btnClassName="block px-4 rounded-xl bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                button={
                  <div className="flex h-9 items-center justify-center gap-2">
                    <img
                      className="h-5 w-5 rounded-full object-cover"
                      src={`/assets/images/flags/${flag.toUpperCase()}.svg`}
                      alt="flag"
                    />
                    <span className="ml-1 text-sm text-dark dark:text-white-dark max-lg:ml-0">
                      <CaretDownOutlined />
                    </span>
                  </div>
                }
              >
                <ul className="grid w-max grid-cols-1 gap-2 !px-2 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                  {themeConfig.languageList.map((item: { code: string; name: string }) => {
                    return (
                      <li key={item.code}>
                        <button
                          type="button"
                          className={`flex w-full rounded-lg hover:text-primary ${i18next.language === item.code ? 'bg-primary/10 text-primary' : ''}`}
                          onClick={() => {
                            dispatch(themeConfigActions.toggleLocale(item.code));
                            setLocale(item.code);
                          }}
                        >
                          <img
                            src={`/assets/images/flags/${item.code.toUpperCase()}.svg`}
                            alt="flag"
                            className="h-5 w-5 rounded-full object-cover"
                          />
                          <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </Dropdown>
            </div>
            {/* person */}
            <div className="dropdown flex shrink-0">
              <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                btnClassName="relative group block"
                button={
                  <div className="flex h-9 w-max items-center justify-center gap-2 rounded-xl bg-white-light/30 px-3 dark:bg-dark dark:bg-opacity-[0.08]">
                    <img
                      className="h-7 w-7 rounded-full object-cover saturate-50 group-hover:saturate-100"
                      src={'/assets/images/user-profile.jpeg'}
                      alt="userProfile"
                    />
                    <span className="mr-4 text-base font-semibold text-dark dark:text-white-dark max-lg:mr-0">
                      {'-'}
                    </span>
                    <span className="text-sm text-dark dark:text-white-dark">
                      <CaretDownOutlined />
                    </span>
                  </div>
                }
              >
                <ul className="w-[230px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                  <li>
                    <div className="flex items-center px-4 py-4">
                      <img
                        className="h-10 w-10 rounded-md object-cover"
                        src={'/assets/images/user-profile.jpeg'}
                        alt="userProfile"
                      />
                      <div className="truncate ltr:pl-4 rtl:pr-4">
                        <h4 className="text-base">
                          {'-'}
                          <span className="rounded bg-success-light px-1 text-xs text-success ltr:ml-2 rtl:ml-2">
                            Pro
                          </span>
                        </h4>
                        <button
                          type="button"
                          className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                        >
                          {'-'}
                        </button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link to="/users/profile" className="dark:hover:text-white">
                      <svg
                        className="shrink-0 ltr:mr-2 rtl:ml-2"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
                        <path
                          opacity="0.5"
                          d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                      {t('Shaxsiy kabinent')}
                    </Link>
                  </li>
                  <li>
                    <Link to="/apps/mailbox" className="dark:hover:text-white">
                      <svg
                        className="shrink-0 ltr:mr-2 rtl:ml-2"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.5"
                          d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908L18 8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      {t('Xabarlar')}
                    </Link>
                  </li>
                  <li className="border-t border-white-light dark:border-white-light/10">
                    <button className="!py-3 text-danger" onClick={() => dispatch(logOut())}>
                      <svg
                        className="shrink-0 rotate-90 ltr:mr-2 rtl:ml-2"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.5"
                          d="M17 9.00195C19.175 9.01406 20.3529 9.11051 21.1213 9.8789C22 10.7576 22 12.1718 22 15.0002V16.0002C22 18.8286 22 20.2429 21.1213 21.1215C20.2426 22.0002 18.8284 22.0002 16 22.0002H8C5.17157 22.0002 3.75736 22.0002 2.87868 21.1215C2 20.2429 2 18.8286 2 16.0002L2 15.0002C2 12.1718 2 10.7576 2.87868 9.87889C3.64706 9.11051 4.82497 9.01406 7 9.00195"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {t('Tizimdan chiqish')}
                    </button>
                  </li>
                </ul>
              </Dropdown>
            </div>
          </div>
        </div>
        {/* horizontal menu */}
        <ul className="horizontal-menu hidden border-t border-[#ebedf2] bg-white px-6 py-1.5 font-semibold text-black dark:border-[#191e3a] dark:bg-black dark:text-white-dark lg:space-x-1.5 xl:space-x-8 rtl:space-x-reverse">
          {routesData?.map((item) => {
            if (
              !item?.text &&
              item?.index &&
              item?.role?.some((element) => role?.includes(element))
            ) {
              if (item?.children) {
                return (
                  <li key={item.id} className="menu nav-item relative">
                    <button type="button" className="nav-link">
                      <div className="flex items-center">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="shrink-0"
                        >
                          <path
                            opacity="0.5"
                            d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
                            fill="currentColor"
                          />
                          <path
                            d="M9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="px-1">{t(`${item?.title}`)}</span>
                      </div>
                      <div className="right_arrow">
                        <svg
                          className="rotate-90"
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
                    <ul className="sub-menu">
                      {item?.children?.map((children) => {
                        if (children.index)
                          return (
                            <li key={children.id}>
                              <NavLink to={children?.path as string}>
                                {t(`${children?.title}`)}
                              </NavLink>
                            </li>
                          );
                      })}
                    </ul>
                  </li>
                );
              } else {
                return (
                  <li key={item.id} className="menu nav-item">
                    <NavLink to={item?.path ? item.path : ''} className="nav-link group">
                      <div className="flex items-center">
                        <svg
                          className="shrink-0 group-hover:!text-primary"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.5"
                            d="M6.22209 4.60105C6.66665 4.304 7.13344 4.04636 7.6171 3.82976C8.98898 3.21539 9.67491 2.9082 10.5875 3.4994C11.5 4.09061 11.5 5.06041 11.5 7.00001V8.50001C11.5 10.3856 11.5 11.3284 12.0858 11.9142C12.6716 12.5 13.6144 12.5 15.5 12.5H17C18.9396 12.5 19.9094 12.5 20.5006 13.4125C21.0918 14.3251 20.7846 15.011 20.1702 16.3829C19.9536 16.8666 19.696 17.3334 19.399 17.7779C18.3551 19.3402 16.8714 20.5578 15.1355 21.2769C13.3996 21.9959 11.4895 22.184 9.64665 21.8175C7.80383 21.4509 6.11109 20.5461 4.78249 19.2175C3.45389 17.8889 2.5491 16.1962 2.18254 14.3534C1.81598 12.5105 2.00412 10.6004 2.72315 8.86451C3.44218 7.12861 4.65982 5.64492 6.22209 4.60105Z"
                            fill="currentColor"
                          />
                          <path
                            d="M21.446 7.06901C20.6342 5.00831 18.9917 3.36579 16.931 2.55398C15.3895 1.94669 14 3.34316 14 5.00002V9.00002C14 9.5523 14.4477 10 15 10H19C20.6569 10 22.0533 8.61055 21.446 7.06901Z"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                          {t(`${item?.title}`)}
                        </span>
                      </div>
                    </NavLink>
                  </li>
                );
              }
            }
          })}
        </ul>
      </div>
    </header>
  );
};
