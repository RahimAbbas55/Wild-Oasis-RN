import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import { globalColors } from "../constants/colors";
import CustomButton from "../components/UI/CustomButton";

export default function AboutUs({ navigation }) {
  function navigateToAllCabins() {
    navigation.navigate("Cabins");
  }
  return (
    <ScrollView
      style={styles.outerContainer}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.imgContainer}>
        <Image
          source={require("../assets/utility-photos/about-2.jpg")}
          style={styles.images}
        />
        <Text style={styles.paragraph}>
          Since 1962, The Wild Oasis has been a cherished family-run retreat.
          Started by our grandparents, this haven has been nurtured with love
          and care, passing down through our family as a testament to our
          dedication to creating a warm, welcoming environment.
        </Text>
        <Text style={styles.paragraph}>
          Over the years, we've maintained the essence of The Wild Oasis,
          blending the timeless beauty of the mountains with the personal touch
          only a family business can offer. Here, you're not just a guest;
          you're part of our extended family. So join us at The Wild Oasis soon,
          where tradition meets tranquility, and every visit is like coming
          home.
        </Text>
      </View>
      <View style={styles.btn}>
        <CustomButton onPressHandler={navigateToAllCabins}>
          Explore Cabins
        </CustomButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: globalColors.backgroundMain,
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 20, // Add some padding at the bottom for better appearance
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
    width: 180,
    height: 180,
    marginTop: 20,
    borderWidth: 2,
    borderColor: globalColors.primaryBtn,
    borderRadius: 100,
    alignItems: 'left'
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
    marginTop: 20, // Optional: Add some margin to the button container
  },
});
