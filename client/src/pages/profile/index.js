// npm packages
import React from 'react';
import {connect} from 'react-redux';

// our packages
import {getUser} from '../../store/actions';
// import User from '../../components/user';
import Navbar from '../../components/navbar';

const mapStateToProps = state => ({
  user: state.auth.user,
  loadedUser: state.users.user,
});

const mapDispatchToProps = dispatch => ({
  getUser: payload => dispatch(getUser(payload)),
});

class User extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  componentWillMount() {
    this.props.getUser(this.props.params);
  }

  render() {
    const {user, loadedUser, params, getUser} = this.props;

    return (
      <div>
        <Navbar user={user} current={`/profile/${params.id}`} />

        {loadedUser ? (
          <div className="container">
            <ul>
              <li>
                Profile: {loadedUser.login}
              </li>
              <li>
                Id: {loadedUser.id}
              </li>
              <li>
                Registration Date: {loadedUser.registrationDate}
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
