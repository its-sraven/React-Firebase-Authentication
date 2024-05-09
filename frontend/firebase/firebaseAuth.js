import {
    signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    sendEmailVerification, sendPasswordResetEmail, signInWithRedirect, signOut
} from 'firebase/auth';
import { auth } from './firebaseConfig';


const googleProvider = new GoogleAuthProvider();


export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log("authenticted with signInWithGoogle function")
        return result.user;
    } catch (error) {
        console.error('Google authentication failed', error);
        throw error;
    }
};

export const signUpWithEmail = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Send verification email
        await sendEmailVerification(auth.currentUser);
        return userCredential.user;
    } catch (error) {
        console.error('User creation failed...', error);
        throw error;
    }
};

export const signInWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error('Email authentication failed', error);
        throw error;
    }
};

export const logInWithEmailAndPassword = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error('Email authentication failed', error);
        throw error;
    }
};

export const doSignOut = async () => {
    try {
        await signOut(auth);
        console.log('Firebase Sign out successful');
    } catch (error) {
        console.log('Firebase Sign out failed', error);
        throw error;
    }
};