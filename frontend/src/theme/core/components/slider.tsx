import type { Theme, Components, ComponentsVariants } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';

import { sliderClasses } from '@mui/material/Slider';

// ----------------------------------------------------------------------

/**
 * TypeScript extension for MUI theme augmentation.
 * @to {@link file://./../../extend-theme-types.d.ts}
 */

export type SliderExtendColor = {
  inherit: true;
};

const SIZES = ['small', 'medium'] as const;
const ORIENTATIONS = ['horizontal', 'vertical'] as const;
const DIMENSIONS = {
  small: { rail: 6, thumb: 16, mark: 4 },
  medium: { rail: 10, thumb: 20, mark: 6 },
} as const;

/* **********************************************************************
 * 🗳️ Variants
 * **********************************************************************/

const thumbVariants = [
  ...(SIZES.map(size => ({
    props: props => props.size === size,
    style: {
      width: DIMENSIONS[size].thumb,
      height: DIMENSIONS[size].thumb,
    },
  })) satisfies ComponentsVariants<Theme>['MuiSlider']),
] satisfies ComponentsVariants<Theme>['MuiSlider'];

const railVariants = [
  ...(ORIENTATIONS.flatMap(orientation =>
    SIZES.map(size => ({
      props: props => props.orientation === orientation && props.size === size,
      style:
        orientation === 'horizontal'
          ? { height: DIMENSIONS[size].rail }
          : { width: DIMENSIONS[size].rail },
    }))
  ) satisfies ComponentsVariants<Theme>['MuiSlider']),
] satisfies ComponentsVariants<Theme>['MuiSlider'];

const trackVariants = [
  ...(ORIENTATIONS.flatMap(orientation =>
    SIZES.map(size => ({
      props: props => props.orientation === orientation && props.size === size,
      style:
        orientation === 'horizontal'
          ? { height: DIMENSIONS[size].rail }
          : { width: DIMENSIONS[size].rail },
    }))
  ) satisfies ComponentsVariants<Theme>['MuiSlider']),
] satisfies ComponentsVariants<Theme>['MuiSlider'];

const markVariants = [
  ...(ORIENTATIONS.flatMap(orientation =>
    SIZES.map(size => ({
      props: props => props.orientation === orientation && props.size === size,
      style:
        orientation === 'horizontal'
          ? { width: 1, height: DIMENSIONS[size].mark }
          : { height: 1, width: DIMENSIONS[size].mark },
    }))
  ) satisfies ComponentsVariants<Theme>['MuiSlider']),
] satisfies ComponentsVariants<Theme>['MuiSlider'];

const markActiveVariants = [
  {
    props: props => props.color === 'inherit',
    style: ({ theme }) => ({
      ...theme.applyStyles('dark', {
        backgroundColor: varAlpha(theme.vars!.palette.grey['800Channel'], 0.48),
      }),
    }),
  },
] satisfies ComponentsVariants<Theme>['MuiSlider'];

const disabledVariants = [
  {
    props: props => !!props.disabled,
    style: ({ theme }) => ({
      [`&.${sliderClasses.disabled}`]: {
        color: theme.vars!.palette.action.disabled,
      },
    }),
  },
] satisfies ComponentsVariants<Theme>['MuiSlider'];

/* **********************************************************************
 * 🧩 Components
 * **********************************************************************/
const MuiSlider: Components<Theme>['MuiSlider'] = {
  // ▼▼▼▼▼▼▼▼ ⚙️ PROPS ▼▼▼▼▼▼▼▼
  defaultProps: {
    size: 'small',
  },
  // ▼▼▼▼▼▼▼▼ 🎨 STYLE ▼▼▼▼▼▼▼▼
  styleOverrides: {
    root: {
      variants: [...disabledVariants],
    },
    thumb: ({ theme }) => ({
      boxShadow: theme.vars!.customShadows.z1,
      color: theme.vars!.palette.common.white,
      border: `solid 1px ${varAlpha(theme.vars!.palette.grey['500'], 0.08)}`,
      '&::before': {
        opacity: 0.4,
        boxShadow: 'none',
        width: 'calc(100% - 4px)',
        height: 'calc(100% - 4px)',
        backgroundImage: `linear-gradient(180deg, ${theme.vars!.palette.grey[500]}, transparent)`,
        ...theme.applyStyles('dark', {
          opacity: 0.8,
        }),
      },
      variants: [...thumbVariants],
    }),
    rail: ({ theme }) => ({
      opacity: 0.12,
      backgroundColor: theme.vars!.palette.grey[500],
      variants: [...railVariants],
    }),
    track: {
      variants: [...trackVariants],
    },
    mark: ({ style, theme }) => ({
      backgroundColor: varAlpha(theme.vars!.palette.grey['500'], 0.48),
      // start mark
      '&[data-index="0"]': { display: 'none' },
      // end mark
      ...((style?.left || style?.bottom) === '100%' && { display: 'none' }),
      variants: [...markVariants],
    }),
    markActive: ({ theme }) => ({
      backgroundColor: varAlpha(theme.vars!.palette.common.whiteChannel, 0.64),
      variants: [...markActiveVariants],
    }),
    markLabel: ({ theme }) => ({
      fontSize: theme.typography.pxToRem(13),
      color: theme.vars!.palette.text.disabled,
    }),
    valueLabel: ({ theme }) => ({
      borderRadius: 8,
      backgroundColor: theme.vars!.palette.grey[800],
      ...theme.applyStyles('dark', {
        backgroundColor: theme.vars!.palette.grey[700],
      }),
    }),
  },
};

/* **********************************************************************
 * 🚀 Export
 * **********************************************************************/
export const slider: Components<Theme> = {
  MuiSlider,
};
