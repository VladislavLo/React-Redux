import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { throttle } from 'lodash/throttle';

import AddTodo from './AddTodo.jsx';
import VisibleTodoList from './VisibleTodoList.jsx';
import FilterLink from './FilterLink.jsx';
import todoApp from '../store/reducers.js';
import { loadState, saveState } from '../localStorage.js';

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <FilterLink />
  </div>
);

const persistedState = loadState();

const store = createStore(
  todoApp, 
  persistedState
);

store.subscribe(throttle(() => {
  saveState({
    todos: store.getState().todos});
  }, 1000));

export default (
  <Provider store={store}>
    <TodoApp />
  </Provider>
)