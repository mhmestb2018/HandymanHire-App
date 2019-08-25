const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
// functions that run on firebase cloud
const newActivity = (type, job, id) => {
  return {
    type: type,
    date: job.date,
    orderedBy: job.orderedBy,
    title: job.title,
    photoURL: job.orderedByPhotoURL,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    orderedByUid: job.orderedByUid,
    jobId: id
  };
};
exports.createActivity = functions.firestore
  .document("workOrders/{jobId}")
  .onCreate(job => {
    let newJob = job.data();
    const activity = newActivity("newJob", newJob, job.id);
    return admin
      .firestore()
      .collection("activity")
      .add(activity)
      .then(docRef => {
        return console.log("Activity created with ID:", docRef.id);
      })
      .catch(err => {
        return console.log("error adding activity", err);
      });
  });

exports.cancelActivity = functions.firestore
  .document("workOrders/{jobId}")
  .onUpdate((event, context) => {
    let updatedJob = event.after.data();
    let previousJobData = event.before.data();
    if (
      !updatedJob.cancelled ||
      updatedJob.cancelled === previousJobData.cancelled
    )
      return false;
    const activity = newActivity(
      "cancelledJob",
      updatedJob,
      context.params.jobId
    );
    return admin
      .firestore()
      .collection("activity")
      .add(activity)
      .then(docRef => {
        return console.log("Activity created with ID:", docRef.id);
      })
      .catch(err => {
        return console.log("error adding activity", err);
      });
  });

exports.followMember = functions.firestore
  .document("users/{followerUid}/following/{followingUid}")
  .onCreate((job, context) => {
    const followerUid = context.params.followerUid;
    const followingUid = context.params.followingUid;

    const followerDoc = admin
      .firestore()
      .collection("users")
      .doc(followerUid);

    return followerDoc.get().then(doc => {
      let userData = doc.data();
      const { displayName, city, photoURL } = userData;
      const follower = {
        displayName,
        photoURL: photoURL || "/assets/user.png",
        city: city || "Unknown city"
      };

      return admin
        .firestore()
        .collection("users")
        .doc(followingUid)
        .collection("followers")
        .doc(followerUid)
        .set(follower);
    });
  });

exports.unfollowMember = functions.firestore
  .document("users/{followerUid}/following/{followingUid}")
  .onDelete((event, context) =>
    admin
      .firestore()
      .collection("users")
      .doc(context.params.followingUid)
      .collection("following")
      .doc(context.params.followerUid)
      .delete()
      .then(() => console.log("doc deleted"))
      .catch(err => console.log(err))
  );
