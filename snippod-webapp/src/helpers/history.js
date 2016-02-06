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
