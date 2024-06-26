import type { Column, Entities, TaskMap } from './types';
import type { Task, Id } from '../types';
import { endianness } from 'os';
// var backupQuestList: Id[] = [];
// var deletedTask: Id[] = [];
// eslint-disable-next-line no-restricted-syntax
const tasks: Task[] = [];
const questList: Id[] = [];

const taskMap: TaskMap = tasks.reduce(
  (previous: TaskMap, current: Task): TaskMap => {
    previous[current.id] = current;
    return previous;
  },
  {}
);

const todo: Column = {
  id: 'todo',
  title: '题目列表',
  taskIds: (() => {
    console.log('here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    return tasks.map((task: Task): Id => task.id);
  })(),
  // taskIds: questList,
};

// const done: Column = {
//   id: 'done',
//   title: 'Done',
//   taskIds: [],
// };

const entities: Entities = {
  // columnOrder: [todo.id, done.id],
  columnOrder: [todo.id],
  columns: {
    [todo.id]: todo,
  },
  tasks: taskMap,
};
export function addNewTask(ents: Entities, questiogImgBlob: Blob) {
  const uuid = crypto.randomUUID();
  const newTask: Task = {
    id: `task-${uuid}`,
    content: `Task ${uuid}`,
    question: questiogImgBlob,
    answer: null,
    choicAnswer: false,
    subject: '',
    grade: '',
    chapter: '',
    tips: [],
    difficulty: 0,
    deleted: false,
  };
  tasks.push(newTask);
  // console.log(ents.tasks);
  ents.tasks[newTask.id] = newTask;
  ents.columns[todo.id].taskIds.push(newTask.id);
}

export function deleteTasks(ents: Entities, deletedTaskIds: Id[]) {
  console.log(deletedTaskIds);
  if (deletedTaskIds === undefined || deletedTaskIds === null) return;
  deletedTaskIds.forEach((id: Id) => {
    ents.columns['todo'].taskIds = ents.columns['todo'].taskIds.filter(
      (taskId: Id) => taskId !== id
    );
    ents.tasks[id].deleted = true;
  });
}

export function showTrash(ents: Entities) {
  ents.columns['todo'].taskIds = [];
  tasks.forEach((task: Task) => {
    if (task.deleted) {
      ents.columns['todo'].taskIds.push(task.id);
    }
  });
}

export function showQuestionList(ents: Entities) {
  ents.columns['todo'].taskIds = [];
  tasks.forEach((task: Task) => {
    if (task.deleted === false) {
      ents.columns['todo'].taskIds.push(task.id);
    }
  });
}

export function restoreTasks(ents: Entities, restoreTaskIds: Id[]) {
  restoreTaskIds.forEach((id: Id) => {
    ents.columns['todo'].taskIds.push(id);
  });
}

export function backupCloumTaskIds(taskIDs: Id[]) {
  questList = [...taskIDs];
  console.log('qesttList', questList);
}

export function getInitialData(ents: Entities) {
  ents.columns[todo.id] = questList;
  return ents;
}
export function compareData(ents: Entities) {
  console.log('class', ents.columns.todo.taskIds);
  console.log('data', entities.columns.todo.taskIds);
  console.log('ents === entities', ents === entities);
  console.log(ents.tasks === entities.tasks);
}
export { questList };
export default entities;
