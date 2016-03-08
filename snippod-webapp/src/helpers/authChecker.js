//decorator for check login and popup login window when not loggedIn
export function authChecker(target, key, descriptor) {
  const method = descriptor.value;

  descriptor.value = (...args) => {
    if (!this.props.auth) {
      throw new Error('authChecker decorator can only be used with auth props');
    }

    if (!this.props.showLoginDialog) {
      throw new Error('authChecker decorator can only be used with showLoginDialog function props');
    }

    if (!this.props.auth.loggedIn) {
      this.props.showLoginDialog();
      return null;
    }

    return method.call(this, args);
  };

  return descriptor;
}

export function checkAuth(auth, showLoginDialog) {
  if (!auth) {
    throw new Error('checkAuth can only be used with auth');
  }

  if (!showLoginDialog) {
    throw new Error('checkAuth can only be used with showLoginDialog function');
  }

  if (!auth.loggedIn) {
    showLoginDialog();
    return false;
  }
  return true;
}
