import { initializeApp } from "firebase/app";

import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDTvs_krWCPp-p5xhs0gzHyNWtaSphMG7I",
  authDomain: "whatsapp-clone-34329.firebaseapp.com",
  projectId: "whatsapp-clone-34329",
  storageBucket: "whatsapp-clone-34329.appspot.com",
  messagingSenderId: "1030647981973",
  appId: "1:1030647981973:web:cfbc1a449fc5549efdb89c",
  measurementId: "G-MXJ4XGQBKJ"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);