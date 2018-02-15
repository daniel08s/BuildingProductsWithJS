import React from 'react';

import '../../css/signin.css';

export default () => (
  <form className="form-signin">
    <h1 className="h1 mb-1 font-weight-normal">Experts portal</h1>
    <h2 className="h3 mb-3 font-weight-normal">Please sign in</h2>
    <label htmlFor="inputUsername" className="sr-only">Email address</label>
    <input type="email" id="inputUsername" className="form-control" placeholder="Username" required autofocus />
    <label htmlFor="inputPassword" className="sr-only">Password</label>
    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
    <div className="checkbox mb-3">
      <label>
        <input type="checkbox" id="inputRemember" value="remember-me" /> Remember me
      </label>
    </div>
    <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
    <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
  </form>
);
