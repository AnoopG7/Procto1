import type { Shadows } from '@mui/material/styles';
import type { SchemesRecord } from '../types';

import { safeVarAlpha } from '../../utils/color-utils';

import { createTheme } from '@mui/material/styles';

import { grey, common } from './palette';

// ----------------------------------------------------------------------

function updateShadowColor(shadow: string, colorChannel: string): string {
  return shadow.replace(/rgba\(\d+,\d+,\d+,(.*?)\)/g, (_, alpha) => {
    // Convert decimal alpha (e.g., "0.2") to percentage string (e.g., "20%")
    const alphaNum = parseFloat(alpha);
    const alphaPercent = !isNaN(alphaNum) ? `${Math.round(alphaNum * 100)}%` : alpha;
    return safeVarAlpha(colorChannel, alphaPercent);
  });
}

function createShadows(colorChannel: string): Shadows {
  // Get default MUI shadows
  const { shadows: defaultShadows } = createTheme();

  return defaultShadows.map(shadow => updateShadowColor(shadow, colorChannel)) as Shadows;
}

/* **********************************************************************
 * 📦 Final
 * **********************************************************************/
export const shadows: SchemesRecord<Shadows> = {
  light: createShadows(grey['500']),
  dark: createShadows(common.blackChannel),
};
