import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_meEWONHdVeYYrR7_zlwV23dAPIBTdbQ",
  authDomain: "mern-ecomm-17ad8.firebaseapp.com",
  projectId: "mern-ecomm-17ad8",
  storageBucket: "mern-ecomm-17ad8.appspot.com",
  messagingSenderId: "578954586850",
  appId: "1:578954586850:web:dca8efb7c8ef3d1d688cbb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
