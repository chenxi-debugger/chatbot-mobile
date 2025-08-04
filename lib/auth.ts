// lib/auth.ts
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signOut,
  User,
} from 'firebase/auth';

import { auth } from './firebase';

// Register user with email and password
export function registerWithEmail(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Login with email and password
export function loginWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Logout current user
export function logout() {
  return signOut(auth);
}

// Observe auth state change
export function observeAuthState(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// Setup reCAPTCHA for phone auth (only for web)
export function setupRecaptcha(containerId: string) {
  return new RecaptchaVerifier(containerId, { size: 'invisible' }, auth);
}

// Login with phone number
export function loginWithPhone(phoneNumber: string, appVerifier: RecaptchaVerifier) {
  return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
}
