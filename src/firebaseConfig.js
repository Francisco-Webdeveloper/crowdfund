import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzqvUfMHomx7qBvuyfGgzKnjgQRq9QkbI",
  authDomain: "crowdfund-7dcab.firebaseapp.com",
  projectId: "crowdfund-7dcab",
  storageBucket: "crowdfund-7dcab.appspot.com",
  messagingSenderId: "1026301467656",
  appId: "1:1026301467656:web:c75ba2d3fd550ad55405bd",
  measurementId: "G-LZ7M1903G3",
};

// init firebase app
const app = initializeApp(firebaseConfig);

// init services
export const database = getFirestore(app);
