import { Image, StyleSheet, Text, View } from "react-native";
import { globalColors } from "../constants/colors";
import { getCurrentUser, getUser } from "../data/data-service";
import CustomButton from "../components/UI/CustomButton";


export default function Homepage({ navigation }) {
  function navigateToAllCabins() {
    navigation.replace("Cabins");
  }
  return (
    <>
      <View style={styles.outerContainer}>
        <Text style={[styles.genericHeading]}>Welcome to The Wild Oasis</Text>
        <View style={styles.imgContainer}>
          <Image
            source={require("../assets/utility-photos/about-1.jpg")}
            style={styles.images}
          />
          <Text style={styles.paragraph}>
            Where nature's beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home.Our 8 luxury cabins provide a cozy base, but
            the real freedom and peace you'll find in the surrounding mountains.
            Wander through lush forests, breathe in the fresh air, and watch the
            stars twinkle above from the warmth of a campfire or your hot tub.
          </Text>
        </View>
        <View style={styles.btn}>
          <CustomButton
            style={styles.btnExtraStyle}
            onPressHandler={navigateToAllCabins}
          >
            Explore Luxury Cabins
          </CustomButton>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: globalColors.backgroundMain,
    padding: 12,
    alignItems: "center",
  },
  imgContainer: {
    alignItems: "center",
  },
  genericHeading: {
    fontSize: 30,
    color: globalColors.primaryBtn,
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 16,
  },
  images: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderWidth: 2,
    borderColor: globalColors.primaryBtn,
    borderRadius: 15,
  },
  paragraph: {
    fontSize: 18,
    color: globalColors.text,
    textAlign: "center",
    marginTop: 12,
    paddingHorizontal: 20,
    lineHeight: 24,
    fontStyle: "italic",
    color: "white",
  },
  btn: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  btnExtraStyle: {
    width: 200,
  },
});
