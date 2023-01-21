import React, { createContext, useState, useContext } from "react";
import {
  collection,
  addDoc,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Fire from "../firebaseConfig";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const db = getFirestore(Fire);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: ({ email, password }) => {
          return new Promise(async (resolve, reject) => {
            try {
              const signedInUser = await signInWithEmailAndPassword(
                auth,
                email,
                password
              );
              resolve(signedInUser);
            } catch (e) {
              reject(e);
            }
          });
        },
        register: ({ firstName, lastName, email, password }) => {
          return new Promise(async (resolve, reject) => {
            try {
              await createUserWithEmailAndPassword(auth, email, password)
                .then(async (success) => {
                  try {
                    await addDoc(collection(db, "userDoc"), {
                      firstName,
                      lastName,
                      profileImage: "",
                      userLocation: "",
                      createdAt: serverTimestamp(),
                    });
                    resolve(success);
                  } catch (err) {
                    console.error(err, "db error: " + err.message);
                    reject(err);
                  }
                })
                .catch((error) => {
                  console.log("Something went wrong with sign up: ", error);
                  reject(error);
                });
            } catch (e) {
              console.log(e);
            }
          });
        },
        logout: () => {
          return new Promise(async (resolve, reject) => {
            try {
              const authState = await signOut(auth);
              resolve(authState);
            } catch (e) {
              reject(e);
            }
          });
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
