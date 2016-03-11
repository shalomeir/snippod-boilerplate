const debug = require('utils/getDebugger')('accounts');
import { updateEntity } from 'ducks/globalActions';
import { showDelayedToastMessage } from 'ducks/messages/toastMessage';
import toastMessages from 'i18nDefault/toastMessages';
import Schemas from 'ducks/Schemas';

/********************************
            get account
 ********************************/
const ACCOUNT_REQUEST = 'accounts/accounts/ACCOUNT_REQUEST';
const ACCOUNT_SUCCESS = 'accounts/accounts/ACCOUNT_SUCCESS';
const ACCOUNT_FAILURE = 'accounts/accounts/ACCOUNT_FAILURE';

export const ACCOUNT_ARRAY = [
  ACCOUNT_REQUEST,
  ACCOUNT_SUCCESS,
  ACCOUNT_FAILURE
];

// Fetches a single repository from REST API.
// Relies on the custom API middleware defined in ../middleware/clientMiddleware and helpers/ApiClient.js.
export function fetchAccount(accountId) {
  return {
    types: ACCOUNT_ARRAY,
    promise: (client) => client.get('/accounts/' + accountId + '/', {
      schema: Schemas.ACCOUNT
    })
  };
}

// Fetches a single post from REST API unless it is cached.
// Relies on Redux Thunk middleware.
export function loadAccount(accountId, requiredFields = []) {
  return (dispatch, getState) => {
    const account = getState().entities.accounts[accountId];
    if (account && requiredFields.every(key => account.hasOwnProperty(key))) {
      return null;
    }

    return dispatch(fetchAccount(accountId));
  };
}
