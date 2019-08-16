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
      await firestore.set(`job_interested/${createdJob.id}_${user.uid}`, {
        jobId: createdJob.id,
        userUid: user.uid,
        jobDate: job.date,
        handyman: false
      });
      toastr.success("Success!", "Your job proposal has been created");
      return createdJob;
    } catch (error) {
      console.log(error);
      toastr.error("Oops", "Something went wrong ");
    }
  };
};

export const updateJob = job => {
  return async (dispatch, getState) => {
    const firestore = firebase.firestore();
    try {
      dispatch(asyncActionStart());
      let jobDocRef = firestore.collection("workOrders").doc(job.id);
      let dateEqual = getState().firestore.ordered.workOrders[0].date.isEqual(
        job.date
      );
      if (!dateEqual) {
        let batch = firestore.batch();
        batch.update(jobDocRef, job);
        let jobInterestedRef = firestore.collection("job_interested");
        let jobInterestedQuery = await jobInterestedRef.where(
          "jobId",
          "===",
          job.id
        );
        let jobInterestedQuerySnap = await jobInterestedQuery.get();
        for (let i = 0; i < jobInterestedQuerySnap.docs.length; i++) {
          let jobInterestedDocRef = await firestore
            .collection("job_interested")
            .doc(jobInterestedQuerySnap.docs[i].id);
          batch.update(jobInterestedDocRef, {
            jobDate: job.date
          });
        }
        console.log(batch);
        await batch.commit();
      } else {
        await jobDocRef.update(job);
      }
      dispatch(asyncActionFinish());
      toastr.success("Success!", "Job proposal updated");
    } catch (error) {
      dispatch(asyncActionError());
      console.log(error);
      toastr.error("Oops", "Something went wrong with  update");
    }
  };
};

// export const updateJob =job => async (dispatch, getState) => {
//   const firestore = firebase.firestore()
//   if (job.date !== getState().firestore.ordered.events[0].date) {
//     event.date = moment(event.date).toDate()
//   }

//   try {
//     dispatch(asyncActionStart())
//     let eventDocRef = firestore.collection("events").doc(event.id)
//     let dateEqual = compareAsc(
//       getState().firestore.ordered.events[0].date,
//       event.date
//     )
//     if (dateEqual !== 0) {
//       let batch = firestore.batch()
//       await batch.update(eventDocRef, event)

//       let eventAttendeeRef = firestore.collection("event_attendees")
//       let eventAttendeeQuery = await eventAttendeeRef.where(
//         "eventId",
//         "==",
//         event.id
//       )
//       let eventAttendeeQuerySnap = await eventAttendeeQuery.get()

//       for (let doc in eventAttendeeQuerySnap.docs) {
//         let eventAttendeeDocRef = await firestore
//           .collection("event_attendees")
//           .doc(eventAttendeeQuerySnap.docs[doc].id)

//         await batch.update(eventAttendeeDocRef, {
//           eventDate: event.date
//         })
//       }

//       await batch.commit()
//     } else {
//       await eventDocRef.update(event)
//     }

//     dispatch(asyncActionFinish())
//     toastr.success("Success!", "Event has been updated")
//   } catch (err) {
//     console.log(err)
//     dispatch(asyncActionError())
//     toastr.error("Oops!", "Something went wrong")
//   }
// }
export const cancelToggle = (cancelled, jobId) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const message = cancelled
    ? "Are you sure you want to cancel job posting ?"
    : "This will reactivate your job posting, Are you sure ?";
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
  const cat = "painting";
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
    console.log(querySnap);
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
