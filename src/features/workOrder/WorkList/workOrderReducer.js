import { CREATE_JOB, UPDATE_JOB, DELETE_JOB } from "./WorkOrderConstants";
import { createReducer } from "../../../app/common/utill/reducerUtils";

const initialState = [
  {
    id: "1",
    title: "House Painting",
    date: "2020-03-27",
    category: "Home Exterior",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "Sligo, IE",
    address: "Avondale",
    orderedBy: "Tom",
    photoURL: "https://randomuser.me/api/portraits/men/20.jpg",
    proposals: [
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      }
    ]
  },
  {
    id: "2",
    title: "Fix the washing machine",
    date: "2018-03-28",
    category: "Home Interior",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "Castlebar, IE",
    address: "Westport Road",
    orderedBy: "John",
    photoURL: "https://randomuser.me/api/portraits/men/22.jpg",
    proposals: [
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      },
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      }
    ]
  }
];
const createJob = (state, payload) => {
  return [...state, payload.job];
};
const updateJob = (state, payload) => {
  return [...state.filter(job => job.id !== payload.job.id), payload.job];
};
//issues with payload.job / before was jobId
const deleteJob = (state, payload) => {
  return [...state.filter(job => job.id !== payload.job)];
};
export default createReducer(initialState, {
  [CREATE_JOB]: createJob,
  [UPDATE_JOB]: updateJob,
  [DELETE_JOB]: deleteJob
});
