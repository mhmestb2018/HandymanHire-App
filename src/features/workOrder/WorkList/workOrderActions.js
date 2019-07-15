import {
  CREATE_JOB,
  UPDATE_JOB,
  DELETE_JOB,
  FETCH_JOBS
} from "./WorkOrderConstants";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../../async/asyncActions";
import { fetchSampleData } from "../../../app/data/mockApi";

export const createJob = jobId => {
  return {
    type: CREATE_JOB,
    payload: {
      jobId
    }
  };
};
export const updateJob = jobId => {
  return {
    type: UPDATE_JOB,
    payload: {
      jobId
    }
  };
};
export const deleteJob = jobId => {
  return {
    type: DELETE_JOB,
    payload: {
      jobId
    }
  };
};

export const loadJobs = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const jobs = await fetchSampleData();
      dispatch({ type: FETCH_JOBS, payload: { jobs } });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError);
    }
  };
};
