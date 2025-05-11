import { createSlice } from '@reduxjs/toolkit';
import i18next from 'i18next';

import {
  ANIMATION,
  LAYOUT,
  MENU,
  NAVBAR,
  RTL_CLASS,
  SEMIDARK,
  SIDEBAR,
  THEME,
  i18nextLng,
  themeConfig,
} from '@/constants';
import { TRootState } from '@/types';
import { getLocalStorage, setLocalStorage } from '@/utils';

const defaultState = {
  isDarkMode: false,
  mainLayout: 'app',
  theme: 'light',
  menu: 'vertical',
  layout: 'full',
  rtlClass: 'ltr',
  animation: '',
  navbar: 'navbar-sticky',
  locale: 'uz',
  sidebar: false,
  pageTitle: '',
  languageList: [
    { code: 'uz', name: "O'zbek" },
    { code: 'kril', name: 'Ўзбек' },
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
  ],
  semidark: false,
};

const initialState = {
  theme: getLocalStorage(THEME) || themeConfig.theme,
  menu: getLocalStorage(MENU) || themeConfig.menu,
  layout: getLocalStorage(LAYOUT) || themeConfig.layout,
  rtlClass: getLocalStorage(RTL_CLASS) || themeConfig.rtlClass,
  animation: getLocalStorage(ANIMATION) || themeConfig.animation,
  navbar: getLocalStorage(NAVBAR) || themeConfig.navbar,
  locale: getLocalStorage(i18nextLng) || themeConfig.locale,
  isDarkMode: false,
  sidebar: getLocalStorage(SIDEBAR) || defaultState.sidebar,
  semidark: getLocalStorage(SEMIDARK) || themeConfig.semidark,
  languageList: [
    { code: 'uz', name: "O'zbek" },
    { code: 'kril', name: 'Ўзбек' },
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
  ],
};

const themeConfigSlice = createSlice({
  name: 'theme',
  initialState: initialState,
  reducers: {
    toggleTheme(state, { payload }) {
      payload = payload || state.theme; // light | dark | system
      setLocalStorage(THEME, payload);
      state.theme = payload;
      if (payload === 'light') {
        state.isDarkMode = false;
      } else if (payload === 'dark') {
        state.isDarkMode = true;
      } else if (payload === 'system') {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          state.isDarkMode = true;
        } else {
          state.isDarkMode = false;
        }
      }

      if (state.isDarkMode) {
        document.querySelector('body')?.classList.add('dark');
      } else {
        document.querySelector('body')?.classList.remove('dark');
      }
    },
    toggleMenu(state, { payload }) {
      payload = payload || state.menu; // vertical, collapsible-vertical, horizontal
      state.sidebar = false; // reset sidebar state
      setLocalStorage(MENU, payload);
      state.menu = payload;
    },
    toggleLayout(state, { payload }) {
      payload = payload || state.layout; // full, boxed-layout
      setLocalStorage(LAYOUT, payload);
      state.layout = payload;
    },
    toggleRTL(state, { payload }) {
      payload = payload || state.rtlClass; // rtl, ltr
      setLocalStorage(RTL_CLASS, payload);
      state.rtlClass = payload;
      document.querySelector('html')?.setAttribute('dir', state.rtlClass || 'ltr');
    },
    toggleAnimation(state, { payload }) {
      payload = payload || state.animation; // animate__fadeIn, animate__fadeInDown, animate__fadeInUp, animate__fadeInLeft, animate__fadeInRight, animate__slideInDown, animate__slideInLeft, animate__slideInRight, animate__zoomIn
      payload = payload?.trim();
      setLocalStorage(ANIMATION, payload);
      state.animation = payload;
    },
    toggleNavbar(state, { payload }) {
      payload = payload || state.navbar; // navbar-sticky, navbar-floating, navbar-static
      setLocalStorage(NAVBAR, payload);
      state.navbar = payload;
    },
    toggleSemidark(state, { payload }) {
      payload = payload === true || payload === 'true' ? true : false;
      setLocalStorage(SEMIDARK, payload);
      state.semidark = payload;
    },
    toggleLocale(state, { payload }) {
      payload = payload || state.locale;
      try {
        i18next.changeLanguage(payload);
      } catch (error) {
        console.error(error);
      }
      state.locale = payload;
    },
    toggleSidebar(state) {
      state.sidebar = !state.sidebar;
    },

    setPageTitle(_, { payload }) {
      document.title = `${payload} | UCT - Multipurpose Tailwind Dashboard Template`;
    },
  },
});

export const {
  toggleTheme,
  toggleMenu,
  toggleLayout,
  toggleRTL,
  toggleAnimation,
  toggleNavbar,
  toggleSemidark,
  toggleLocale,
  toggleSidebar,
  setPageTitle,
} = themeConfigSlice.actions;

export const themeConfigActions = themeConfigSlice.actions;
export const themeConfigReducer = themeConfigSlice.reducer;
export const themeConfigSelector = (state: TRootState) => state.themeConfig;
