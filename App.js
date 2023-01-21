// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Platform, KeyboardAvoidingView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Providers from "./navigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
        style={{ flex: 1 }}
      >
        <Providers />
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}

