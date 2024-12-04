import { StyleSheet, TextInput, Text, View, Image, ScrollView } from "react-native";
import { globalColors } from "../constants/colors";
import { useState } from "react";
import { signInUser } from "../data/data-service";
import { validateEmail } from "../data/util";
import CustomButton from "../components/UI/CustomButton";
import Toast from "../components/Static/Toast";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("#28a745");

  function showToast() {
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  }
  function emailHandler(enteredEmail) {
    setEmail(enteredEmail);
  }
  function passwordHandler(enteredPassword) {
    setPassword(enteredPassword);
  }
  async function loginHandler() {
    const validEmail = validateEmail(email);
    if (!email || !password || !validEmail) {
      setToastMessage("Invalid credentials entered!");
      setToastColor("#dc3545");
      showToast();
      return;
    }
  
    try {
      const isLogedIn = await signInUser(email, password);
      if ( isLogedIn ){
        setToastMessage("Login Successful!");
        setToastColor("#28a745");
        showToast();
      }
      else{
        setToastMessage("Login Unsuccessful!");
        setToastColor("#dc3545");
        showToast();
      }
    } catch (error) {
      setToastMessage("Login Failed. Please check your entered details");
      setToastColor("#dc3545");
      showToast();
      return;
    }
  }
  return (
    <ScrollView style={styles.outerContainer}>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/utility-photos/logo.png")} />
      </View>
      <Text style={styles.headingStyle}>Login to your account</Text>
      <View style={styles.innerContainer}>
        <Text style={styles.inputText}>Enter Your Email Address:</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          onChangeText={emailHandler}
          autoCapitalize={false}
        />

        <Text style={styles.inputText}>Enter Your Password:</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={passwordHandler}
          autoCapitalize={false}
        />
      </View>
      <View style={styles.btn}>
        <CustomButton onPressHandler={loginHandler}>Login</CustomButton>
      </View>
      <Text style={styles.border}></Text>
      <Toast
        message={toastMessage}
        visible={toastVisible}
        backgroundColor={toastColor}
        position="top"
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
    alignItems: "center",
    justifyContent: "center",
  },
  border: {
    borderColor: globalColors.primaryBtn,
    borderBottomWidth: 2,
  },
  btnExtraStyle: {
    width: 200,
  },
});
