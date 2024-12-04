/*
    UTILITY FILE FOR ALL THE CUSTOM HELPER FUNCTIONS
*/
import { getCabin } from "./data-service";

export const validateUsername = (username) => {
  const regex = /^[a-zA-Z]{1,25}$/;
  return ( regex.test(username) && username.length <= 25 )
};

export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validatePassword = (pass, confirmPass) => {
  return ( pass === confirmPass && pass.length > 8 );
};

export const validateArrivalDate = (dateString) => {
  // Check if the date is in the correct format YYYY-MM-DD
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    return { valid: false, message: "Invalid date format. Use YYYY-MM-DD." };
  }

  // Parse the input date
  const [year, month, day] = dateString.split("-").map(Number);
  const inputDate = new Date(year, month - 1, day); // Month is zero-indexed in JavaScript

  // Check if the date components are valid
  if (
    inputDate.getFullYear() !== year ||
    inputDate.getMonth() + 1 !== month ||
    inputDate.getDate() !== day
  ) {
    return { valid: false, message: "Invalid date values." };
  }

  // Check if the input date is in the past
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to 00:00 for comparison

  if (inputDate < today) {
    return false;
  }

  return true;
};

export const validCheckoutDate = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    return false;
  }
  return true;
};

export const getDaysBetweenDates = (startDateString, endDateString) => {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);
  const timeDifference = endDate - startDate;
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
  return Math.round(daysDifference);
};

export const fetchCabins = async (bookingData) => {
  let cabins;
  try {
    if (bookingData.length === 0) return;
    const uniqueCabinIds = [
      ...new Set(bookingData.map((booking) => booking.cabinId)),
    ];
    const cabinPromises = uniqueCabinIds.map((cabinId) => getCabin(cabinId));
    cabins = await Promise.all(cabinPromises);
  } catch (error) {
    console.log("Error fetching cabin details:", error.message);
  }
  return cabins;
};
