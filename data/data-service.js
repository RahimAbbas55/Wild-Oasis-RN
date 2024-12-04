import { supabase } from "./supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

//user signup
export const signUp = async ( email, password , username) => {
  const { user , error } = await supabase.auth.signUp({
    email : email,
    password : password
  })
  if ( error ) console.log("My error message" , error.message)
  else {
    createUser(email , password , username)
  }
};

//user login
export const signInUser = async (email, password) => {
  let status = false;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    status = false
  } 
  else {
    const userDataFromTable = getUser(email);
    const authEmail = data.session.user.email;
    if ( userDataFromTable === authEmail )
    {
      const jwtToken = data.session.access_token;
      if (jwtToken) {
        await storeToken(jwtToken);
      }
    }
    status = true
  }
  return status;
};

//add user in Users table
const createUser = async ( email , password , username ) => {
  const { data , error } = await supabase.from('Users').insert([
    { email , username , password}
  ])
  if ( error ) console.log('Error adding user to the Users Table' , error.message)
  else console.log('User added to the table successfully');
}

// get logged in user data
export const getLoggedInUserData = async ( email ) => {
  let userData;
  const { data , error } = await supabase.from('Users').select('*').eq('email' , email)
  if ( data ){
    userData = {
      userId : data[0].id,
      userEmail : data[0].email,
      userUsername : data[0].username,
    }
  }
  return userData;
}

//user logout
export const signoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if ( error ) console.log('Logout Error' , error.message)
  else {
    await AsyncStorage.removeItem('jwtToken');
  }
}

//utility functions for session management
//getting session token
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('jwtToken')
    return token
  } catch (error) {
    console.log('Error retrieving the token' , error.message)
  }
}

//storing session token
export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('jwtToken' , token)
    // console.log('Token stored successfully')
  } catch (error) {
    console.log('Error setting token.' , error.message)
  }
}

//get all cabins
export const getCabins = async function () {
  const { data, error } = await supabase
    .from("Cabins")
    .select("cabinId, name, maxCapacity, regularPrice, discount, image")
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
};

//get specific cabins from their id
export async function getCabin(id) {
  const { data, error } = await supabase
    .from("Cabins")
    .select("*")
    .eq("cabinId", id)
    .single();

  if (error) {
    console.error('in me' , error);
  }

  return data;
}

export const bookCabins = async (newBooking) => {
  // Proceed with inserting the new booking
  const { data, error } = await supabase.from("Bookings").insert([newBooking]);
  if (error) return 'error';

  return 'success';
};

export const checkExistingBookings = async (newBooking) => {
  const { startDate, endDate, cabinId } = newBooking;
  const { data: existingBookings, error: queryError } = await supabase
    .from("Bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .or(
      `and(startDate.lte.${endDate},endDate.gte.${startDate})`
    );

  if (queryError) return 'error';

  // Check if any existing bookings overlap with the new booking
  if (existingBookings.length > 0) {
    return 'Cabin is already booked for the selected dates.';
  }

  return 'success';
};

export const getUserBooking = async ( id ) => {
  const { data , error } = await supabase.from('Bookings').select('*').eq('user_id' , id);
  if ( error ) {
    console.log('Error getting details' , error.message)
    return 'fail'
  }
  return data
}

export const deleteUserBooking = async ( id ) => {
  const { data , error } = await supabase.from('Bookings').delete().eq('id' , id);
  if ( error ) throw new Error(`Error deleting reservation.${error.message}`);
}

export const updateBooking = async ( bookingData ) => {
  const { data , error } = await supabase.from('Bookings').update(bookingData).eq('id' , bookingData.id)
  if ( error ) throw new Error("Can not update the booking. Sorry!")
}