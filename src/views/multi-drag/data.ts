import type { Column, Entities, TaskMap } from './types';
import type { Task, Id } from '../types';

// eslint-disable-next-line no-restricted-syntax
const tasks: Task[] = [];
// Array.from({ length: 20 }, (v, k) => k).map(
//   (val: number): Task => ({
//     id: `task-${val}`,
//     content: `Task ${val}`,
//   })
// );

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
  taskIds: tasks.map((task: Task): Id => task.id),
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
  };
  tasks.push(newTask);
  ents.tasks[newTask.id] = newTask;
  ents.columns[todo.id].taskIds.push(newTask.id);
}

export function deleteTasks();
export default entities;
