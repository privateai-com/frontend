import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  LegacyRef,
  MouseEventHandler,
  PropsWithChildren,
} from 'react';

export type ButtonRef = LegacyRef<HTMLButtonElement> | undefined;

export type ButtonProps = PropsWithChildren<
DetailedHTMLProps<
ButtonHTMLAttributes<HTMLButtonElement>,
HTMLButtonElement
> & {
  theme?: ButtonTheme;
  isBiggerText?: boolean;
  isFullWidth?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  iconClassName?: string;
  edgingClassName?: string;
  isLoading?: boolean;
  isMobileAdaptive?: boolean;
  withoutOuterBorder?: boolean;
  href?: string;
}>;

export type ButtonTheme = 'primary' | 'secondary' | 'grey';
