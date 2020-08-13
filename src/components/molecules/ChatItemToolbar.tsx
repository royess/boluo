import { bgColor, pX, pY, uiShadow } from '@/styles/atoms';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import React from 'react';
import { darken } from 'polished';

export const toolbarRadius = css`
  border-radius: 4px;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  transform: translateY(-75%);
  ${[pX(6), pY(2)]};

  &[data-position='bottom'] {
    top: unset;
    bottom: 0;
    transform: translateY(80%);
  }
`;

const Toolbar = styled.div`
  background-color: ${darken(0.05, bgColor)};
  ${[uiShadow, pY(2), pX(2), toolbarRadius]};
`;

export interface Props {
  className?: string;
  children: React.ReactNode;
  position?: 'bottom' | 'top';
}

export function ChatItemToolbar({ children, className, position = 'top' }: Props) {
  return (
    <Container className={className} data-position={position}>
      <Toolbar>{children}</Toolbar>
    </Container>
  );
}

export default ChatItemToolbar;