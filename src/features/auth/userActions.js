import { toastr } from "react-redux-toastr";
import cuid from "cuid";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../async/asyncActions";
import firebase from "../../app/config/firebase";
import { FETCH_JOBS } from "../workOrder/WorkList/WorkOrderConstants";
export const updateProfile = user => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const { isLoaded, isEmpty, ...updatedUser } = user;
  try {
    await firebase.updateProfile(updatedUser);
    toastr.success("Success", "Profile updated");
  } catch (error) {
    console.log(error);
  }
};

export const uploadProfileImage = (file, fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const imageName = cuid();
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const path = `${user.uid}/user_images`;
  const options = {
    name: imageName
  };
  try {
    dispatch(asyncActionStart());
    //upload file to firabase storage
    let uploadedFile = await firebase.uploadFile(path, file, null, options);
    //get url of image
    let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
    //get userdoc
    let userDoc = await firestore.get(`users/${user.uid}`);
    //if user has photo check,if not update profile
    // did not work with if statment, did not upload photos to firebase
    // if (!userDoc.data().photoURL) {
    await firebase.updateProfile({
      photoURL: downloadURL
    });
    await user.updateProfile({
      photoURL: downloadURL
    });
    //add image to firestore
    await firestore.add(
      {
        collection: "users",
        doc: user.uid,
        subcollections: [{ collection: "photos" }]
      },
      {
        name: imageName,
        url: downloadURL
      }
    );
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const deletePhoto = photo => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  try {
    await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
    await firestore.delete({
      collection: "users",
      doc: user.uid,
      subcollections: [{ collection: "photos", doc: photo.id }]
    });
  } catch (error) {
    console.log(error);
    throw new Error("Problem deleting the photo");
  }
};
// dealing with duplicate photo data
export const setMainPhoto = photo => async (dispatch, getState) => {
  const firestore = firebase.firestore();
  const user = firebase.auth().currentUser;
  const today = new Date();
  let userDocRef = firestore.collection("users").doc(user.uid);
  let jobInterestedRef = firestore.collection("job_interested");
  try {
    dispatch(asyncActionStart());
    let batch = firestore.batch();
    batch.update(userDocRef, {
      photoURL: photo.url
    });
    let jobQuery = await jobInterestedRef
      .where("userUid", "==", user.uid)
      .where("jobDate", ">=", today);
    let jobQuerySnap = await jobQuery.get();
    for (let i = 0; i < jobQuerySnap.docs.length; i++) {
      let jobDocRef = await firestore
        .collection("workOrders")
        .doc(jobQuerySnap.docs[i].data().jobId);
      let job = await jobDocRef.get();
      console.log(job);
      if (job.data().orderedByUid === user.uid) {
        batch.update(jobDocRef, {
          orderedByPhotoURL: photo.url,
          [`InterestedInJobs.${user.uid}.photoURL`]: photo.url
        });
      } else {
        batch.update(jobDocRef, {
          [`InterestedInJobs.${user.uid}.photoURL`]: photo.url
        });
      }
    }
    console.log(batch);
    await batch.commit();
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError);
    throw new Error("Problem setting main photo");
  }
};
//if any changes in workOrders transacion rerun to track them

export const jobProposal = job => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  const profile = getState().firebase.profile;
  const interested = {
    interested: true,
    joinDate: firestore.FieldValue.serverTimestamp(),
    photoURL: profile.photoURL || "/assets/user.png",
    displayName: profile.displayName,
    handyman: true
  };
  try {
    await firestore.update(`workOrders/${job.id}`, {
      [`InterestedInJobs.${user.uid}`]: interested
    });
    await firestore.set(`job_interested/${job.id}_${user.uid}`, {
      jobId: job.id,
      userUid: user.uid,
      jobDate: job.date,
      handyman: true
    });
    toastr.success("You are interested in that job enquiry");
  } catch (error) {
    console.log(error);
    toastr.error("Problem with signin up ");
  }
};
export const cancelJobProposal = job => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  try {
    await firestore.update(`workOrders/${job.id}`, {
      //bug , not reflecting change of value in the user interface redux-firestore (no bug in 0.3.2)
      [`InterestedInJobs.${user.uid}`]: firestore.FieldValue.delete()
    });
    await firestore.delete(`job_interested/${job.id}_${user.uid}`);
    toastr.success("You have removed yourself from interested in enquiry");
  } catch (error) {
    console.log(error);
    toastr.error("Something went wrong");
  }
};

export const getUserWorkOrders = (userUid, activeTab) => async (
  dispatch,
  getState
) => {
  dispatch(asyncActionStart());
  const firestore = firebase.firestore();
  const today = new Date(Date.now());
  let workOrdersRef = firestore.collection("job_interested");
  let query;
  switch (activeTab) {
    case 1: //past orders
      query = workOrdersRef
        .where("userUid", "==", userUid)
        .where("jobDate", "<=", today)
        .orderBy("jobDate", "desc");
      break;
    case 2: //future orders
      query = workOrdersRef
        .where("userUid", "==", userUid)
        .where("jobDate", ">=", today)
        .orderBy("jobDate");
      break;
    case 3: //my work orders
      query = workOrdersRef
        .where("userUid", "==", userUid)
        .where("handyman", "==", true)
        .orderBy("jobDate", "desc");
      break;
    default:
      query = workOrdersRef
        .where("userUid", "==", userUid)
        .orderBy("jobDate", "desc");
      break;
  }

  try {
    let querySnap = await query.get();
    let workOrders = [];
    for (let i = 0; i < querySnap.docs.length; i++) {
      let wo = await firestore
        .collection("workOrders")
        .doc(querySnap.docs[i].data().jobId)
        .get();
      workOrders.push({ ...wo.data(), id: wo.id });
    }
    dispatch({ type: FETCH_JOBS, payload: { workOrders } });

    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError);
  }
};

export const followMember = memberToFollow => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const user = firestore.auth().currentUser;

  // get the detail of the person to follow
  const { id, displayName, city, photoURL } = memberToFollow;
  const following = {
    displayName,
    city: city || "Unknown City",
    photoURL: photoURL || "/assets/user.png"
  };

  try {
    // add that person to the "following" collection
    await firestore.set(
      {
        collection: "users",
        doc: user.uid,
        subcollections: [{ collection: "following", doc: id }]
      },
      following
    );
  } catch (error) {
    console.log(error);
    throw new Error("Problem following this member, please try again later");
  }
};

export const unfollowMember = memberToUnfollow => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const user = firestore.auth().currentUser;

  try {
    // remove the person from member's "following" collection
    await firestore.delete({
      collection: "users",
      doc: user.uid,
      subcollections: [{ collection: "following", doc: memberToUnfollow.id }]
    });
  } catch (error) {
    console.log(error);
    throw new Error("Problem unfollowing this member , please try again later");
  }
};
