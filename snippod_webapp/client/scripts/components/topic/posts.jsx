'use strict';

var React = require('react'),
    Reflux = require('reflux'),
    //components
    Post = require('./post/post.jsx'),
    Spinner = require('../modules/Spinner.jsx'),
    //store
    postsStore = require('../../stores/postsStore'),
    //actions
    postActions = require('../../actions/postActions');


var Posts = React.createClass({

  mixins: [
    Reflux.listenTo(postsStore, 'onStoreUpdate'),
    Reflux.listenTo(postActions.updateSortBy, 'updateSortBy')
  ],

  getInitialState: function() {
    var postsData = postsStore.getDefaultData();
    return {
      loading: true,
      posts: postsData.posts,
      sortOptions: postsData.sortOptions,
      nextPage: postsData.nextPage,
      currentPage: postsData.currentPage
    };
  },

  onStoreUpdate: function(postsData) {
    if (!postsData.posts.length) {
      // if no posts are returned
      this.transitionTo('app');
    }
    this.setState({
      loading: false,
      posts: postsData.posts,
      sortOptions: postsData.sortOptions,
      nextPage: postsData.nextPage,
      currentPage: postsData.currentPage
    });
  },

  updateSortBy: function(e) {
    e.preventDefault();

    var currentPage = this.state.currentPage || 1;

    postActions.setSortBy(this.refs.sortBy.getDOMNode().value);

    this.setState({
      loading: true
    });

    if (currentPage === 1) {
      postActions.stopListeningToPosts();
      postActions.listenToPosts(currentPage);
    } else {
      this.transitionTo('posts', { pageNum: 1 });
    }
  },

  render: function() {
    var posts = this.state.posts;
    var currentPage = this.state.currentPage || 1;
    var sortOptions = this.state.sortOptions;
    // possible sort values (defined in postsStore)
    var sortValues = Object.keys(sortOptions.values);
    var user = this.props.user;

    posts = posts.map(function(post) {
      /* jshint ignore:start */
      return <Post post={ post } user={ user } key={ post.id } />;
      /* jshint ignore:end */
    });

    var options = sortValues.map(function(optionText, i) {
      /* jshint ignore:start */
      return <option value={ sortOptions[i] } key={ i }>{ optionText }</option>;
      /* jshint ignore:end */
    });

    return (
      /* jshint ignore:start */
      <div className="content full-width">
        <label htmlFor="sortby-select" className="sortby-label">Sort by </label>
        <div className="sortby">
          <select
            id="sortby-select"
            className="sortby-select"
            onChange={ this.updateSortBy }
            value={ sortOptions.currentValue }
            ref="sortBy"
          >
            { options }
          </select>
        </div>
        <hr />
        <div className="posts">
          { this.state.loading ? <Spinner /> : posts }
        </div>
        <hr />
        <nav className="pagination">
          {
            this.state.nextPage ? (
              <span to="posts" params={{ pageNum: currentPage + 1 }} className="next-page">
                Load More Posts
              </span>
            ) : 'No More Posts'
          }
        </nav>
      </div>
      /* jshint ignore:end */

    );
  }

});

module.exports = Posts;
