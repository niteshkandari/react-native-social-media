import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Fire from "../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import moment from "moment";


const ChatScreen = (props) => {
  const [messages, setMessages] = useState([]);
  const [chatMessage, setChatMessage] = React.useState("");
  const currentUser = props?.route.params;
  const db = getFirestore(Fire);
  const queryRef = query(
    collection(db, "users"),
    orderBy("createdAt"),
    limit(8)
  );

  useEffect(() => {
    onSnapshot(queryRef, (snapshot) => {
      const messageDoc = [...messages];
      snapshot.forEach((doc) => {
        messageDoc.push({ _id: doc.id, ...doc.data() });
      });
      setMessages([...messageDoc]);
    });
  }, []);

  // const getAllCollection = async () => {
  //   const docs = [];
  //   const querySnapshot = await getDocs(queryRef);
  //   querySnapshot.forEach((doc) => {
  //     docs.push({
  //       _id: doc.id,
  //       ...doc.data(),
  //     });
  //   });
  //   setMessages([...docs]);
  // };

  const handleSend = async () => {
    // console.log("started sending message");
    try {
      const docRef = await addDoc(collection(db, "users"), {
        userName: currentUser.email,
        userId: currentUser.uid,
        chatMessage,
        createdAt: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setChatMessage("");
  };

  return (
    <SafeAreaView style={styles.chatRoomWrapper}>
      <ScrollView style={styles.chatRoom} alwaysBounceHorizontal={true}>
        <FlatList
          data={messages}
          renderItem={({ item }) => {
            const position =
              currentUser.uid === item.userId
                ? "flex-end"
                : "flex-start";
            return (
              <View
                key={item._id}
                style={{ ...styles.bubble, alignSelf: position }}
              >
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "600" }}
                >
                  {item.chatMessage}
                </Text>
                <Text
                  style={{
                    textAlign: "right",
                    color: "white",
                    fontWeight: "600",
                    marginRight: 7,
                  }}
                >
                  {/* {moment(item.createdAt).format("hrs")} */}
                </Text>
              </View>
            );
          }}
          keyExtractor={(item) => item._id}
        />
      </ScrollView>

      <View style={styles.messageBox}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Type something..."
            onChangeText={(chat) => setChatMessage(chat)}
            value={chatMessage}
          />
        </View>

        <View style={styles.btnWrapper}>
          <TouchableOpacity style={styles.btn} onPress={handleSend}>
            <Ionicons name="md-arrow-forward" size={29} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default ChatScreen;

const styles = StyleSheet.create({
  chatRoomWrapper: {
    flex: 1,
  },
  chatRoom: {
    flex: 1,
    padding: 8,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  bubble: {
    flex: 1,
    padding: 6,
    marginTop: 30,
    backgroundColor: "#75E6DA",
    width: 200,
    borderRadius: 50,
  },
  messageBox: {
    flex: 1 / 6,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  inputWrapper: {
    flex: 1,
    padding: 3,
    justifyContent: "center",
  },
  input: {
    borderColor: "#75E6DA",
    borderWidth: 2,
    padding: 14,
    borderRadius: 30,
    marginLeft: 10,
  },
  btnWrapper: {
    flex: 1 / 4,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    borderColor: "white",
    backgroundColor: "#75E6DA",
    borderWidth: 2,
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
