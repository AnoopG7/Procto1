import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { Theme, Components } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';

import SvgIcon, { svgIconClasses } from '@mui/material/SvgIcon';
import { autocompleteClasses } from '@mui/material/Autocomplete';

// ----------------------------------------------------------------------

/* **********************************************************************
 * ♉️ Custom icons
 * **********************************************************************/
const ArrowDownIcon = (props: SvgIconProps) => (
  // https://icon-sets.iconify.design/eva/arrow-ios-downward-fill/
  <SvgIcon {...props}>
    <path
      fill="currentColor"
      d="M12 16a1 1 0 0 1-.64-.23l-6-5a1 1 0 1 1 1.28-1.54L12 13.71l5.36-4.32a1 1 0 0 1 1.41.15a1 1 0 0 1-.14 1.46l-6 4.83A1 1 0 0 1 12 16"
    />
  </SvgIcon>
);

/* **********************************************************************
 * 🧩 Components
 * **********************************************************************/
const MuiAutocomplete: Components<Theme>['MuiAutocomplete'] = {
  // ▼▼▼▼▼▼▼▼ ⚙️ PROPS ▼▼▼▼▼▼▼▼
  defaultProps: {
    popupIcon: <ArrowDownIcon />,
  },
  // ▼▼▼▼▼▼▼▼ 🎨 STYLE ▼▼▼▼▼▼▼▼
  styleOverrides: {
    root: ({ theme }) => ({
      [`& span.${autocompleteClasses.tag}`]: {
        ...theme.typography.subtitle2,
        height: 24,
        minWidth: 24,
        lineHeight: '24px',
        textAlign: 'center',
        padding: theme.spacing(0, 0.75),
        color: theme.vars!.palette.text.secondary,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: varAlpha(theme.vars!.palette.grey['500'], 0.16),
      },
    }),
    paper: ({ theme }) => ({
      ...theme.mixins.paperStyles(theme, { dropdown: true }),
    }),
    listbox: ({ theme }) => ({
      padding: 0,
      [`& .${autocompleteClasses.option}`]: {
        ...theme.mixins.menuItemStyles(theme),
      },
    }),
    endAdornment: {
      [`& .${svgIconClasses.root}`]: {
        fontSize: 18,
      },
    },
  },
};

/* **********************************************************************
 * 🚀 Export
 * **********************************************************************/
export const autocomplete: Components<Theme> = {
  MuiAutocomplete,
};
