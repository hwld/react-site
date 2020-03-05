import React from 'react';
import { Toolbar } from '@material-ui/core';
import NoteList from 'components/NoteList';
import { Note } from 'components/NoteListItem';
import styled from 'styled-components';

const notes: Note[] = [
  {
    id: '1',
    genreId: '1',
    title: '普通のタイトル',
    text:
      '普通のメモです.\nCSSが難しいです.\nHTMLも難しいです.\nJavaScriptも難しいです.\nタイトル、本文、メタデータの区別がつきにくいので色々いじります.',
    authorName: '普通の著者',
    bookName: '普通の著書',
  },
  {
    id: '2',
    genreId: '1',
    title: 'title1-2',
    text:
      'text-2text1t1-2text1-1textt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2t1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2t-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1txt1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1text1-1text1-1text1-1text1-1text1-1text1-1text1-1text1-1text1-1',
    authorName: 'autho1-2',
    bookName: 'book1-2',
  },
  {
    id: '3',
    genreId: '4',
    title: 'title4-1',
    text: 'text4-1',
    authorName: 'autho4-1',
    bookName: 'book4-1',
  },
];

interface NotesViewProps {
  selectedGenreId: string;
}

const View = styled.div`
  height: 100%;
  flex: 5;
  word-wrap: normal;
  overflow: auto;
`;

const NotesView: React.FC<NotesViewProps> = ({ selectedGenreId }) => {
  return (
    <View>
      <Toolbar />
      <NoteList notes={notes} selectedGenreId={selectedGenreId} />
    </View>
  );
};

export default NotesView;
