import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {helloWorldAction} from '../../store/actions';

const mapStateToProps = state => ({
  world: state.helloWorld.world,
});

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(helloWorldAction()),
});

const Home = ({onClick, world}) => (
  <div className="container">
    <h1>Hello {world}!</h1>
    <button onClick={onClick} className="btn btn-primary btn-lg">Click me!</button>
    <Link to="/other" className="btn btn-link">other</Link>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
