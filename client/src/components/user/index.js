import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {connect} from 'react-redux';

// our packages
import {updateUser} from '../../store/actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  handleUpdateUser: payload => dispatch(updateUser(payload)),
});

export const User = ({user, edit, handleUpdateUser}) => {
  let userInput;

  const saveUser = () => {
    handleUpdateUser({
      ...user,
      login: userInput.value,
    });
  };

  return user ? (
    <div className="panel panel-default text-left" key={user.id}>
      <div className="panel-heading form-inline">
        User: {edit ? (
          <input
            className="form-control"
            type="text"
            id="loginText"
            defaultValue={user.login}
            ref={(i) => { userInput = i; }}
          />
        ) : user.login}

        {edit && (
          <div className="pull-right">
            <button className="btn btn-default" id="saveBtn" onClick={saveUser}>
              Save
            </button>
          </div>
        )}
      </div>
      <div className="panel-body">
        Registration date: {moment(user.registrationDate).toString()}
      </div>
    </div>
  ) : null;
};

User.defaultProps = {
  user: {},
  edit: false,
  handleUpdateUser: () => {},
};

User.propTypes = {
  user: PropTypes.shape({}),
  edit: PropTypes.bool,
  handleUpdateUser: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
