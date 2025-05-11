import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';

interface TKmoGetName {
  bool: boolean;
  active?: string;
  passive?: string;
}

export const BooleanGetName: React.FC<TKmoGetName> = memo(({ bool, active, passive }) => {
  const { t } = useTranslation();

  if (bool)
    return (
      <p className="w-max rounded border border-green-500 bg-green-500/5 px-3 text-base font-medium text-green-500">
        {active || t('Faol')}
      </p>
    );
  else
    return (
      <p className="w-max rounded border border-red-500 bg-red-500/5 px-3 text-base font-medium text-red-500">
        {passive || t('Faol emas')}
      </p>
    );
});
