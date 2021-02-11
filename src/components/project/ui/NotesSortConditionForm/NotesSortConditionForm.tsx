import React, { useState } from 'react';
import { RadioGroup, Typography } from '@material-ui/core';
import { NotesSortOrder } from '../../../../services/notes';
import { TargetFieldRadio } from './TargetFieldRadio';
import { OrderRadio } from './OrderRadio';

const isTargetField = (str: string): str is NotesSortOrder['targetField'] => {
  const createdAt: NotesSortOrder['targetField'] = 'createdAt';
  const updatedAt: NotesSortOrder['targetField'] = 'updatedAt';
  const title: NotesSortOrder['targetField'] = 'title';
  const text: NotesSortOrder['targetField'] = 'text';

  return (
    str === createdAt || str === updatedAt || str === title || str === text
  );
};

const isOrder = (str: string): str is NotesSortOrder['order'] => {
  const asc: NotesSortOrder['order'] = 'asc';
  const desc: NotesSortOrder['order'] = 'desc';

  return str === asc || str === desc;
};

type Props = {
  id: string;
  defaultOrder: NotesSortOrder;
  onSubmit: (order: NotesSortOrder) => void;
};

const Component: React.FC<Props> = ({ id, defaultOrder, onSubmit }) => {
  const [targetField, setTargetField] = useState(defaultOrder.targetField);
  const [order, setOrder] = useState(defaultOrder.order);

  const changeTargetField = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    if (isTargetField(value)) {
      setTargetField(value);
    }
  };

  const changeOrder = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    if (isOrder(value)) {
      setOrder(value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ targetField, order });
  };

  return (
    <form id={id} onSubmit={handleSubmit}>
      <Typography>並び替え対象</Typography>
      <RadioGroup row name="targetField" onChange={changeTargetField}>
        <TargetFieldRadio
          value="createdAt"
          checked={targetField === 'createdAt'}
          label="作成日"
        />
        <TargetFieldRadio
          value="updatedAt"
          checked={targetField === 'updatedAt'}
          label="最終更新日"
        />
        <TargetFieldRadio
          value="title"
          checked={targetField === 'title'}
          label="タイトル"
        />
        <TargetFieldRadio
          value="text"
          checked={targetField === 'text'}
          label="メモ本文"
        />
      </RadioGroup>
      <Typography>並び替え順</Typography>
      <RadioGroup row name="order" onChange={changeOrder}>
        <OrderRadio value="asc" checked={order === 'asc'} label="昇順" />
        <OrderRadio value="desc" checked={order === 'desc'} label="降順" />
      </RadioGroup>
    </form>
  );
};

export const NotesSortConditionForm = Component;
