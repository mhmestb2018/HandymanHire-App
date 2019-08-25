import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { composeWithDevTools } from "redux-devtools-extension";
import firebase from "../config/firebase";
import rootReducer from "../../app/reducers/rootReducer";

const rrfConfig = {
  userProfile: "users",
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  updateProfileOnLogin: false
};
export const configureStore = () => {
  const middlewares = [
    reduxThunk.withExtraArgument({ getFirebase, getFirestore })
  ];

  const composedEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares),
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
  );
  const store = createStore(rootReducer, composedEnhancer);

  return store;
};
