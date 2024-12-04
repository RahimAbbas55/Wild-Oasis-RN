import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
} from "react-native";
import {
  getDaysBetweenDates,
  validateArrivalDate,
  validCheckoutDate,
} from "../data/util";
import { globalColors } from "../constants/colors";
import { useState } from "react";
import Toast from "../components/Static/Toast";
import CustomButton from "../components/UI/CustomButton";
import { updateBooking } from "../data/data-service";

export default function EditReservation({ navigation , route }) {
  const { data } = route.params;``
  const [arrivalDate, setArrivalDate] = useState(data.stDate);
  const [checkoutDate, setCheckoutDate] = useState(data.edDate);
  const [noOfGuests, setNoOfGuests] = useState(String(data.guests));
  const [additionalInfo, setAdditionalInfo] = useState(data.info);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("#28a745");
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

  async function editConfirmHandler() {
    if (!arrivalDate || !checkoutDate || !additionalInfo) {
      setToastMessage("Invalid credentials entered!");
      setToastColor("#dc3545");
      showToast();
      return;
    }
    const isValidArrivalDate = validateArrivalDate(arrivalDate);
    const isValidCheckoutDate = validCheckoutDate(checkoutDate);
    const noOfDays = getDaysBetweenDates(arrivalDate, checkoutDate);

    if (!isValidArrivalDate || !isValidCheckoutDate) {
      setToastMessage("Invalid date range selected!");
      setToastColor("#dc3545");
      showToast();
      return;
    }

    const editedBookingData = {
      id: data.bookingId,
      startDate: arrivalDate,
      endDate: checkoutDate,
      noOfNights: noOfDays,
      totalPrice: data.price * noOfDays,
      observations: additionalInfo,
    };

    await updateBooking(editedBookingData);
    setToastMessage("Reservation Edited Successfully!");
    setToastColor("#28a745");
    showToast();

    setTimeout(() => {
        navigation.goBack()
    } , 2000)
  }

  return (
    <ScrollView style={styles.outerContainer}>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/utility-photos/logo.png")} />
      </View>
      <Text style={styles.headingStyle}>Edit Reservation</Text>
      <View style={styles.innerContainer}>
        <Text style={styles.inputText}>Enter Your New Arrival Date:</Text>
        <TextInput
          style={styles.inputStyle}
          value={arrivalDate}
          placeholder="YYYY-MM-DD"
          onChangeText={arrivalDateHandler}
          maxLength={10}
        />

        <Text style={styles.inputText}>Enter Your New CheckOut Date:</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="YYYY-MM-DD"
          value={checkoutDate}
          onChangeText={checkoutDateHandler}
          maxLength={10}
        />

        <Text style={styles.inputText}>Enter Your Number of Guests:</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Number of guests"
          value={noOfGuests}
          onChangeText={guestHandler}
          editable={false}
        />
        <Text style={styles.inputText}>Enter New Additional Information:</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Additional Info"
          value={additionalInfo}
          onChangeText={infoHandler}
        />
      </View>
      <View style={styles.btn}>
        <CustomButton
          style={styles.customBtnAdditionalStyle}
          onPressHandler={editConfirmHandler}
        >
          Confirm Edit
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
