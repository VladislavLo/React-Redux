import React from 'react';
import { connect } from 'react-redux';

import { Link } from './Link';
import { setVisibilityFilter } from '../actions';


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

export default FilterLink;