import {
  FormControlLabel,
  FormControlLabelProps,
  Radio,
} from '@material-ui/core';
import React from 'react';
import { NotesSortOrder } from '../../../../services/notes';

type Props = {
  value: NotesSortOrder['targetField'];
} & Omit<FormControlLabelProps, 'control'>;

const Component: React.FC<Props> = ({ value, label, ...other }) => {
  return (
    <FormControlLabel
      value={value}
      control={<Radio color="secondary" />}
      label={label}
      labelPlacement="end"
      {...other}
    />
  );
};

export const TargetFieldRadio = Component;
