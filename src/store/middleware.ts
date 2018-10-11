import { applyMiddleware, Middleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export default function configureMiddleware(...middlewares: Middleware[]) {
  return composeWithDevTools(
     applyMiddleware(
      thunk,
      ...middlewares
     )
  );
}
