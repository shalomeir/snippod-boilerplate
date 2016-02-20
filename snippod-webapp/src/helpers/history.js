//Deprecation Do not use this helper when you use react-router upper than 2.x. react-router provide history singletons.
//Reference: https://github.com/reactjs/react-router/blob/master/upgrade-guides/v2.0.0.md#changes-to-thiscontext

//Reference: https://github.com/rackt/react-router/blob/latest/docs/guides/advanced/NavigatingOutsideOfComponents.md
import { useQueries } from 'history';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createMemoryHistory from 'history/lib/createMemoryHistory';

let history;

if (__CLIENT__) {
  history = useQueries(createBrowserHistory)();
} else {
  history = useQueries(createMemoryHistory)();
}

export default history;
