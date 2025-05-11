/* eslint-disable @typescript-eslint/no-explicit-any */
// Raqamlarni 2 xonali formatga o'tkazish (agar 0 bo‘lsa "00" ko‘rinishda bo‘ladi)
export const formatNumber = (num: number) => num.toString().padStart(2, '0');
// milliseconds to time
export function convertMilliseconds(data: any) {
  const ms: number = data?.reduce(
    (accumulator: number, currentValue: any) => accumulator + (currentValue?.duration || 0),
    0,
  );
  return timeGetFormat(ms);
}
// Vaqtni hisoblash (start va end vaqtlar orasidagi farqni hisoblash)
export function getTimeDifference(startTime: string, endTime: string): string {
  const start: Date = new Date(startTime);
  const end: Date = endTime ? new Date(endTime) : new Date();
  const diffMs: number = end?.getTime() - start?.getTime(); // Millisekund farqi
  return timeGetFormat(diffMs);
}
// Vaqtni formatlash
export const timeGetFormat = (ms: number) => {
  let seconds: number = Math.floor(ms / 1000);
  let minutes: number = Math.floor(seconds / 60);
  const hours: number = Math.floor(minutes / 60);
  seconds %= 60;
  minutes %= 60;
  return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
};
