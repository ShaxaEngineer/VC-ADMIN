/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { getLocalStorage } from './local-storage.utils';

// bu yerda id yaratilmoqda
export function idCreate(): string {
  return 'id' + Math.random().toString(16).slice(2);
}

export const getLangName = (arr: any[], lang?: string) => {
  const nowlang = lang ? lang : getLocalStorage('i18nextLng');
  if (!nowlang) return arr?.filter((e) => e?.language?.toLowerCase() == 'uz')?.[0];
  return arr?.filter((e) => e?.language?.toLowerCase() == nowlang)?.[0];
};

export const getLangNameObject = (obj: any, lang?: string) => {
  const nowlang = lang ? lang : getLocalStorage('i18nextLng');
  if (nowlang == 'en') return obj?.nameEn ? obj?.nameEn : obj?.name;
  else if (nowlang == 'ru') return obj?.nameRu ? obj?.nameRu : obj?.name;
  else if (nowlang == 'kril') return obj?.nameKril ? obj?.nameKril : obj?.name;
  else return obj?.name;
};

// Plaginlarni ulaymiz
dayjs.extend(utc);
dayjs.extend(timezone);
export function dayjsFormat(date: any, format: string = 'DD.MM.YYYY | HH:mm:ss') {
  if (!date) return '-';
  return dayjs(date)?.tz('Asia/Tashkent')?.format(format);
}

export const getDateForm = (e: any, format: any = 'YYYY-MM-DD') => {
  if (e && format) return dayjs(e)?.format(format);
  else if (e && !format) return dayjs(e);
  else return '';
};

export const timeTablekmoItem = (time: number): boolean => {
  if (!time) return false;
  const ms = time + 7 * 24 * 60 * 60 - Math.floor(new Date().getTime() / 1000);
  if (ms > 0) return true;
  else return false;
};

export function buildUrl(base: string, params: any): string {
  const queryParts = Object.keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== null) // Faqat aniqlangan va null bo'lmagan qiymatlarni qabul qiladi
    .flatMap((key) => {
      const value = params[key];
      // Agar qiymat array bo'lsa, har bir element uchun alohida query qismi qaytariladi
      if (Array.isArray(value)) {
        return value.map((item) => `${key}=${encodeURIComponent(item)}`);
      }
      // Agar array bo'lmasa, oddiy key-value juftligi qaytariladi
      return `${key}=${encodeURIComponent(value)}`;
    })
    .map((part, index) => (index === 0 ? '?' + part : '&' + part)); // Birinchi qismga ? va qolganlariga &
  return base + queryParts.join('');
}
