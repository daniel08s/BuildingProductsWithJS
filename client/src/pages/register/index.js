// npm packages
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

// our packages
import {registerAction} from '../../store/actions';

// styles
import '../../css/signin.css';

const mapStateToProps = state => ({
  redirectToLogin: state.auth.redirectToLogin,
});

const mapDispatchToProps = dispatch => ({
  onRegisterClick: params => dispatch(registerAction(params)),
  navToLogin: () => dispatch(push('/login')),
});

const Register = ({onRegisterClick, navToLogin, redirectToLogin}) => {
  let usernameInput;
  let passwordInput;
  let passwordRepeatInput;

  const handleClick = (e) => {
    e.preventDefault();

    onRegisterClick({
      login: usernameInput.value,
      password: passwordInput.value,
      passwordRepeat: passwordRepeatInput.value,
    });
  };

  if (redirectToLogin) {
    // TODO: figure out a better way to do nav
    setImmediate(() => navToLogin());
  }

  return (
    <form className="form-signin">
      <h1 className="h1 mb-3 font-weight-normal">Experts portal</h1>
      <p className="h4 mb-3 font-weight-normal">Please fill the form to register</p>

      <label htmlFor="inputUsername" className="sr-only" />
      <input
        type="text"
        id="inputUsername"
        className="form-control"
        placeholder="Username"
        ref={(i) => { usernameInput = i; }}
        required
      />
      <label htmlFor="inputPassword" className="sr-only" />
      <input
        type="password"
        id="inputPassword"
        className="form-control"
        placeholder="Password"
        ref={(i) => { passwordInput = i; }}
        required
      />
      <label htmlFor="inputPasswordRepeat" className="sr-only" />
      <input
        type="password"
        id="inputPasswordRepeat"
        className="form-control"
        placeholder="Password Confirmation"
        ref={(i) => { passwordRepeatInput = i; }}
        required
      />
      <p />
      <button
        className="btn btn-lg btn-primary btn-block"
        type="submit"
        onClick={handleClick}
      >Register
      </button>
      <p className="h5 font-weight-normal">Already registered? <Link to="/login">Login here.</Link></p>
      <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
    </form>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
