/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, useEffect } from 'react';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import {
  ANIMATION,
  LAYOUT,
  MENU,
  NAVBAR,
  RTL_CLASS,
  SEMIDARK,
  THEME,
  i18nextLng,
} from '@/constants';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Router } from '@/router';
import { store, themeConfigActions, themeConfigSelector } from '@/store';
import { getLocalStorage } from '@/utils';

export const App = () => {
  const { t } = useTranslation();
  const themeConfig = useAppSelector(themeConfigSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(themeConfigActions.toggleTheme(getLocalStorage(THEME) || themeConfig.theme));
    dispatch(themeConfigActions.toggleMenu(getLocalStorage(MENU) || themeConfig.menu));
    dispatch(themeConfigActions.toggleLayout(getLocalStorage(LAYOUT) || themeConfig.layout));
    dispatch(themeConfigActions.toggleRTL(getLocalStorage(RTL_CLASS) || themeConfig.rtlClass));
    dispatch(
      themeConfigActions.toggleAnimation(getLocalStorage(ANIMATION) || themeConfig.animation),
    );
    dispatch(themeConfigActions.toggleNavbar(getLocalStorage(NAVBAR) || themeConfig.navbar));
    dispatch(themeConfigActions.toggleLocale(getLocalStorage(i18nextLng) || themeConfig.locale));
    dispatch(themeConfigActions.toggleSemidark(getLocalStorage(SEMIDARK) || themeConfig.semidark));
  }, [
    dispatch,
    themeConfig.theme,
    themeConfig.menu,
    themeConfig.layout,
    themeConfig.rtlClass,
    themeConfig.animation,
    themeConfig.navbar,
    themeConfig.locale,
    themeConfig.semidark,
  ]);

  // ant language

  const customMonths = [
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

  const customWeekdays = [
    t('Yakshanba'),
    t('Dushanba'),
    t('Seshanba'),
    t('Chorshanba'),
    t('Payshanba'),
    t('Juma'),
    t('Shanba'),
  ];
  const customWeekdaysShort = [
    t('Yak'),
    t('Dush'),
    t('Sesh'),
    t('Chor'),
    t('Pay'),
    t('Jum'),
    t('Shan'),
  ];
  const customWeekdaysMin = [t('Ya'), t('Du'), t('Se'), t('Cho'), t('Pa'), t('Ju'), t('Sha')];
  const customLocale = {
    name: 'uz-custom',
    months: customMonths,
    monthsShort: customMonths,
    weekdays: customWeekdays,
    weekdaysShort: customWeekdaysShort,
    weekdaysMin: customWeekdaysMin,
    formats: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm',
    },
    ordinal: (n: any) => `${n}-`,
    relativeTime: {
      future: '%s keyin',
      past: '%s oldin',
      s: 'soniya',
      m: 'bir daqiqa',
      mm: '%d daqiqa',
      h: 'bir soat',
      hh: '%d soat',
      d: 'bir kun',
      dd: '%d kun',
      M: 'bir oy',
      MM: '%d oy',
      y: 'bir yil',
      yy: '%d yil',
    },
  };

  dayjs.locale(customLocale);

  return (
    <Suspense>
      <div
        className={`${(store.getState().themeConfig.sidebar && 'toggle-sidebar') || ''} ${themeConfig.menu} ${themeConfig.layout} ${
          themeConfig.rtlClass
        } main-section relative font-nunito text-sm font-normal antialiased`}
      >
        <Router />
      </div>
    </Suspense>
  );
};
