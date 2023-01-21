import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./AuthProvider";
import FlashMessage from "react-native-flash-message";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

const Routes = () => {
  const { user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const auth = getAuth();

  const authCallback = (user) => {
    console.log("Auth callback , auth changed", user)
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, authCallback);
    // unsubscribe on unmount
    // return subscriber();
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
      <FlashMessage position={"top"} />
    </NavigationContainer>
  );
};

export default Routes;
