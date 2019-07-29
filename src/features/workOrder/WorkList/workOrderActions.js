import { toastr } from "react-redux-toastr";
import { createNewJob } from "../../../app/common/utill/helpers";
import firebase from "../../../app/config/firebase";
import { FETCH_JOBS } from "./WorkOrderConstants";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../../async/asyncActions";

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
      toastr.success("Success!", "Your job proposal has been created");
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

export const getWorkOrdersForDashboard = lastWorkOrder => async (
  dispatch,
  getState
) => {
  let today = new Date();
  const firestore = firebase.firestore();
  const workOrdersRef = firestore.collection("workOrders");
  try {
    dispatch(asyncActionStart());
    let startAfter =
      lastWorkOrder &&
      (await firestore
        .collection("workOrders")
        .doc(lastWorkOrder.id)
        .get());
    let query;
    lastWorkOrder
      ? (query = workOrdersRef
          // .where("date", ">=", today)
          .orderBy("date")
          .startAfter(startAfter)
          .limit(3))
      : (query = workOrdersRef
          // .where("date", ">=", today)
          .orderBy("date")
          .limit(3));

    let querySnap = await query.get();
    if (querySnap.docs.length === 0) {
      dispatch(asyncActionFinish());
      return;
    }
    let workOrders = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      let wo = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      workOrders.push(wo);
    }
    dispatch({ type: FETCH_JOBS, payload: { workOrders } });
    dispatch(asyncActionFinish());
    return querySnap;
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const addComment = (jobId, values, parentId) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const profile = getState().firebase.profile;
  const user = firebase.auth().currentUser;
  let newComment = {
    parentId: parentId,
    displayName: profile.displayName,
    photoURL: profile.photoURL || "/assets/user.png",
    uid: user.uid,
    text: values.comment,
    date: Date.now()
  };
  try {
    await firebase.push(`chat_data/${jobId}`, newComment);
  } catch (error) {
    console.log(error);
    toastr.error("Problem adding comment");
  }
};
