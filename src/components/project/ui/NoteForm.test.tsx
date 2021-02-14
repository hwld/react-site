import { fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { NoteField } from '../../../services/notes';
import { render } from '../../../test-util';
import { NoteForm, NoteFormProps } from './NoteForm';

const renderNoteForm = (onSubmit: NoteFormProps['onSubmit']) => {
  const formId = 'noteForm';
  const utils = render(
    <>
      <NoteForm id={formId} onSubmit={onSubmit} />
      <button type="submit" form={formId}>
        送信
      </button>
    </>,
  );

  return {
    ...utils,
    noteTitleInput: utils.getByRole('textbox', { name: 'タイトル' }),
    noteTextInput: utils.getByRole('textbox', { name: 'メモ' }),
    submitButton: utils.getByRole('button', { name: '送信' }),
  };
};

describe('NoteForm', () => {
  test('入力したフィールドで送信処理が呼び出される', async () => {
    const onSubmit = jest.fn();
    const { noteTitleInput, noteTextInput, submitButton } = renderNoteForm(
      onSubmit,
    );

    const title = 'title';
    const text = 'text';
    fireEvent.input(noteTitleInput, { target: { value: title } });
    fireEvent.input(noteTextInput, { target: { value: text } });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(onSubmit).toBeCalledWith<[NoteField]>({ title, text }),
    );
  });

  test('メモ未入力でエラーが表示される', async () => {
    const onSubmit = jest.fn();
    const { submitButton, findByRole } = renderNoteForm(onSubmit);

    fireEvent.click(submitButton);

    expect(
      (await findByRole('alert', { name: 'メモのエラー' })).textContent,
    ).toBe('メモは必須項目です');
    expect(onSubmit).not.toBeCalled();
  });

  test('タイトルが101文字以上でエラーが表示される', async () => {
    const onSubmit = jest.fn();
    const { noteTitleInput, submitButton, findByRole } = renderNoteForm(
      onSubmit,
    );

    const maxLengthTitle = 'a'.repeat(101);
    fireEvent.input(noteTitleInput, { target: { value: maxLengthTitle } });
    fireEvent.click(submitButton);

    expect(
      (await findByRole('alert', { name: 'タイトルのエラー' })).textContent,
    ).toBe('100文字以内で入力してください');
    expect(onSubmit).not.toBeCalled();
  });

  test('メモが5001文字以上でエラーが表示される', async () => {
    const onSubmit = jest.fn();
    const { noteTextInput, submitButton, findByRole } = renderNoteForm(
      onSubmit,
    );
    const maxLengthText = 'a'.repeat(5001);
    fireEvent.input(noteTextInput, { target: { value: maxLengthText } });
    fireEvent.click(submitButton);

    expect(
      (await findByRole('alert', { name: 'メモのエラー' })).textContent,
    ).toBe('5000文字以内で入力してください');
    expect(onSubmit).not.toBeCalled();
  });
});
