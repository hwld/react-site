import React from 'react';
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
} from '@material-ui/core';
import { NotesSortOrder } from '../../../services/noteStoreService';

type NotesSortConditionFieldProps = {
  notesSortOrder: NotesSortOrder;
  onChangeTargetField: (targetField: NotesSortOrder['targetField']) => void;
  onChangeOrder: (order: NotesSortOrder['order']) => void;
};

const NotesSortConditionField: React.FC<NotesSortConditionFieldProps> = ({
  notesSortOrder,
  onChangeTargetField,
  onChangeOrder,
}) => {
  // 型を保証したくてこう書いた. もっと上手な書き方がありそう.
  const createdAt: NotesSortOrder['targetField'] = 'createdAt';
  const updatedAt: NotesSortOrder['targetField'] = 'updatedAt';
  const title: NotesSortOrder['targetField'] = 'title';
  const text: NotesSortOrder['targetField'] = 'text';
  const isTargetField = (str: string): str is NotesSortOrder['targetField'] => {
    return (
      str === createdAt || str === updatedAt || str === title || str === text
    );
  };

  const asc: NotesSortOrder['order'] = 'asc';
  const desc: NotesSortOrder['order'] = 'desc';
  const isOrder = (str: string): str is NotesSortOrder['order'] => {
    return str === asc || str === desc;
  };
  // ----------------------------------------------------

  const changeTargetField = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    if (isTargetField(value)) {
      onChangeTargetField(value);
    }
  };

  const changeOrder = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    if (isOrder(value)) {
      onChangeOrder(value);
    }
  };

  return (
    <>
      <Typography>並び替え対象</Typography>
      <RadioGroup row name="targetField" onChange={changeTargetField}>
        <FormControlLabel
          value={createdAt}
          checked={notesSortOrder.targetField === createdAt}
          control={<Radio color="secondary" />}
          label="作成日"
          labelPlacement="end"
          data-testid="createdAt"
        />
        <FormControlLabel
          value={updatedAt}
          checked={notesSortOrder.targetField === updatedAt}
          control={<Radio color="secondary" />}
          label="最終更新日"
          labelPlacement="end"
          data-testid="updatedAt"
        />
        <FormControlLabel
          value={title}
          checked={notesSortOrder.targetField === title}
          control={<Radio color="secondary" />}
          label="タイトル"
          labelPlacement="end"
          data-testid="title"
        />
        <FormControlLabel
          value={text}
          checked={notesSortOrder.targetField === text}
          control={<Radio color="secondary" />}
          label="メモ本文"
          labelPlacement="end"
          data-testid="text"
        />
      </RadioGroup>
      <Typography>並び替え順</Typography>
      <RadioGroup row name="order" onChange={changeOrder}>
        <FormControlLabel
          value={asc}
          checked={notesSortOrder.order === asc}
          control={<Radio color="secondary" />}
          label="昇順"
          labelPlacement="end"
          data-testid="asc"
        />
        <FormControlLabel
          value={desc}
          checked={notesSortOrder.order === desc}
          control={<Radio color="secondary" />}
          label="降順"
          labelPlacement="end"
          data-testid="desc"
        />
      </RadioGroup>
    </>
  );
};

export { NotesSortConditionField };
