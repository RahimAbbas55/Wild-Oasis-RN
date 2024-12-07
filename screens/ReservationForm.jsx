import {
    StyleSheet,
    TextInput,
    Text,
    View,
    Image,
    Alert,
    ScrollView,
  } from "react-native";
  import { globalColors } from "../constants/colors";
  import { useState } from "react";
  import {
    getDaysBetweenDates,
    validateArrivalDate,
    validCheckoutDate,
  } from "../data/util";
  import { useStripe } from "@stripe/stripe-react-native";
  import { bookCabins, checkExistingBookings } from "../data/data-service";
  import { Platform } from "react-native";
  import CustomButton from "../components/UI/CustomButton";
  import Toast from "../components/Static/Toast";
  
  
  export default function ReservationForm({ navigation, route }) {
    // states and functions for stripe
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    // data recevied from the previous screen
    const { cabin, userData } = route.params;
    // states to manage the form data
    const [arrivalDate, setArrivalDate] = useState("");
    const [checkoutDate, setCheckoutDate] = useState("");
    const [noOfGuests, setNoOfGuests] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
  
    // states to manage toasts
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastColor, setToastColor] = useState("#28a745");
  
    // server url for android and ios platforms
    const SERVER_URL =
      Platform.OS === "android"
        ? "http://10.0.2.2:8000"
        : "http://localhost:8000";
  
    // Helper functions for the Stripe Payment Integration
    const fetchPaymentSheetParams = async () => {
      const response = await fetch(`${SERVER_URL}/payment-sheet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount:
            cabin.regularPrice *
            getDaysBetweenDates(arrivalDate, checkoutDate) *
            100,
        }),
      });
  
      const { paymentIntent, ephemeralKey, customer } = await response.json();
  
      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    };
    const initializePaymentSheet = async () => {
      const { paymentIntent, ephemeralKey, customer } =
        await fetchPaymentSheetParams();
  
      const { error } = await initPaymentSheet({
        merchantDisplayName: "Wild Oasis Inc.",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: userData.userUsername,
        },
      });
      if (!error) {
        setLoading(true);
      }
    };
    const openPaymentSheet = async () => {
      const { error } = await presentPaymentSheet();
  
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Success", "Your order is confirmed!");
        return "success";
      }
      return "error";
    };
    // function that shows toasts
    function showToast() {
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
    }
    // handler functions to get form input
    function arrivalDateHandler(input) {
      setArrivalDate(input);
    }
    function checkoutDateHandler(input) {
      setCheckoutDate(input);
    }
    function guestHandler(input) {
      setNoOfGuests(input);
    }
    function infoHandler(input) {
      setAdditionalInfo(input);
    }
  
    async function makePaymentHandler() {
      // // Check if all required fields are filled
      if (!arrivalDate || !checkoutDate || !noOfGuests || !additionalInfo) {
        setToastMessage("Invalid credentials entered!");
        setToastColor("#dc3545");
        showToast();
        return;
      }
  
      // Validate the dates
      const isValidArrivalDate = validateArrivalDate(arrivalDate);
      const isValidCheckoutDate = validCheckoutDate(checkoutDate);
      const noOfDays = getDaysBetweenDates(arrivalDate, checkoutDate);
      const numGuests = parseInt(noOfGuests);
  
      // validate dates format
      if (!isValidArrivalDate || !isValidCheckoutDate) {
        setToastMessage("Invalid date range selected!");
        setToastColor("#dc3545");
        showToast();
        return;
      }
  
      // check if cabin even have the space of entered number of guests
      if (cabin.maxCapacity < numGuests) {
        setToastMessage(
          "Entered amount exceeds the total capacity of the cabin!"
        );
        setToastColor("#dc3545");
        showToast();
        return;
      }
  
      // make a new booking
      const newBooking = {
        startDate: arrivalDate,
        endDate: checkoutDate,
        noOfNights: noOfDays,
        noOfGuests: numGuests,
        cabinPrice: cabin.regularPrice,
        totalPrice: cabin.regularPrice * noOfDays,
        observations: additionalInfo,
        cabinId: cabin.cabinId,
        user_id: userData.userId,
      };
  
      const response = await checkExistingBookings(newBooking);
      if (response === "Cabin is already booked for the selected dates.") {
        setToastMessage(response);
        setToastColor("#dc3545");
        showToast();
        return;
      }
  
      if (response === "success") {
        let res;
        try {
          await initializePaymentSheet();
          res = await openPaymentSheet();
        } catch (error) {
          console.log("Payment error", error);
        }
        if (res === "success") {
          await bookCabins(newBooking);
          setToastMessage("Booking Successful!");
          setToastColor("#28a745");
          showToast();
          setTimeout(() => {
            navigation.navigate("ThankYou");
          } , 3000)
          
        }
      } 
    }
    return (
      <ScrollView style={styles.outerContainer}>
        <View style={styles.imageContainer}>
          <Image source={require("../assets/utility-photos/logo.png")} />
        </View>
        <Text style={styles.headingStyle}>Cabin Reservation</Text>
        <View style={styles.innerContainer}>
          <Text style={styles.inputText}>Enter Your Arrival Date:</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="YYYY-MM-DD"
            onChangeText={arrivalDateHandler}
            maxLength={10}
          />
  
          <Text style={styles.inputText}>Enter Your CheckOut Date:</Text>
          <TextInput
            maxLength={10}
            style={styles.inputStyle}
            placeholder="YYYY-MM-DD"
            onChangeText={checkoutDateHandler}
          />
  
          <Text style={styles.inputText}>Enter Your Number of Guests:</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Number of guests"
            onChangeText={guestHandler}
          />
          <Text style={styles.inputText}>Enter Additional Information:</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Additional Info"
            onChangeText={infoHandler}
          />
        </View>
        <View style={styles.btn}>
          <CustomButton
            style={styles.customBtnAdditionalStyle}
            onPressHandler={makePaymentHandler}
          >
            Proceed To Pay
          </CustomButton>
        </View>
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
      borderWidth: 3,
      borderColor: globalColors.primaryBtn,
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
    customBtnAdditionalStyle: {
      width: 150,
    },
  });
  