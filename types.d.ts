// types.d.ts
import { SpacerProps as OriginalSpacerProps } from '@geist-ui/core/dist/spacer';

declare module '@geist-ui/core/dist/spacer' {
  interface SpacerProps extends OriginalSpacerProps {
    y?: number;
  }
}