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
import { toastr } from "react-redux-toastr";

export const createJob = job => {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_JOB,
        payload: {
          job
        }
      });
      toastr.success("Success!", "Your job proposal enquiry has been created");
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};
export const updateJob = job => {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_JOB,
        payload: {
          job
        }
      });
      toastr.success("Success!", "Job proposal updated");
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
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
