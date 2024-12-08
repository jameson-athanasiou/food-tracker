// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCv7q20wqi6WwbD9WafBI9csoJFVgk_sl8',
  authDomain: 'food-tracker-c8631.firebaseapp.com',
  projectId: 'food-tracker-c8631',
  storageBucket: 'food-tracker-c8631.firebasestorage.app',
  messagingSenderId: '138633274641',
  appId: '1:138633274641:web:b042d9281186751e3a98b0',
  measurementId: 'G-GJDP4C8JLC',
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
