export const objectToArray = object => {
  if (object) {
    return Object.entries(object).map(j =>
      Object.assign({}, j[1], { id: j[0] })
    );
  }
};
export const createNewJob = (user, photoURL, job) => {
  return {
    ...job,
    orderedByUid: user.uid,
    orderedBy: user.displayName,
    orderedByPhotoURL: photoURL || "/assets/user.png",
    created: new Date(),
    InterestedInJobs: {
      [user.uid]: {
        // offerDescription: user.offerDescription,
        joinDate: new Date(),
        photoURL: photoURL || "/assets/user.png",
        displayName: user.displayName
      }
    }
  };
};
