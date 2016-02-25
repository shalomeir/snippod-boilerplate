import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { routeActions } from 'react-router-redux';
import { redirectReplacePath, replaceLocation } from 'ducks/application/application';


const styles = {
  icon: {
    marginTop: '2.2em',
    marginBottom: '2.2em'
  }
};

@connect(
  createSelector([
    state => state.auth,
    state => state.application
  ], (auth, application) => {
    return { auth, application };
  }),
  { redirectReplacePath, replaceLocation }
)
@Radium
export default class Loading extends Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    application: PropTypes.object.isRequired,
    redirectReplacePath: PropTypes.func.isRequired,
    replaceLocation: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.checkAuth = this.checkAuth.bind(this);
  }

  componentWillMount() {
    this.checkAuth();
  }

  checkAuth() {
    if (!this.props.auth.loggedIn) {
      // oops, not logged in, so can't be here!
      const { location } = this.props;
      let redirectQuery;
      if (location.state && location.state.nextPathname) {
        redirectQuery = { redirect: encodeURIComponent(location.state.nextPathname) };
      }
      this.props.replaceLocation({
        state: location.state,
        pathname: '/login',
        query: Object.assign(location.query, redirectQuery)
      });
    } else {
      this.props.redirectReplacePath('/');
    }
  }

  render() {
    return (
      <div className="loading ui text container center aligned main-container">
        <div className="ui active inline loader" style={styles.icon}></div>
      </div>
    );
  }
}
