import { reducer as FormReducer } from "redux-form";
import testReducer from "../../features/testarea/testReducer";
import workOrderReducer from "../../features/workOrder/WorkList/workOrderReducer";
import { combineReducers } from "../../../../../../AppData/Local/Microsoft/TypeScript/3.5/node_modules/redux";
const rootReducer = combineReducers({
  form: FormReducer,
  test: testReducer,
  jobs: workOrderReducer,
 
});
export default rootReducer;
