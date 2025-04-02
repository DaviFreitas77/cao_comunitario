import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBl8Qvmt4715Ygzpv-LmJAozIYGMuxnPVw",
  authDomain: "caocomunitario-14068.firebaseapp.com",
  projectId: "caocomunitario-14068",
  storageBucket: "caocomunitario-14068.appspot.com",
  messagingSenderId: "725929270179",
  appId: "1:725929270179:web:cfb949eaf23f8f20aa1816"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);    

export {app,storage}