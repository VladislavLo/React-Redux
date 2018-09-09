import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import { TodoList } from './TodoList';
import { getVisibleTodos, getErrorMessage, getIsFetching } from '../reducers';
import FetchError from './FetchError';

class VisibleTodoList extends Component {
  render() {
    const { toggleTodo, todos, errorMessage, isFetching } = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }

    if (errorMessage && !todos.length) {
       return (
       <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()}
       />);
    }
    return (
      <TodoList
       todos = {todos}
       onTodoClick={toggleTodo} 
    />
    );
  }
  componentDidMount() {
    this.fetchData();
  } 
  componentDidUpdate(prevProps) {
   if (this.props.filter !== prevProps.filter) {
     this.fetchData();
   }
 }

  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }
}

VisibleTodoList.propTypes = {
    filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
    todos: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchTodos: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired   
};

const mapStateToProps = (state, { match }) => {
  const filter = match.params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    errorMessage: getErrorMessage(state, filter),
    isFetching: getIsFetching(state, filter),
    filter,
  };
};

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions
)(VisibleTodoList));

export default VisibleTodoList;