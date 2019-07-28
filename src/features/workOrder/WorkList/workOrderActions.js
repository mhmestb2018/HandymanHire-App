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
    let query = lastWorkOrder
      ? workOrdersRef
          .where("date", ">=", today)
          .orderBy("date")
          .startAfter(startAfter)
          .limit(2)
      : workOrdersRef
          .where("date", ">=", today)
          .orderBy("date")
          .limit(2);

    let querySnap = await query.get();
    if (querySnap.docs.length === 0) {
      dispatch(asyncActionFinish());
      return querySnap;
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

// export const getWorkOrdersForDashboard = lastJob => async dispatch => {
//   let today = new Date(Date.now())
//   const firestore = firebase.firestore()
//   const eventsRef = firestore.collection("workOrders")

//   try {
//     dispatch(asyncActionStart())
//     let startAfter =
//       lastJob &&
//       (await firestore
//         .collection("workOrders")
//         .doc(lastJob.id)
//         .get())
//     let query = lastJob
//       ? eventsRef
//           .where("date", ">=", today)
//           .orderBy("date")
//           .startAfter(startAfter)
//           .limit(2)
//       : eventsRef
//           .where("date", ">=", today)
//           .orderBy("date")
//           .limit(2)

//     let querySnapshot = await query.get()
//     if (querySnapshot.docs.length === 0) {
//       dispatch(asyncActionFinish())
//       return querySnapshot
//     }

//     let jobs = []

//     for (let doc in querySnapshot.docs) {
//       let job = {
//         ...querySnapshot.docs[doc].data(),
//         id: querySnapshot.docs[doc].id
//       }
//       jobs.push(job)
//     }

//     dispatch({ type: FETCH_JOBS, payload: { jobs } })
//     dispatch(asyncActionFinish())
//     return querySnapshot
//   } catch (error) {
//     console.log(error)
//     dispatch(asyncActionError())
//   }
// }
