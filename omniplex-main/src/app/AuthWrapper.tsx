"use client";

import { setAuthState, setUserDetailsState } from "@/store/authSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { isFirebaseConfigured } from "../../firebaseConfig";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isFirebaseConfigured) {
      console.log("Firebase not configured, skipping auth initialization");
      return;
    }

    try {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          dispatch(setAuthState(true));
          dispatch(
            setUserDetailsState({
              uid: user.uid,
              name: user.displayName ?? "",
              email: user.email ?? "",
              profilePic: user.photoURL ?? "",
            })
          );
        } else {
          console.log("User is signed out");
        }
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Firebase auth initialization error:", error);
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthWrapper;
