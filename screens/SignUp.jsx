import { StyleSheet, TextInput, Text, View, Image, ScrollView } from "react-native";
import { globalColors } from "../constants/colors";
import { useState } from "react";
import { signUp } from "../data/data-service";
import { validateEmail, validatePassword, validateUsername } from "../data/util";
import CustomButton from "../components/UI/CustomButton";
import Toast from "../components/Static/Toast";  // Toast component import

export default function SignUp({ navigation }) {
  const [username , setUsername] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [confirmPassword , setConfirmPassword] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState('#28a745');

  //utility functions to get user sign-up form data
  function usernameHandler(enteredUsername){
    setUsername(enteredUsername);
  }
  function emailHandler(enteredEmail){
    setEmail(enteredEmail);
  }
  function passwordHandler(enteredPassword){
    setPassword(enteredPassword);
  }
  function confirmPasswordHandler(enteredConfirmPassword){
    setConfirmPassword(enteredConfirmPassword);
  }

  async function signupHandler() {
    const isValidUsername = validateUsername(username);
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password, confirmPassword);

    if (!isValidEmail || !isValidPassword || !isValidUsername) {
      setToastMessage('Invalid credentials entered!');
      setToastColor('#dc3545');
      showToast();
      return;
    }

    try {
      setToastMessage('Signup Successful!');
      setToastColor('#28a745');
      showToast();
      await signUp(email, password , username);
    } 
    catch (error) {
      console.log(error);
      setToastMessage('Signup Failed. Please try again!');
      setToastColor('#dc3545');
      showToast(); 
    }
  }
  function showToast() {
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  }

  return (
    <ScrollView style={styles.outerContainer}>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/utility-photos/logo.png")} />
      </View>
      <Text style={styles.headingStyle}>Sign Up</Text>
      <View style={styles.innerContainer}>
        <Text style={styles.inputText}>Enter Your Username:</Text>
        <TextInput style={styles.inputStyle} placeholder="Username" onChangeText={usernameHandler} autoCapitalize="false" />

        <Text style={styles.inputText}>Enter Your Email Address:</Text>
        <TextInput style={styles.inputStyle} placeholder="Email" onChangeText={emailHandler} autoCapitalize="false"/>

        <Text style={styles.inputText}>Enter Your Password:</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={passwordHandler}
        />

        <Text style={styles.inputText}>Re-type Password:</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={confirmPasswordHandler}
        />
      </View>
      <View style={styles.btn}>
        <CustomButton onPressHandler={signupHandler}>Sign Up</CustomButton>
      </View>
      <Toast
        message={toastMessage}
        visible={toastVisible}
        backgroundColor={toastColor}
        position="bottom"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: globalColors.backgroundMain,
    flex: 1,
    padding: 18,
  },
  innerContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  headingStyle: {
    color: globalColors.primaryBtn,
    textDecorationLine: "underline",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputText: {
    color: globalColors.primaryBtn,
    fontSize: 18,
    marginBottom: 5,
  },
  inputStyle: {
    height: 40,
    width: 300,
    backgroundColor: "#bfc7cd",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  btn: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    marginBottom: 20,
    alignItems:'center',
    justifyContent: 'center'
  },
});
