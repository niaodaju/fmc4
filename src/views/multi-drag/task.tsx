import React, {
  Component,
  ReactElement,
  MouseEvent,
  TouchEvent,
  KeyboardEvent,
} from 'react';
import styled from '@emotion/styled';
import { colors } from '@atlaskit/theme';
import { Draggable } from '@hello-pangea/dnd';
import type {
  DraggableProvided,
  DraggableStateSnapshot,
} from '@hello-pangea/dnd';
import { grid, borderRadius } from '../constants';
import type { Id, Task as TaskType } from '../types';
import { Rate, Select } from 'antd';
import KnowledgePoints from './knowledgePoint';
import ImgCrop from '../imagecrop/imgCrop';
import { url } from 'inspector';

// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
const primaryButton = 0;

interface Props {
  task: TaskType;
  index: number;
  isSelected: boolean;
  isGhosting: boolean;
  selectionCount: number;
  toggleSelection: (taskId: Id) => void;
  toggleSelectionInGroup: (taskId: Id) => void;
  multiSelectTo: (taskId: Id) => void;
}

interface GetBackgroundColorArgs {
  isSelected: boolean;
  isDragging: boolean;
  isGhosting: boolean;
}

const getBackgroundColor = ({
  isSelected,
  isGhosting,
}: GetBackgroundColorArgs): string => {
  if (isGhosting) {
    return colors.N10;
  }

  if (isSelected) {
    return colors.B50;
  }

  return colors.N10;
};

interface ContainerProps {
  isDragging: boolean;
  isSelected: boolean;
  isGhosting: boolean;
}

const getColor = ({ isSelected, isGhosting }: ContainerProps): string => {
  if (isGhosting) {
    return 'darkgrey';
  }
  if (isSelected) {
    return colors.B200;
  }
  return colors.N900;
};

const Container = styled.div<ContainerProps>`
  background-color: ${(props) => getBackgroundColor(props)};
  color: ${(props) => getColor(props)};
  padding: ${grid}px;
  margin-bottom: ${grid}px;
  border-radius: ${borderRadius}px;
  font-size: 18px;
  border: 3px solid ${colors.N90};
  display: flex;
  ${(props) =>
    props.isDragging ? `box-shadow: 2px 2px 1px ${colors.N90};` : ''}
  ${(props) => (props.isGhosting ? 'opacity: 0.8;' : '')}

  /* needed for SelectionCount */
  position: relative;

  /* avoid default outline which looks lame with the position: absolute; */
  &:focus {
    outline: none;
    border-color: ${colors.G200};
  }
`;
const Handle = styled.div`
  width: 40px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;
const Content = styled.div``;

const size = 30;

const SelectionCount = styled.div`
  right: -${grid}px;
  top: -${grid}px;
  color: ${colors.N0};
  background: ${colors.N200};
  border-radius: 50%;
  height: ${size}px;
  width: ${size}px;
  line-height: ${size}px;
  position: absolute;
  text-align: center;
  font-size: 0.8rem;
