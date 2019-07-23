import {  FETCH_JOBS } from "./WorkOrderConstants";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../../async/asyncActions";
import { fetchSampleData } from "../../../app/data/mockApi";
import { toastr } from "react-redux-toastr";
import { createNewJob } from "../../../app/common/utill/helpers";

export const createJob = job => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    const newJob = createNewJob(user, photoURL, job);
    try {
      let createdJob = await firestore.add("workOrders", newJob);
      await firestore.set(`handyman_proposal/${createdJob.id}_${user.uid}`, {
        jobId: createdJob.id,
        userUid: user.uid,
        jobDate: job.date,
        handyman: false
      });
      toastr.success("Success!", "Your job proposal enquiry has been created");
      return createdJob;
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};
export const updateJob = job => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    try {
      await firestore.update(`workOrders/${job.id}`, job);
      toastr.success("Success!", "Job proposal updated");
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};

export const cancelToggle = (cancelled, jobId) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const message = cancelled
    ? "Are you sure you want to stop publishing your enquiry ?"
    : "This will reactivate publishing of your enquiry, Are you sure ?";
  try {
    toastr.confirm(message, {
      onOk: async () =>
        await firestore.update(`workOrders/${jobId}`, {
          cancelled: cancelled
        })
    });
  } catch (error) {
    console.log(error);
  }
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
