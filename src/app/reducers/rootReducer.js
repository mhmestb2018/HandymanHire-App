import { reducer as FormReducer } from "redux-form";
import workOrderReducer from "../../features/workOrder/WorkList/workOrderReducer";
import { combineReducers } from "../../../../../../AppData/Local/Microsoft/TypeScript/3.5/node_modules/redux";
import modalReducer from "../../features/modals/modalReducer";
import authReducer from "../../features/auth/authReducer";
import asyncReducer from "../../features/async/asyncReducer";
import {reducer as ToastrReducer} from 'react-redux-toastr'
import { firebaseReducer } from "react-redux-firebase";
import {firestoreReducer} from 'redux-firestore'
const rootReducer = combineReducers({
  firebase:firebaseReducer,
  firestore:firestoreReducer,
  form: FormReducer,
  workOrders: workOrderReducer,
  modals:modalReducer,
  auth:authReducer,
  async:asyncReducer,
  toastr:ToastrReducer
 
});
export default rootReducer;