`;

const keyCodes = {
  enter: 13,
  escape: 27,
  arrowDown: 40,
  arrowUp: 38,
  tab: 9,
};

export default class Task extends Component<Props> {
  onKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    provided: DraggableProvided,
    snapshot: DraggableStateSnapshot
  ): void => {
    if (event.defaultPrevented) {
      return;
    }

    if (snapshot.isDragging) {
      return;
    }

    if (event.keyCode !== keyCodes.enter) {
      return;
    }

    // we are using the event for selection
    event.preventDefault();

    this.performAction(event);
  };

  // Using onClick as it will be correctly
  // preventing if there was a drag
  onClick = (event: MouseEvent<HTMLDivElement>): void => {
    if (event.defaultPrevented) {
      return;
    }

    if (event.button !== primaryButton) {
      return;
    }

    // marking the event as used
    event.preventDefault();

    this.performAction(event);
  };

  onTouchEnd = (event: TouchEvent<HTMLDivElement>): void => {
    if (event.defaultPrevented) {
      return;
    }

    // marking the event as used
    // we would also need to add some extra logic to prevent the click
    // if this element was an anchor
    event.preventDefault();
    this.props.toggleSelectionInGroup(this.props.task.id);
  };

  // Determines if the platform specific toggle selection in group key was used
  wasToggleInSelectionGroupKeyUsed = (
    event: MouseEvent | KeyboardEvent
  ): boolean => {
    const isUsingWindows = navigator.platform.indexOf('Win') >= 0;
    return isUsingWindows ? event.ctrlKey : event.metaKey;
  };

  // Determines if the multiSelect key was used
  wasMultiSelectKeyUsed = (event: MouseEvent | KeyboardEvent): boolean =>
    event.shiftKey;

  performAction = (event: MouseEvent | KeyboardEvent): void => {
    const { task, toggleSelection, toggleSelectionInGroup, multiSelectTo } =
      this.props;

    if (this.wasToggleInSelectionGroupKeyUsed(event)) {
      toggleSelectionInGroup(task.id);
      return;
    }

    if (this.wasMultiSelectKeyUsed(event)) {
      multiSelectTo(task.id);
      return;
    }

    toggleSelection(task.id);
  };
  handleChangeSubject = (value: string) => {
    console.log(`selected ${value}`);
  };
  handleChangeGrade = (value: string) => {
    console.log(`selected ${value}`);
  };

  handleChangeChapter = (value: string) => {
    console.log(`selected ${value}`);
  };

  render(): ReactElement {
    const task: TaskType = this.props.task;
    const index: number = this.props.index;
    const isSelected: boolean = this.props.isSelected;
    const selectionCount: number = this.props.selectionCount;
    const isGhosting: boolean = this.props.isGhosting;
    return (
      <Draggable draggableId={task.id} index={index}>
        {(
          provided: DraggableProvided,
          snapshot: DraggableStateSnapshot
        ): ReactElement => {
          const shouldShowSelection: boolean =
            snapshot.isDragging && selectionCount > 1;

          return (
            <Container
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              onClick={this.onClick}
              onTouchEnd={this.onTouchEnd}
              onKeyDown={(event: KeyboardEvent<HTMLDivElement>) =>
                this.onKeyDown(event, provided, snapshot)
              }
              isDragging={snapshot.isDragging}
              isSelected={isSelected}
              isGhosting={isGhosting}
            >
              {/* <Handle {...provided.dragHandleProps}></Handle> */}
              <Content>
                {task.content}
                <Select
                  tabIndex="-1"
                  defaultValue="math"
                  style={{ width: 120 }}
                  onChange={(e) => {
                    console.log(e);
                  }}
                  options={[
                    { value: 'math', label: '数学' },
                    { value: 'phy', label: '物理' },
                  ]}
                />
                <Select
                  tabIndex="-1"
                  defaultValue="g7"
                  style={{ width: 120 }}
                  onChange={this.handleChangeGrade}
                  options={[
                    { value: 'g7', label: '七年级' },
                    { value: 'g8', label: '八年级' },
                    { value: 'g9', label: '九年级' },
                  ]}
                />
                <Select
                  tabIndex="-1"
                  defaultValue="ch1"
                  style={{ width: 120 }}
                  onChange={this.handleChangeChapter}
                  options={[
                    {
                      label: <span>manager</span>,
                      title: 'manager',
                      options: [
                        { label: <span>Jack</span>, value: 'Jack' },
                        { label: <span>Lucy</span>, value: 'Lucy' },
                      ],
                    },
                    {
                      label: <span>engineer</span>,
                      title: 'engineer',
                      options: [
                        { label: <span>Chloe</span>, value: 'Chloe' },
                        { label: <span>Lucas</span>, value: 'Lucas' },
                      ],
                    },
                  ]}
                />
                <KnowledgePoints></KnowledgePoints>
                <Rate count={3}></Rate>
                {task.question && (
                  <ImgCrop
                    imgurl={URL.createObjectURL(task.question)}
                  ></ImgCrop>
                )}
                {/* <ImgCrop imgurl={URL.createObjectURL(task.question)}></ImgCrop> */}
              </Content>
              {shouldShowSelection ? (
                <SelectionCount>{selectionCount}</SelectionCount>
              ) : null}
            </Container>
          );
        }}
      </Draggable>
    );
  }
}
