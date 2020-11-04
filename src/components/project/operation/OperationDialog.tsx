import React, { BaseSyntheticEvent } from 'react';
import { Dialog, DialogProps } from '@material-ui/core';

type Props = DialogProps & {
  'data-testid'?: string;
};

const Component: React.FC<Props> = ({
  children,
  className,
  'data-testid': dataTestId,
  ...props
}) => {
  const stopPropagation = (event: BaseSyntheticEvent<{}>) => {
    event.stopPropagation();
  };

  return (
    <span data-testid={dataTestId}>
      <Dialog
        {...props}
        fullWidth
        maxWidth="sm"
        // ダイアログ外をクリックするとクリックイベントが伝搬してしまうため、ここで防ぐ
        onClick={stopPropagation}
        // ダイアログ内のフォーカスイベントを外に出さない
        onFocus={stopPropagation}
        // ダイアログ内のキーボードイベントを外に出さない
        onKeyDown={stopPropagation}
        data-testid="dialog"
        PaperProps={{ className }}
      >
        {children}
      </Dialog>
    </span>
  );
};

export const OperationDialog = Component;
