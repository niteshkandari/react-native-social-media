import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { flashAlert, isSignUpFormValid } from "../core/utils";
import { useAuthContext } from "../navigation/AuthProvider";

const SignupScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const useAuth = useAuthContext();
  // (async function(){
  //   try{
  //     const keys = await AsyncStorage.getAllKeys();
  //     const result = await AsyncStorage.multiGet(keys);
  //     console.log(keys,"keys")
  // console.log(result,"result")
  // console.log(JSON.parse(result[0][1]),"data")
  //   }catch(err){
  //     console.error(err,"rr")
  //   }
  // }())

  const handleSubmit = () => {
    if (isSignUpFormValid(user).isValid) {
      flashAlert({
        type: "danger",
        message: isSignUpFormValid(user).message,
      });
      return;
    }
    useAuth
      .register(user)
      .then((success) => {
        flashAlert({
          type: "success",
          message: "Account successfully registered",
        });
        setUser({
          email: "",
          password: "",
          firstName: "",
          lastName: "",
        });
        setTimeout(() => {
          useAuth.setUser(null);
          navigation.navigate("Login");
        }, 1000);
      })
      .catch((err) => {
        flashAlert({
          type: "danger",
          message: err.message,
        });
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.circle} />
      <Text
        style={{
          marginTop: 10,
          textAlign: "center",
          fontSize: 40,
          fontWeight: "800",
          color: "#ADD8E9",
        }}
      >
        Sign Up
      </Text>

      <View style={{ marginHorizontal: 30 }}>
        <View style={styles.inputBox}>
          <MaterialCommunityIcons name="account" size={30} color="#ADD8E9" />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            onChangeText={(email) =>
              setUser((prev) => {
                return { ...prev, email };
              })
            }
            value={user.email}
          />
        </View>

        <View style={styles.inputBox}>
          <FontAwesome name="key" size={30} color="#ADD8E9" />
          <TextInput
            style={styles.input}
            placeholder="password"
            onChangeText={(password) =>
              setUser((prev) => {
                return { ...prev, password };
              })
            }
            value={user.password}
          />
        </View>

        <View style={styles.inputBox}>
          <FontAwesome name="user" size={30} color="#ADD8E9" />
          <TextInput
            style={styles.input}
            placeholder="First Name"
            onChangeText={(firstName) =>
              setUser((prev) => {
                return { ...prev, firstName };
              })
            }
            value={user.firstName}
          />
        </View>

        <View style={styles.inputBox}>
          <FontAwesome name="user" size={30} color="#ADD8E9" />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            onChangeText={(lastName) =>
              setUser((prev) => {
                return { ...prev, lastName };
              })
            }
            value={user.lastName}
          />
        </View>

        <View style={{ alignItems: "flex-end", marginTop: 64 }}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Ionicons name={"md-arrow-forward"} size={34} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={{flex:1, justifyContent:"flex-end"}}>
        <Text style={{textAlign:"center", marginBottom:10, color:"grey"}}>Or Sign in using</Text>
        <View style={{flexDirection:'row', justifyContent:"center"}}>
        <MaterialCommunityIcons name="instagram" size={32} color="#ADD8E9" />
        <View style={{marginLeft:20}}/>
        <MaterialCommunityIcons name="facebook" size={32} color="#ADD8E9" />
        <View style={{marginLeft:20}}/>
        <MaterialCommunityIcons name="google" size={32} color="#ADD8E9" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f5f7",
  },
  circle: {
    width: 500,
    height: 500,
    backgroundColor: "#fff",
    borderRadius: 500 / 2,
    position: "absolute",
    left: -120,
    top: -20,
  },
  header: {
    fontWeight: "800",
    fontSize: 20,
    marginTop: 32,
    color: "#514e5a",
  },
  inputBox: {
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "row",
    padding: 8,
    borderRadius: 40,
    marginTop: 30,
    borderColor: "#bab7c3",
    borderWidth: StyleSheet.hairlineWidth,
  },
  input: {
    paddingHorizontal: 16,
    color: "#514e5a",
    fontWeight: "600",
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: "#ADD8E9",
    alignItems: "center",
    justifyContent: "center",
  },
});
