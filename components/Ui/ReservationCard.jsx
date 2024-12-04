import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { globalColors } from "../../constants/colors";
import { useState } from "react";
import CustomButton from "./CustomButton";
import CustomIcon from "../Static/CustomIcon";
import Toast from "../Static/Toast";
export default function ReservationCard({ navigation , bookingDetails , onDelete }) {
  // states to manage toasts
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("#28a745");

  function showDeleteDialog(item) {
    Alert.alert(
      "Delete Reservation",
      "Are you sure you want to delete your reservation?",
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: "Yes",
          onPress: () => deleteHandler(item.bookingId)
        }
      ]
    )
  }
  function showToast() {
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  }
  function deleteHandler(bookingId) {
    if (onDelete) {
      onDelete(bookingId);
      setToastMessage("Reservation Cancelled Successfully!");
      setToastColor("#28a745");
      showToast();
    }
    Alert.alert("Your amount will be transferred \nto your account in 5 working days.")
  }
  function editHandler(){
    navigation.navigate("ReservationEdit", {data : bookingDetails})
  }

  return (
    <View style={styles.outerContainer}>
         <View style={styles.heading}>
            <Text style={styles.headingText}>Cabin {bookingDetails.cabinName}</Text>
        </View>
      {/* Image and Btns view */}
      <View style={styles.container1}>
        <Image
          source={{
            uri: bookingDetails.cabinImage,
          }}
          style={styles.imgContainer}
        />
        {/* 2 custom buttons to edit and delete */}
        <View style={styles.btnContainer}>
          <CustomButton style={styles.customBtns} onPressHandler={editHandler}>Edit</CustomButton>
          <CustomButton style={styles.customBtns} onPressHandler={() => showDeleteDialog(bookingDetails)}>Delete</CustomButton>
        </View>
      </View>
      {/* Date View */}
      <View style={styles.container2}>
        <View style={styles.dateContainer}>
          <CustomIcon icon_name="calendar" icon_size={25} color="#86a5c6">
            <Text style={styles.dateText}>{bookingDetails.stDate}</Text>
          </CustomIcon>
        </View>
        <View style={styles.dateContainer}>
          <CustomIcon icon_name="calendar" icon_size={25} color="#86a5c6">
            <Text style={styles.dateText}>{bookingDetails.edDate}</Text>
          </CustomIcon>
        </View>
      </View>
      {/* Guests and number of nights */}
      <View style={styles.container3}>
        <View style={styles.dateContainer}>
          <CustomIcon icon_name="users" icon_size={25} color="#86a5c6">
            <Text>{bookingDetails.guests} Guests</Text>
          </CustomIcon>
        </View>
        <View style={styles.dateContainer}>
          <CustomIcon icon_name="moon-o" icon_size={25} color="#86a5c6">
            <Text style={styles.dateText}>{bookingDetails.nights} Nights</Text>
          </CustomIcon>
        </View>
      </View>
      {/* Price view */}
      <View style={styles.container4}>
          <View >
            <CustomIcon icon_name="money" icon_size={25} color='#228B22'>
            <Text style={styles.dateText}>${bookingDetails.price}</Text>
            </CustomIcon>
          </View>
      </View>
      <Toast
        message={toastMessage}
        visible={toastVisible}
        backgroundColor={toastColor}
        position="top"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // styles for the containers
  outerContainer: {
    borderWidth: 3,
    borderColor: globalColors.primaryBtn,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10
  },
  container1: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  container2: {
    marginTop: 5,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 2,
    borderTopColor: "gray",
    borderBottomWidth: 2,
    borderBottomColor: "gray",
  },
  container3: {
    marginTop: 5,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "gray",
  },
  container4: {
    marginTop: 5,
    padding: 10,
    alignItems: 'flex-end',
  },
  heading: {
    borderBottomWidth: 2,
    borderBottomColor: globalColors.primaryBtn,
    alignItems: 'center',
    marginBottom: 10
  },
  btnContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
  },
  dateContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  // styles for image, custom buttons and text
  imgContainer: {
    height: 100,
    width: 100,
  },
  customBtns: {
    height: 50,
    width: 100,
    marginVertical: 5,
  },
  headingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#86a5c6'
  },
  dateText: { color: globalColors.primaryBtn, fontSize: 16 },
});
