import { initializeApp } from "firebase-admin";

export const TRAKLIST = initializeApp();
export const db = TRAKLIST.firestore();
