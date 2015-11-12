//import { normalize } from 'normalizr';
//
//// Extracts the next page URL from Github API response.
//function getNextPageUrl(result) {
//  const link = result.get('next');
//  if (!link) {
//    return null;
//  }
//  //
//  //const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1);
//  //if (!nextLink) {
//  //  return null;
//  //}
//
//  return link;
//}
//
//
//// Fetches an API response and normalizes the result JSON according to schema.
//// This makes every API response have the same shape, regardless of how nested it was.
//export default function normalizrMiddleware() {
//  return ({dispatch, getState}) => {
//    return next => action => {
//      if (typeof action === 'function') {
//        return action(dispatch, getState);
//      }
//
//      // schema is always setup with promise.
//      const { schema, types } = action;
//      if (!schema) {
//        return next(action);
//      }
//      const [REQUEST, SUCCESS, FAILURE] = types;
//
//      return next(action).then(
//        result => {
//          if (!result.result) {
//            return result;
//          }
//
//          const nextPageUrl = getNextPageUrl(result) || undefined;
//
//          return Object.assign({},
//            normalize(result, schema),
//            { nextPageUrl }
//          );
//        }
//      );
//
//    };
//  };
//}

