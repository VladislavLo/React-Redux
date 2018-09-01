import React from 'react';
import { connect } from 'react-redux';

import { Link } from './Link.jsx';
import { setVisibilityFilter } from '../actions/actions.js';


const mapStateProps = (state, ownProps) => ({
    active: ownProps.filter === state.visibilityFilter
  });

const mapDispatchProps = (dispatch, ownProps) => ({
    onClick() {
      dispatch(setVisibilityFilter(ownProps.filter));
    }
});

const FilterLink = connect(
  mapStateProps,
  mapDispatchProps
)(Link);

export default () => (
  <p>
    Show:
    {' '}
    <FilterLink filter='SHOW_ALL'>
      All
    </FilterLink>
    {', '}
    <FilterLink filter='SHOW_ACTIVE'>
      Active
    </FilterLink>
    {', '}
    <FilterLink filter='SHOW_COMPLETED'>
      Completed
    </FilterLink>
  </p>
);