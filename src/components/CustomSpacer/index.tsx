// src/components/CustomSpacer.tsx
import React from 'react';
import { Spacer as OriginalSpacer } from '@geist-ui/core';
// import { CustomSpacerProps } from '../types/CustomSpacerProps';


import { SpacerProps as OriginalSpacerProps } from '@geist-ui/core/dist/spacer';

export interface CustomSpacerProps extends OriginalSpacerProps {
  y?: number;
}

const CustomSpacer: React.FC<CustomSpacerProps> = ({ y,...props }) => {
  const modifiedStyle = {
    ...(y !== undefined && { marginTop: `${y * 8}px`, marginBottom: `${y * 8}px` }), // 8px 단위 사용
  };

  return <OriginalSpacer {...props} style={modifiedStyle} />;
};

export default CustomSpacer;