/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import firebase from 'firebase';

import { FIREBASE_CONFIG } from '../../config';

try {
  firebase.initializeApp(FIREBASE_CONFIG);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    // eslint-disable-next-line no-console
    console.error('Firebase initialization error', err.stack);
  }
}

/**
 * Registers a user with email and password
 */
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (form: { email: string, password: string }) => (
    firebase.auth().createUserWithEmailAndPassword(form.email, form.password)
  ),
);

/**
 * Logs a user in with email and password
 */
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (form: { email: string, password: string }) => (
    firebase.auth().signInWithEmailAndPassword(form.email, form.password)
  ),
);

/**
 * Logs a user out
 */
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => firebase.auth().signOut(),
);

type AuthInitialState = {
  user: {
    currentUser: Record<string, any> | null,
    isLoggedIn: boolean,
    isLoading: boolean,
    isError: boolean,
  }
  register: {
    isVerifying: boolean;
    isError: boolean,
    errorMessage: string | null;
  }
}
const initialState: AuthInitialState = {
  user: {
    currentUser: null,
    isLoggedIn: false,
    isLoading: false,
    isError: false,
  },
  register: {
    isVerifying: false,
    isError: false,
    errorMessage: null,
  },
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.pending.type]: (state) => {
      state.register = {
        ...initialState.register,
        isVerifying: true,
      };
    },
    [registerUser.fulfilled.type]: (state, action) => {
      state.user = {
        ...initialState.user,
        currentUser: action.payload,
        isLoggedIn: true,
      };
      state.register = {
        ...initialState.register,
      };
    },
    [registerUser.rejected.type]: (state, action) => {
      state.register = {
        ...initialState.register,
        isError: true,
        errorMessage: action.error?.message,
      };
    },
    [loginUser.pending.type]: (state) => {
      state.user = {
        ...initialState.user,
        isLoading: true,
      };
    },
    [loginUser.fulfilled.type]: (state, action) => {
      state.user = {
        ...initialState.user,
        currentUser: action.payload,
        isLoggedIn: true,
      };
    },
    [loginUser.rejected.type]: (state, action) => {
      state.user = {
        ...initialState.user,
        isError: true,
      };
    },
    [logoutUser.pending.type]: (state) => {
      state.user = {
        ...initialState.user,
        isLoading: true,
      };
    },
    [logoutUser.fulfilled.type]: (state) => {
      state.user = {
        ...initialState.user,
      };
    },
    [logoutUser.rejected.type]: (state) => {
      state.user = {
        ...initialState.user,
        isError: true,
      };
    },
  },
});

export default authSlice;
