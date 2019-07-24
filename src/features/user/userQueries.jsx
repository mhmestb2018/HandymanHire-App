// export const userProfileQuery = ({ auth, userUid }) => {
//   if (userUid !== null) {
//     return [
//       {
//         collection: "users",
//         doc: userUid,
//         storeAs: "profile"
//       },
//       {
//         colllection: "users",
//         doc: userUid,
//         subcollections: [{ collection: "photos" }],
//         storeAs: "photos"
//       }
//     ];
//   } else {
//     return [
//       {
//         collection: "users",
//         doc: auth.uid,
//         subcollections: [{ collection: "photos" }],
//         storeAs: "photos"
//       }
//     ];
//   }
// };

export const userProfileQuery = ({ auth, userUid, match }) =>
  userUid !== null
    ? [
        {
          collection: "users",
          doc: userUid,
          storeAs: "profile"
        },
        {
          collection: "users",
          doc: userUid,
          subcollections: [{ collection: "photos" }],
          storeAs: "photos"
        },
        {
          collection: "users",
          doc: auth.uid,
          subcollections: [{ collection: "following", doc: match.params.id }],
          storeAs: "following"
        }
      ]
    : [
        {
          collection: "users",
          doc: auth.uid,
          subcollections: [{ collection: "photos" }],
          storeAs: "photos"
        }
    ]