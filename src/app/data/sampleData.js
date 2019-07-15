const sampleData = [
  {
    id: "1",
    title: "House Painting",
    date: "2020-03-27",
    category: "Painting",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "Sligo, IE",
    address: "Avondale",
    addressLatLng: {
      lat: 51.5118074,
      lng: -0.12300089999996544
    },

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
    category: "Household Appliance",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "Castlebar, IE",
    address: "Westport Road",
    addressLatLng: {
      lat: 40.7484405,
      lng: -73.98566440000002
    },
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
export default sampleData;
