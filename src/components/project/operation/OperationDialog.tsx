import React, { BaseSyntheticEvent } from 'react';
import { Dialog, DialogProps } from '@material-ui/core';

type Props = DialogProps & {
  'data-testid'?: string;
};

const Component: React.FC<Props> = ({
  children,
  className,
  'data-testid': dataTestId,
  maxWidth = 'sm',
  ...props
}) => {
  const stopPropagation = (event: BaseSyntheticEvent<{}>) => {
    event.stopPropagation();
  };

  return (
    <span data-testid={dataTestId}>
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
    </span>
  );
};

export const OperationDialog = Component;
