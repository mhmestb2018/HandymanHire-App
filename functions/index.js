const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

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
    console.log(newJob);
    const activity = newActivity("newJob", newJob, job.id);
    console.log(activity);

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
