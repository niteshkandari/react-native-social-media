import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuthContext } from "../navigation/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { flashAlert } from "../core/utils";

const ProfileScreen = () => {
  const useAuth = useAuthContext(); 

  const handleLogOut = () => {
    useAuth.logout().then(success => {
    console.log(success,"check carefully");
    flashAlert({
      type: 'success',
      description:"logout successfully"
    })
    }).catch(err => {
      console.error(err);
    })
  };

  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      <Ionicons onPress={handleLogOut} name="log-out-outline" size={40}/>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})