// lib/auth.js
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithPhoneNumber,
    RecaptchaVerifier,
  } from 'firebase/auth';
  
  import { auth } from './firebase';
  
  // 注册
  export function registerWithEmail(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  
  // 登录
  export function loginWithEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  
  // 登出
  export function logout() {
    return signOut(auth);
  }
  
  // 监听用户状态
  export function observeAuthState(callback) {
    return onAuthStateChanged(auth, callback);
  }
  
  // 手机验证码登录（可选）
  export function setupRecaptcha(containerId) {
    return new RecaptchaVerifier(containerId, { size: 'invisible' }, auth);
  }
  
  export function loginWithPhone(phoneNumber, appVerifier) {
    return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
  }
  