export const silderItems = [
  {
    id: 1,
    img: require("./assets/11.png"),
    title: "SUMMER SALE",
    desc: " DON'T COMPROMISE ON STYLE! GET FALL 30% OFF FOR NEW ARRLVALS.",
    bg: "fcfcfc",
  },
  {
    id: 2,
    img: require("./assets/10.png"),
    title: "SUMMER SALE",
    desc: " DON'T COMPROMISE ON STYLE! GET FALL 30% OFF FOR NEW ARRLVALS.",
    bg: "dedede",
  },
  {
    id: 3,
    img: require("./assets/9.png"),
    title: "SUMMER SALE",
    desc: " DON'T COMPROMISE ON STYLE! GET FALL 30% OFF FOR NEW ARRLVALS.",
    bg: "fff7ff",
  },
];

export const categories = [
  {
    id: 1,
    img: require("./assets/12.jpg"),
    title: "Myrtie",
    cat: "woman",
  },
  {
    id: 2,
    img: require("./assets/13.jpg"),
    title: "Katrina",
    cat: "coat",
  },
  {
    id: 3,
    img: require("./assets/14.jpg"),
    title: "Mraz",
    cat: "jeans",
  },
];

export const products = [
  {
    id: 1,
    img: require("./assets/1.jpg"),
  },
  {
    id: 2,
    img: require("./assets/2.jpg"),
  },
  {
    id: 3,
    img: require("./assets/3.jpg"),
  },
  {
    id: 4,
    img: require("./assets/4.jpg"),
  },
  {
    id: 5,
    img: require("./assets/5.jpg"),
  },
  {
    id: 6,
    img: require("./assets/6.jpg"),
  },
  {
    id: 7,
    img: require("./assets/7.jpg"),
  },
  {
    id: 8,
    img: require("./assets/8.jpg"),
  },
];

// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "../redux/cartRedux";
// import userReducer from "./userRedux";

// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, userReducer);

// export const store = () =>
//   configureStore({
//     reducer: {
//       cart: cartReducer,
//       user: persistedReducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: {
//           ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         },
//       }),
//   });

// export let persistor = persistStore(store);
