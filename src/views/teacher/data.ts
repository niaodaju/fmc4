import { observable, autorun } from 'mobx';
import { Quiz } from '../../global/typedef';

const store = observable({
  list: [] as Quiz[],
});

export default store;
