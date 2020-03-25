import React from 'react';
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
} from '@material-ui/core';
import { NoteField } from 'services/storage/notes';

export interface NotesSortOrder {
  targetField: 'date' | keyof NoteField;
  order: 'asc' | 'desc';
}

interface NotesSortConditionFieldProps {
  notesSortOrder: NotesSortOrder;
  onChangeTargetField: (targetField: NotesSortOrder['targetField']) => void;
  onChangeOrder: (order: NotesSortOrder['order']) => void;
}

const NotesSortConditionField: React.FC<NotesSortConditionFieldProps> = ({
  notesSortOrder,
  onChangeTargetField,
  onChangeOrder,
}) => {
  // 型を保証したくてこう書いた. もっと上手な書き方がありそう.
  const date: NotesSortOrder['targetField'] = 'date';
  const title: NotesSortOrder['targetField'] = 'title';
  const text: NotesSortOrder['targetField'] = 'text';
  const authorName: NotesSortOrder['targetField'] = 'authorName';
  const bookName: NotesSortOrder['targetField'] = 'bookName';
  const isTargetField = (str: string): str is NotesSortOrder['targetField'] => {
    return (
      str === date ||
      str === title ||
      str === text ||
      str === authorName ||
      str === bookName
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
          value={date}
          checked={notesSortOrder.targetField === date}
          control={<Radio color="secondary" />}
          label="作成日"
          labelPlacement="end"
        />
        <FormControlLabel
          value={title}
          checked={notesSortOrder.targetField === title}
          control={<Radio color="secondary" />}
          label="タイトル"
          labelPlacement="end"
        />
        <FormControlLabel
          value={text}
          checked={notesSortOrder.targetField === text}
          control={<Radio color="secondary" />}
          label="メモ本文"
          labelPlacement="end"
        />
        <FormControlLabel
          value={authorName}
          checked={notesSortOrder.targetField === authorName}
          control={<Radio color="secondary" />}
          label="著者名"
          labelPlacement="end"
        />
        <FormControlLabel
          value={bookName}
          checked={notesSortOrder.targetField === bookName}
          control={<Radio color="secondary" />}
          label="書籍名"
          labelPlacement="end"
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
        />
        <FormControlLabel
          value={desc}
          checked={notesSortOrder.order === desc}
          control={<Radio color="secondary" />}
          label="降順"
          labelPlacement="end"
        />
      </RadioGroup>
    </>
  );
};

export default NotesSortConditionField;
