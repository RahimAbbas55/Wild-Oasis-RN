import { Image, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/UI/CustomButton";
import { globalColors } from "../constants/colors";

export default function WelcomeLogin({ navigation }) {
    function signUpHandler(){
        navigation.navigate('signup')
    }
    function logInHandler(){
        navigation.navigate('login')
    }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/utility-photos/logo.png")}
        />
      </View>
        <Text style={styles.text1}>Welcome to Wild Oasis</Text>  
      <Text style={styles.text2}>How would you like to proceed?</Text>
      <View style={styles.btnContainer}>
        <CustomButton onPressHandler={signUpHandler}>
          Sign Up
        </CustomButton>
        <CustomButton onPressHandler={logInHandler}>
          Login
        </CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: globalColors.backgroundMain,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 20,
  },
  text1: {
    fontSize: 26,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20
  },
  text2: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20
  },
  btnContainer: {
    flexDirection: 'row'
  }
});
