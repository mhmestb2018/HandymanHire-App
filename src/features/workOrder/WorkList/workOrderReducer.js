import {
  CREATE_JOB,
  UPDATE_JOB,
  DELETE_JOB,
  FETCH_JOBS
} from "./WorkOrderConstants";
import { createReducer } from "../../../app/common/utill/reducerUtils";

const initialState = [];

const createJob = (state, payload) => {
  return [...state, payload.job];
};
const updateJob = (state, payload) => {
  return [...state.filter(job => job.id !== payload.job.id), payload.job];
};
//issues with payload.job / before was jobId
const deleteJob = (state, payload) => {
  return [...state.filter(job => job.id !== payload.jobId)];
};
//changed jobs for workOrders
const fetchJobs = (state, payload) => payload.workOrders;

export default createReducer(initialState, {
  [CREATE_JOB]: createJob,
  [UPDATE_JOB]: updateJob,
  [DELETE_JOB]: deleteJob,
  [FETCH_JOBS]: fetchJobs
});
