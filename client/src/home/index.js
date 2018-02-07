import React from 'react';
import {Link} from 'react-router-dom';

export default class Home extends React.Component {
  constructor() {
    super();
    
    this.state = {world: 'world'};
  }
  
  render() {
    return (
      <div className="container">
        <h1>Hello {this.state.world}!</h1>
        <Link to="/other" className="btn btn-primary btn-lg">other</Link>
      </div>
    );
  }
};
