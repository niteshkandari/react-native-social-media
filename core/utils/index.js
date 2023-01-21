import { showMessage } from "react-native-flash-message";

const flashAlert = (
  { type, message, description } = {
    type: "info",
    message: "",
    description: "",
  }
) => {
  showMessage({
    type,
    message,
    description,
    autoHide: true,
  });
};

const isSignUpFormValid = (signUpData) => {
  const obj = {};
  for(const key in signUpData) {
      if(!signUpData[key]) {
        obj =  {message:`${key} cannot be left empty`, isValid:false}
      } else return true; 
  }
  return obj
}

export { flashAlert, isSignUpFormValid };
