import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { render, fireEvent } from '../../../test-util';
import TreeView from './TreeView';
import TreeItem from './TreeItem';

describe('<TreeView>', () => {
  const DragAndDrop = (src: HTMLElement, dst: HTMLElement) => {
    fireEvent.dragStart(src);
    fireEvent.dragEnter(dst);
    fireEvent.drop(dst);
    fireEvent.dragLeave(dst);
    fireEvent.dragEnd(src);
  };

  const createTestTree = (onDrop?: jest.Mock<{}>) => (
    <DndProvider backend={HTML5Backend}>
      <TreeView isDrag onDrop={onDrop}>
        <TreeItem label="parent" nodeId="parent">
          <TreeItem label="child" nodeId="child">
            <TreeItem label="grandChild" nodeId="grandChild" />
          </TreeItem>
        </TreeItem>
      </TreeView>
    </DndProvider>
  );

  test('TreeItemは親以上のTreeItemにdropできる.', () => {
    const onDrop = jest.fn();

    const { getByTestId } = render(createTestTree(onDrop));

    DragAndDrop(
      getByTestId('dragLayer-grandChild'),
      getByTestId('dropLayer-child'),
    );

    DragAndDrop(
      getByTestId('dragLayer-grandChild'),
      getByTestId('dropLayer-parent'),
    );
    expect(onDrop.mock.calls.length).toBe(2);
  });

  test('TreeItemは子以下のTreeItemにdropできない.', () => {
    const onDrop = jest.fn();

    const { getByTestId } = render(createTestTree(onDrop));

    DragAndDrop(
      getByTestId('dragLayer-parent'),
      getByTestId('dropLayer-child'),
    );

    DragAndDrop(
      getByTestId('dragLayer-parent'),
      getByTestId('dropLayer-grandChild'),
    );
    expect(onDrop.mock.calls.length).toBe(0);
  });
});
