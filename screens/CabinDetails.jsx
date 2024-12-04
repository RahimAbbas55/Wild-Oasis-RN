import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { globalColors } from "../constants/colors";
import { useEffect, useState } from "react";
import { getCabin, getLoggedInUserData } from "../data/data-service";
import CustomIcon from "../components/Static/CustomIcon";
import CustomButton from "../components/UI/CustomButton";
import Loader from "../components/Static/Loader";

export default function CabinDetail({ navigation , route }) {
  const [selectedCabin, setSelectedCabin] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [user , setUser] = useState({});
  const { cabinId , email } = route.params;
  // useEffect to get cabin details
  useEffect(() => {
    async function fetchCabinDetails() {
      try {
        setIsLoading(true)
        const cabin = await getCabin(cabinId);
        setSelectedCabin(cabin);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false)
      }
    }
    fetchCabinDetails();
  }, []);

  useEffect(() => {
    async function fetchUser(){
      try {
        setIsLoading(true)
        const user = await getLoggedInUserData(email)
        setUser(user)
      } catch (error) {
        console.log(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUser()
  } , [])
  
  function navigationHandler(){
    navigation.navigate('CabinReservation' , {
      cabin: selectedCabin,
      userData : user
    });
  }
  return (
    <View style={styles.outerContainer}>
     {
      isLoading ? (
        <Loader/>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={{ uri: selectedCabin.image }}
          style={styles.imgContainer}
        />
        <Text style={styles.descriptionText}>{selectedCabin.description}</Text>
        <CustomIcon icon_name="map-marker" icon_size={30} color='#00FF00'>
          Located in the heart of the Dolomites (Italy)
        </CustomIcon>
        <CustomIcon icon_name="users" icon_size={25} color='#86a5c6'>
          For upto{" "}
          <Text style={styles.highlightedText}>
            {selectedCabin.maxCapacity}
          </Text>{" "}
          person.
        </CustomIcon>
        <CustomIcon icon_name="eye" icon_size={25} color='#86a5c6'>
          Privacy <Text style={styles.highlightedText}>100%</Text> guranteed.
        </CustomIcon>
        <CustomIcon icon_name="money" icon_size={25} color='#228B22'>
          <Text style={styles.highlightedText}>{selectedCabin.regularPrice}$</Text> per night.
        </CustomIcon>
        <CustomButton style={styles.btnStyle} onPressHandler={navigationHandler}>Make Reservation</CustomButton>
      </ScrollView>
      )
     }
    </View>
  );
}
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: globalColors.backgroundMain,
    padding: 12,
    alignItems: "center",
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  imgContainer: {
    width: 250,
    height: 250,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: globalColors.primaryBtn,
    marginTop: 15,
  },
  descriptionText: {
    color: "white",
    marginTop: 15,
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 24,
    fontStyle: "italic",
    fontSize: 14,
  },
  highlightedText: { fontWeight: "bold", color: "white" },
  btnStyle: {
    width: 200,
    marginTop: 16,
  },
});
