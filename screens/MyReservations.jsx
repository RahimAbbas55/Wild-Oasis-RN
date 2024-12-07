import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  deleteUserBooking,
  getLoggedInUserData,
  getUserBooking,
} from "../data/data-service";
import { fetchCabins } from "../data/util";
import { globalColors } from "../constants/colors";
import ReservationCard from "../components/UI/ReservationCard";
import Loader from "../components/Static/Loader";
import { FlatList } from "react-native";

const combineData = (cabinData, bookingData) => {
  if (cabinData && Array.isArray(bookingData)) {
    const data = bookingData.map(booking => {
      const cabin = cabinData.find(cabin => cabin.cabinId === booking.cabinId);
      return {
        bookingId: booking.id,
        cabinName: cabin ? cabin.name : '',
        cabinImage: cabin ? cabin.image : '',
        stDate: booking.startDate.slice(0 , 10),
        edDate: booking.endDate.slice(0 , 10),
        nights: booking.noOfNights,
        guests: booking.noOfGuests,
        price: booking.totalPrice,
        info: booking.observations
      };
    });
    return data;
  }
  return []; // Return an empty array if data is not available
};

export default function MyReservations({ navigation , route }) {
  const [userData, setUserData] = useState({});
  const [bookingData, setBookingData] = useState([]); // Ensure this is initialized as an array
  const [cabinDetails, setCabinDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data } = route.params;

  // Retrieve user information
  useEffect(() => {
    async function fetchUser() {
      try {
        setIsLoading(true);
        const user = await getLoggedInUserData(data.user.email);
        setUserData(user);
      } catch (error) {
        console.log("useEffect of user!", error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, [data.user.email]);

  // Retrieve user bookings
  useEffect(() => {
    async function fetchBookings() {
      if (userData.userId) {
        try {
          setIsLoading(true);
          const data = await getUserBooking(userData.userId);
          setBookingData(data || []);
        } catch (error) {
          console.log("Use Effect of booking!", error.message);
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchBookings();
  }, [userData]);

  // Retrieve cabin details
  useEffect(() => {
    async function fetchUniqueCabins() {
      if (bookingData.length > 0) {
        try {
          setIsLoading(true);
          const data = await fetchCabins(bookingData);
          setCabinDetails(data);
        } catch (error) {
          console.log('useEffect of cabins!', error.message);
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchUniqueCabins();
  }, [bookingData]);

  // Combine booking and cabin data
  const combinedData = combineData(cabinDetails, bookingData);
  
  const handleDeleteReservation = async (bookingId) => {
    try {
      await deleteUserBooking(bookingId); 
      setBookingData(prevBookings => prevBookings.filter(booking => booking.id !== bookingId)); 
    } catch (error) {
      console.log("Error deleting reservation:", error);
      Alert.alert("Error", "Could not delete the reservation. Please try again.");
    }
  };

  return (
    <View style={styles.outerContainer}>
      {
        isLoading ? (
          <Loader />
        ) : (
          combinedData.length > 0 ? (
            <FlatList 
            data={combinedData}
            keyExtractor={( item ) => item.bookingId}
            renderItem={({item}) => (
              <ReservationCard bookingDetails={item} onDelete={handleDeleteReservation} navigation={navigation}/>
            )}
          />
          ) : (
            <Text style={styles.errorText}>No bookings found.</Text>
          )
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: globalColors.backgroundMain,
    padding: 20,
    flex: 1,
  },
  errorText: {
    fontSize: 30,
    color: globalColors.primaryBtn,
    textAlign: 'center',
    alignItems: 'center'
  }
});
