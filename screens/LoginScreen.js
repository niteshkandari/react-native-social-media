import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  SafeAreaView
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { flashAlert } from "../core/utils";
import { useAuthContext } from "../navigation/AuthProvider";

const LoginScreen = ({ navigation }) => {
  const [user, setUser] = useState({ email: "", password: ""});
  // const auth = getAuth();
  const useAuth = useAuthContext();

  // (async function(){
    // try{
      // const keys = await AsyncStorage.getAllKeys();
      // const result = await AsyncStorage.multiGet(keys);
      // console.log(keys,"keys")
      // console.log(result,"result")
      // console.log(JSON.parse(result[0][1]),"data")
  //   }catch(err){
  //     console.error(err,"rr")
  //   }
  // }())
  const handleSubmit = (args) => {
      if (!user.email || !user.password) {
        flashAlert({
          description:"Fields cannot be left empty",
          type:"danger",
          message:"Validation error"
        });
        return;
      }
      useAuth.login(user).then(success => {
        flashAlert({
          type:"success",
          description:"Logged in successfully"
        })
        // navigation.navigate('Home');
        console.log(success,"success")
      }).catch(err => {
        console.error(err,"err");
      }) 
  //   signInWithEmailAndPassword(auth, user.email, user.password)
  //    .then((userCredential) => {
  //   // Signed in 
  //   const signedinUser = userCredential.user;
  //   console.log(signedinUser,"success");
  //           navigation.navigate("Chat", {
  //         ...signedinUser,
  //         // userName:user.userName
  //       });
  //   // ...
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   console.error(errorMessage)

  // });
    // createUserWithEmailAndPassword(auth, user.email, user.password)
    //   .then((userCredential) => {
    //     // Signed in
    //     setModalVisible(false);
    //     const signedinUser = userCredential.user;
    //     console.log(signedinUser, "signed in");
    //     navigation.navigate("Chat", {
    //       ...signedinUser,
    //       userName:user.userName
    //     });
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // ..
    //     alert(errorMessage);
    //     console.error(errorCode);
    //     console.error(errorMessage);
    //   });
  };
  const Bold = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>;

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.circle} />

        <Image
          source={require("../assets/chat.png")}
          style={{ width: 200, height: 200, alignSelf: "center" }}
        />
        <View style={{ marginHorizontal: 30 }}>
          <Text style={styles.header}>Email</Text>
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
          <Text style={styles.header}>password</Text>
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
          <View style={{ alignItems: "flex-end", marginTop: 64 }}>
            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
              <Ionicons name={"md-arrow-forward"} size={34} color={"#fff"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex:1, justifyContent:"flex-end",alignItems:"center"}}>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{fontSize:17, fontWeight:"400"}}>Don't have an account? <Bold>create</Bold></Text>
          </TouchableOpacity>  
        </View>
      </SafeAreaView>
    </>
  );
};

export default LoginScreen;

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
    fontSize: 30,
    marginTop: 32,
    color: "#514e5a",
  },
  input: {
    marginTop: 32,
    height: 50,
    borderColor: "#bab7c3",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 30,
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
