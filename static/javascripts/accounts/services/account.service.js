/**
 * Account
 * @namespace thinkster.accounts.services
 */
(function () {
  'use strict';

  angular
    .module('thinkster.accounts.services')
    .factory('Account', Account);

  Account.$inject = ['$http'];

  /**
   * @namespace Account
   */
  function Account($http) {
    /**
     * @name Account
     * @desc The factory to be returned
     * @memberOf thinkster.accounts.services.Account
     */
    var Account = {
      destroy: destroy,
      get: get,
      update: update
    };

    return Account;

    /////////////////////

    /**
     * @name destroy
     * @desc Destroys the account with username `username`
     * @param {string} username The username of the account to be destroyed
     * @returns {Promise}
     * @memberOf thinkster.accounts.services.Account
     */
    function destroy(username) {
      return $http.delete('/api/v1/accounts/' + username + '/');
    }


    /**
     * @name get
     * @desc Gets the account with username `username`
     * @param {string} username The username of the account to get
     * @returns {Promise}
     * @memberOf thinkster.accounts.services.Account
     */
    function get(username) {
      return $http.get('/api/v1/accounts/' + username + '/');
    }


    /**
     * @name update
     * @desc Update the account with username `username`
     * @param {string} username The username of the account to be updated
     * @param {Object} account The updated account model
     * @returns {Promise}
     * @memberOf thinkster.accounts.services.Account
     */
    function update(username, account) {
      return $http.put('/api/v1/accounts/' + username + '/', account);
    }
  }
})();
