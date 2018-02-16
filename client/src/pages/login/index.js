// npm packages
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

// our packages
import {loginAction} from '../../store/actions';

// styles
import '../../css/signin.css';

const mapStateToProps = state => ({
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  onLoginClick: params => dispatch(loginAction(params)),
  navToHome: () => dispatch(push('/')),
});


const Login = ({onLoginClick, navToHome, token}) => {
  let usernameInput;
  let passwordInput;
  let rememberInput;

  const handleClick = (e) => {
    e.preventDefault();

    onLoginClick({
      login: usernameInput.value,
      password: passwordInput.value,
      remember: rememberInput.checked,
    });
  };

  if (token) {
    // TODO: figure out a better way to do nav
    setImmediate(() => navToHome());
  }
  
  return (
    <form className="form-signin">
      <h1 className="h1 mb-1 font-weight-normal">Experts portal</h1>
      <p className="h3 mb-3 font-weight-normal">Please sign in</p>

      <label htmlFor="inputUsername" className="sr-only">Email address</label>
      <input
        type="text"
        id="inputUsername"
        className="form-control"
        placeholder="Username"
        ref={(i) => { usernameInput = i; }}
        required
      />
      <label htmlFor="inputPassword" className="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        className="form-control"
        placeholder="Password"
        ref={(i) => { passwordInput = i; }}
        required
      />
      <div className="checkbox mb-3">
        <label htmlFor="inputRemember">
          <input
            type="checkbox"
            id="inputRemember"
            ref={(i) => { rememberInput = i; }}
          /> Remember me
        </label>
      </div>
      <button
        className="btn btn-lg btn-primary btn-block"
        type="submit"
        onClick={handleClick}
      >Login
      </button>
      <p className="h5 font-weight-normal">Not registered? <Link to="/register">Click here.</Link></p>
      <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
    </form>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
