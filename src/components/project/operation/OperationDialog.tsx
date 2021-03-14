import React, { BaseSyntheticEvent } from 'react';
import { Dialog, DialogProps } from '@material-ui/core';
import styled, { css } from 'styled-components';

type Props = DialogProps;

const Component: React.FC<Props> = ({
  children,
  className,
  maxWidth = 'sm',
  ...props
}) => {
  const stopPropagation = (event: BaseSyntheticEvent<{}>) => {
    event.stopPropagation();
  };

  return (
    <Dialog
      fullWidth
      maxWidth={maxWidth}
      // ダイアログ外をクリックするとクリックイベントが伝搬してしまうため、ここで防ぐ
      onClick={stopPropagation}
      onMouseDown={stopPropagation}
      // ダイアログ内のフォーカスイベントを外に出さない
      onFocus={stopPropagation}
      // ダイアログ内のキーボードイベントを外に出さない
      onKeyDown={stopPropagation}
      BackdropProps={{
        'aria-label': 'operationDialogBackdrop',
      }}
      PaperProps={{
        className,
        'aria-label': 'operationDialog',
      }}
      {...props}
    >
      {children}
    </Dialog>
  );
};

export const OperationDialog = styled(Component)<{ isMobile: boolean }>`
  ${props =>
    props.isMobile &&
    css`
      width: 100%;
      margin: 10px;
    `}
`;
