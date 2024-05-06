import React, { Component, ReactElement } from 'react';
import styled from '@emotion/styled';
import { DragDropContext } from '@hello-pangea/dnd';
import type {
  DragStart,
  DropResult,
  DraggableLocation,
} from '@hello-pangea/dnd';
import initial, {
  addNewTask,
  deleteTasks,
  showTrash,
  showQuestionList,
  restoreTasks,
  compareData,
} from './data';
import Column from './column';
import type { Result as ReorderResult } from './utils';
import { mutliDragAwareReorder, multiSelectTo as multiSelect } from './utils';
import type { Task, Id } from '../types';
import type { Entities } from './types';
import { Button, Radio, RadioChangeEvent } from 'antd';
const Container = styled.div`
  display: flex;
  user-select: none;
`;

type curBoxType = 'quesList' | 'trash';
interface State {
  entities: Entities;
  selectedTaskIds: Id[];
  // sad times
  draggingTaskId: Id | undefined | null;
  curBox: curBoxType;
}

const getTasks = (entities: Entities, columnId: Id): Task[] =>
  entities.columns[columnId].taskIds.map(
    (taskId: Id): Task => entities.tasks[taskId]
  );

export default class TaskApp extends Component<unknown, State> {
  state: State = {
    entities: initial,
    selectedTaskIds: [],
    draggingTaskId: null,
    curBox: 'quesList',
  };

  DelSelectedTask() {
    if (this.state.selectedTaskIds.length === 0) return;
  }

  AddQuestionImage = (imageBlob: Blob) => {
    const old: State = { ...this.state };
    addNewTask(old.entities, imageBlob);
    this.setState(old);
  };
  componentDidMount(): void {
    window.addEventListener('click', this.onWindowClick);
    window.addEventListener('keydown', this.onWindowKeyDown);
    window.addEventListener('touchend', this.onWindowTouchEnd);
    window.addEventListener('paste', this.handlePaste);
    console.log('componentDidMount');
    // console.log(this.state.entities.columns['todo'].taskIds);
    // let newobj = JSON.parse(localStorage.getItem('draglist'));
    // console.log(newobj);
    // if (newobj) {
    //   const old = { ...this.state };
    //   old.entities.columns['todo'].taskIds = newobj;
    //   this.setState(old);
    // }
  }

  componentWillUnmount(): void {
    window.removeEventListener('click', this.onWindowClick);
    window.removeEventListener('keydown', this.onWindowKeyDown);
    window.removeEventListener('touchend', this.onWindowTouchEnd);
    window.removeEventListener('paste', this.handlePaste);
    console.log('componentWillUnmount');
    // console.log(this.state.entities.columns['todo'].taskIds);
    // localStorage.setItem(
    //   'draglist',
    //   JSON.stringify(this.state.entities.columns['todo'].taskIds)
    // );
  }

  onDragStart = (start: DragStart): void => {
    const id: string = start.draggableId;
    const selected: Id | undefined | null = this.state.selectedTaskIds.find(
      (taskId: Id): boolean => taskId === id
    );

    // if dragging an item that is not selected - unselect all items
    if (!selected) {
      this.unselectAll();
    }
    this.setState({
      draggingTaskId: start.draggableId,
    });
  };

  onDragEnd = (result: DropResult): void => {
    const destination: DraggableLocation | undefined | null =
      result.destination;
    const source: DraggableLocation = result.source;

    // nothing to do
    if (!destination || result.reason === 'CANCEL') {
      this.setState({
        draggingTaskId: null,
      });
      return;
    }

    const processed: ReorderResult = mutliDragAwareReorder({
      entities: this.state.entities,
      selectedTaskIds: this.state.selectedTaskIds,
      source,
      destination,
    });

    this.setState({
      ...processed,
      draggingTaskId: null,
    });
  };

  onWindowKeyDown = (event: KeyboardEvent): void => {
    if (event.defaultPrevented) {
      return;
    }

    if (event.key === 'Escape') {
      this.unselectAll();
    }
  };

  onWindowClick = (event: MouseEvent): void => {
    if (event.defaultPrevented) {
      return;
    }
    console.log('clicked');
    this.unselectAll();
  };

  onWindowTouchEnd = (event: TouchEvent): void => {
    if (event.defaultPrevented) {
      return;
    }
    this.unselectAll();
  };

