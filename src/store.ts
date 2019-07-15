import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

const reducer = combineReducers({});

export type ReduxState = ReturnType<typeof reducer>;

const composeEnhancers = (() => {
  const w = window as any;
  return typeof w === "object" && w.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? w.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
})();

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
