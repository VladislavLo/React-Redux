import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';
import expect from 'expect';

const todo = (state, action) => {
     switch (action.type) {
     case 'ADD_TODO':
          return {
             id: action.id,
             text: action.text,
             completed: false   
          };
       case 'TOGGLE_TODO':        
          if (state.id !== action.id) {
              return state;
        }
        return {
            ...state,
            completed: !state.completed
        };
        default: 
          return state;
    }
}

const todos = (state = [], action) => {
    switch (action.type) {
       case 'ADD_TODO':
          return [
              ...state,
              todo(undefined, action)          
       ];
       case 'TOGGLE_TODO':
          return state.map(t => todo(t, action));
       default:
         return state;
    }
};

const visibilityFilter = (
    state = 'SHOW_ALL',
    action
) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
          return action.filter;
        default:
          return state;
    }
}

// combineReducers from scratch
// const combineReducers = (reducers) => {
//   return (state = {}, action) => {
//     return Object.keys(reducers).reduce(
//       (nextState, key) => {
//          nextState[key] = reducers[key](state[key], action);
//          return nextState;
//       }, {}
//     );
//   };
// }

const todoApp = combineReducers({
        todos,
        visibilityFilter
    }
);

const store = createStore(todoApp);

let nextTodoId = 0;
class TodoApp extends Component {
  render() {
    return (
      <div>
        <input ref={node => {
          this.input = node;
        }} />
        <button onClick = {() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: this.input.value,
            id: nextTodoId++
          });
          this.input.value = '';
          }}>Add todo
        </button>
        <ul>{this.props.todos.map(todo => 
          <li key={todo.id} 
          onClick={() => {
            store.dispatch({
            type: 'TOGGLE_TODO',
            id: todo.id
          });
          }} style = {{textDecoration: todo.completed ? 'line-through' : 'none'}}>
          {todo.text}
          </li>
          )}
        </ul>
      </div>
    )
  }
}

const render = () => {
   ReactDOM.render(
   <TodoApp todos={store.getState().todos}/>,
   document.getElementById('app-root')
   );
}

store.subscribe(render);
render();

// console.log('Initial state');
// console.log(store.getState());
// console.log('-----------------');

// console.log('DISPATCHING ADD_TODO');

// store.dispatch({
//   type: 'ADD_TODO',
//   id: 0,
//   text: 'Learn Redux'
// });

// console.log('Current state:');
// console.log(store.getState());
// console.log('-----------------');

// console.log('DISPATCHING TOGGLE_TODO');

// store.dispatch({
//   type: 'TOGGLE_TODO',
//   id: 0
// });

// console.log('Current state:');
// console.log(store.getState());
// console.log('-----------------');

// console.log('DISPATCHING SET_VISIBILITY_FILTER');

// store.dispatch({
//   type: 'SET_VISIBILITY_FILTER',
//   filter: 'SHOW_COMPLETED'
// });

// console.log('Current state:');
// console.log(store.getState());
// console.log('-----------------');