  toggleSelection = (taskId: Id): void => {
    const selectedTaskIds: Id[] = this.state.selectedTaskIds;
    const wasSelected: boolean = selectedTaskIds.includes(taskId);

    const newTaskIds: Id[] = (() => {
      // Task was not previously selected
      // now will be the only selected item
      if (!wasSelected) {
        return [taskId];
      }

      // Task was part of a selected group
      // will now become the only selected item
      if (selectedTaskIds.length > 1) {
        return [taskId];
      }

      // task was previously selected but not in a group
      // we will now clear the selection
      return [];
    })();

    this.setState({
      selectedTaskIds: newTaskIds,
    });
  };

  toggleSelectionInGroup = (taskId: Id): void => {
    const selectedTaskIds: Id[] = this.state.selectedTaskIds;
    const index: number = selectedTaskIds.indexOf(taskId);

    // if not selected - add it to the selected items
    if (index === -1) {
      this.setState({
        selectedTaskIds: [...selectedTaskIds, taskId],
      });
      return;
    }

    // it was previously selected and now needs to be removed from the group
    const shallow: Id[] = [...selectedTaskIds];
    shallow.splice(index, 1);
    this.setState({
      selectedTaskIds: shallow,
    });
  };

  // This behaviour matches the MacOSX finder selection
  multiSelectTo = (newTaskId: Id): void => {
    const updated: Id[] | undefined | null = multiSelect(
      this.state.entities,
      this.state.selectedTaskIds,
      newTaskId
    );

    if (updated == null) {
      return;
    }

    this.setState({
      selectedTaskIds: updated,
    });
  };

  unselectAll = (): void => {
    this.setState({
      selectedTaskIds: [],
    });
  };

  handlePaste = async (event: any) => {
    if (this.state.selectedTaskIds.length > 0) {
      console.log(this.state.selectedTaskIds);
      return;
    }

    console.log('task app paste is called');
    try {
      if (!navigator.clipboard) {
        console.error('Clipboard API not available');
        return;
      }

      const clipboardItems = await navigator.clipboard.read();
      for (const clipboardItem of clipboardItems) {
        const imageTypes = clipboardItem.types.find((type) =>
          type.startsWith('image/')
        );

        if (imageTypes) {
          const blob = await clipboardItem.getType(imageTypes);

          this.AddQuestionImage(blob);

          break; // Assuming we need the first image
        }
      }
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };
  handleDelClick = (event: any) => {
    // console.log(this.state);
    if (this.state.selectedTaskIds && this.state.curBox === 'quesList') {
      const old: State = { ...this.state };
      deleteTasks(old.entities, old.selectedTaskIds);
      this.setState(old);
    }
  };

  handleListChange = (e: RadioChangeEvent) => {
    const old: State = { ...this.state };
    console.log(e.target.value);
    if (e.target.value === 'quesList') {
      showQuestionList(old.entities);
      old.curBox = 'quesList';
    } else {
      showTrash(old.entities);
      old.curBox = 'trash';
    }
    this.setState(old);
  };
  handleRestoreClick = (event: any) => {
    compareData(this.state.entities);
  };

  render(): ReactElement {
    const entities: Entities = this.state.entities;
    const selected: Id[] = this.state.selectedTaskIds;
    return (
      <div>
        <Radio.Group
          defaultValue="quesList"
          buttonStyle="solid"
          onChange={this.handleListChange}
        >
          <Radio.Button value="quesList">题目列表</Radio.Button>
          <Radio.Button value="trash">垃圾箱</Radio.Button>
        </Radio.Group>
        <Button onClick={this.handleDelClick}>删除</Button>
        <Button onClick={this.handleRestoreClick}>还原</Button>
        <DragDropContext
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
        >
          <Container>
            {entities.columnOrder.map((columnId: Id) => (
              <Column
                column={entities.columns[columnId]}
                tasks={getTasks(entities, columnId)}
                selectedTaskIds={selected}
                key={columnId}
                draggingTaskId={this.state.draggingTaskId}
                toggleSelection={this.toggleSelection}
                toggleSelectionInGroup={this.toggleSelectionInGroup}
                multiSelectTo={this.multiSelectTo}
              />
            ))}
          </Container>
        </DragDropContext>
      </div>
    );
  }
}
