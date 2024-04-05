import { initializeApp } from "firebase/app";

import {getAuth} from "firebase/auth"
const firebaseConfig = {
   apiKey: "AIzaSyCSgb87AL1Ms84w8e-tN4MoQ-dfKlRot2E",
  authDomain: "whatsapp-vishal.firebaseapp.com",
  projectId: "whatsapp-vishal",
  storageBucket: "whatsapp-vishal.appspot.com",
  messagingSenderId: "24926705426",
  appId: "1:24926705426:web:e7d499ad21dd1f3e9645cb",
  measurementId: "G-3L14HQCCRS"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
