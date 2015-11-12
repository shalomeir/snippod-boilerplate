import { Schema, arrayOf } from 'normalizr';

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/gaearon/normalizr

const userSchema = new Schema('users', {
  idAttribute: 'id'
});

const postSchema = new Schema('posts', {
  idAttribute: 'id'
});

postSchema.define({
  author: userSchema
});

const commentSchema = new Schema('comments', {
  idAttribute: 'id'
});

commentSchema.define({
  author: userSchema
});

// Schemas for snippod API responses.
export const Schemas = {
  USER: userSchema,
  USER_ARRAY: arrayOf(userSchema),
  POST: postSchema,
  POST_ARRAY: arrayOf(postSchema),
  COMMENT: postSchema,
  COMMENT_ARRAY: arrayOf(commentSchema)
};
