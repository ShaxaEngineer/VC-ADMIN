import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

interface UseLangResult {
  nowlang: string;
}

export const useLang = (): UseLangResult => {
  const { i18n } = useTranslation();
  const [nowlang, setnowlang] = useState<string>(i18n.language);
  useEffect(() => {
    setnowlang(i18n.language);
  }, [i18n.language]);
  return { nowlang };
};
