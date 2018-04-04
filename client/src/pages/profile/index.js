// npm packages
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

// our packages
import {getUser} from '../../store/actions';
import User from '../../components/user';
import Navbar from '../../components/navbar';

const mapStateToProps = state => ({
  user: state.auth.user,
  loadedUser: state.users.user,
});

const mapDispatchToProps = dispatch => ({
  getUser: payload => dispatch(getUser(payload)),
});

export class Profile extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  componentWillMount() {
    this.props.getUser(this.props.params);
  }

  render() {
    const {
      user,
      loadedUser,
      params,
    } = this.props;
    const allowEdit = user && loadedUser && user.id === loadedUser.id;

    return (
      <div className="container">
        <Navbar user={user} current={`/profile/${params.id}`} />

        <User user={loadedUser} edit={allowEdit} />
      </div>
    );
  }
}

Profile.defaultProps = {
  loadedUser: {},
  params: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }),
};

Profile.propTypes = {
  user: PropTypes.shape({}).isRequired,
  loadedUser: PropTypes.shape({}),
  getUser: PropTypes.func.isRequired,
  params: PropTypes.shape({}),
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
