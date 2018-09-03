import v4 from 'node-uuid-v4';

export const addTodo = (text) => ({
    type: 'ADD_TODO',
    id: v4(),
    text
  });

export const toggleTodo = (id) => ({
      type: 'TOGGLE_TODO',
      id
  });