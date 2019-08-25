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
        isInterested: true,
        joinDate: new Date(),
        photoURL: photoURL || "/assets/user.png",
        displayName: user.displayName
      }
    }
  };
};
// helper to create data tree for chat
export const createDataTree = dataset => {
  let hashTable = Object.create(null);
  dataset.forEach(a => (hashTable[a.id] = { ...a, childNodes: [] }));
  let dataTree = [];
  dataset.forEach(a => {
    if (a.parentId) hashTable[a.parentId].childNodes.push(hashTable[a.id]);
    else dataTree.push(hashTable[a.id]);
  });
  return dataTree;
};
