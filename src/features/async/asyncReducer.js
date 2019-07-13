

const initialState = {
  loading: false
};
const asyncActionStart = state => {
  return {
    ...state,
    loading: true
  };
};
const asyncActionFinish = state => {
  return {
    ...state,
    loading: false
  };
};
const asyncActionError = state => {
  return {
    ...state,
    loading: false
  };
};

export default createReducer (initialState, {
  [ASYNC_ACTION_START]: asyncActionStart,
  [ASYNC_ACTION_FINISH]: asyncActionFinish,
  [ASYNC_ACTION_ERROR]: asyncActionError
});
