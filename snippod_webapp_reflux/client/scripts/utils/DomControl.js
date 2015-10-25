/**
 * Created by shalomeir on 15. 3. 16..
 */
'use strict';

var DomControl = {

  isChildNodeOf: function(target, parentIds) {
    // returns boolean whether target is child of a list of ids
    // parentIds can be a string or an array of ids
    if (typeof parentIds === 'string') {
      parentIds = [parentIds];
    }
    // if this node is not the one we want, move up the dom tree
    while (target !== null && parentIds.indexOf(target.id) < 0) {
      target = target.parentNode;
    }
    // at this point we have found our containing div or we are out of parent nodes
    return (target !== null && parentIds.indexOf(target.id) >= 0);
  }

};


module.exports = DomControl;
