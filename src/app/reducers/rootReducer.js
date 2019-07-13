import { reducer as FormReducer } from "redux-form";
import testReducer from "../../features/testarea/testReducer";
import workOrderReducer from "../../features/workOrder/WorkList/workOrderReducer";
import { combineReducers } from "../../../../../../AppData/Local/Microsoft/TypeScript/3.5/node_modules/redux";
import modalReducer from "../../features/modals/modalReducer";
import authReducer from "../../features/auth/authReducer";
import asyncReducer from "../../features/async/asyncReducer";
const rootReducer = combineReducers({
  form: FormReducer,
  test: testReducer,
  jobs: workOrderReducer,
  modals:modalReducer,
  auth:authReducer,
  async:asyncReducer
 
});
export default rootReducer;
