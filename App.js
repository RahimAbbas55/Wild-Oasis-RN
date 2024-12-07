import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import { globalColors } from "./constants/colors";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { supabase } from "./data/supabase";
import { storeToken } from "./data/data-service";
import { StripeProvider } from '@stripe/stripe-react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import WelcomeLogin from "./screens/WelcomeLogin";
import Homepage from "./screens/Homepage";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import AllCabins from "./screens/AllCabins";
import CabinDetail from "./screens/CabinDetail";
import ReservationForm from "./screens/ReservationForm";
import ThankYou from './screens/ThankYou'
import AboutUs from "./screens/AboutUs";
import Logout from "./screens/Logout";
import MyReservations from "./screens/MyReservations";
import EditReservation from "./screens/EditReservation"

const stack = createStackNavigator();
const drawer = createDrawerNavigator()

function DrawerNavigation({ route }) {
  const { user_session } = route.params
  return (
    <drawer.Navigator
      initialRouteName="homepage"
      screenOptions={{
        drawerStyle: {
          backgroundColor: globalColors.backgroundMain,
          width: 250,
          borderWidth: 1,
          borderColor: '#D3D3D3',
        },
        drawerLabelStyle: {
          color: globalColors.primaryBtn,
        },
      }}
    >
      <drawer.Screen
        name="Home Page"
        component={Homepage}
        options={{
          headerStyle: { backgroundColor: globalColors.backgroundMain },
          headerTintColor: globalColors.primaryBtn,
          headerTitle: "Home Page",
          headerTitleAlign: "center",
        }}
      />
      <drawer.Screen
        name="My Reservation"
        component={MyReservations}
        options={{
          headerStyle: { backgroundColor: globalColors.backgroundMain },
          headerTintColor: globalColors.primaryBtn,
          headerTitle: "My Reservations",
          headerTitleAlign: "center",
        }}
        initialParams={{ data : user_session }}
      />
      <drawer.Screen
        name="About Us"
        component={AboutUs}
        options={{
          headerStyle: { backgroundColor: globalColors.backgroundMain },
          headerTintColor: globalColors.primaryBtn,
          headerTitleAlign: "center",
        }}
      />
      <drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          headerStyle: { backgroundColor: globalColors.backgroundMain },
          headerTintColor: globalColors.primaryBtn,
          headerTitle: "Logout",
          headerTitleAlign: "center",
        }}
      />
    </drawer.Navigator>
  );
}


export default function App() {
  const [session, setSession] = useState(null);
  // useEffect to check if the session exists
  useEffect(() => {
    const checkSession = async () => {
      const { data : { session }} = await supabase.auth.getSession()
      setSession(session)
    }
    checkSession()
    const { data : authListner } = supabase.auth.onAuthStateChange(
      ( _event , session ) => {
        setSession(session)
        const userSession = session?.access_token
        if ( userSession ) storeToken(userSession)
        else AsyncStorage.removeItem('jwtToken')
      }
    )

    return () => { authListner.subscription.unsubscribe()}
  } , []);

  return (
    <StripeProvider publishableKey={process.env.STRIPE_KEY}>
      <StatusBar style="light" />
      <NavigationContainer>
        <stack.Navigator initialRouteName={session ? "Drawer" : "Login/Signup"}>
          {!session ? (
            <>
              <stack.Screen
                name="Login/Signup"
                component={WelcomeLogin}
                options={{
                  headerStyle: { backgroundColor: globalColors.backgroundMain },
                  headerTintColor: globalColors.primaryBtn,
                  headerTitleAlign: "center",
                  headerShown: false,
                  swipeEnabled: false,
                }}
              />
              <stack.Screen
                name="login"
                component={Login}
                options={{
                  headerStyle: { backgroundColor: globalColors.backgroundMain },
                  headerTitle: "Login",
                  headerTintColor: globalColors.primaryBtn,
                  headerTitleAlign: "center",
                  headerBackTitle: "Back",
                }}
              />
              <stack.Screen
                name="signup"
                component={SignUp}
                options={{
                  headerStyle: { backgroundColor: globalColors.backgroundMain },
                  headerTitle: "Sign Up",
                  headerTintColor: globalColors.primaryBtn,
                  headerTitleAlign: "center",
                  headerBackTitle: "Back",
                }}
              />
            </>
          ) : (
            <>
              <stack.Screen
                name="Drawer"
                component={DrawerNavigation}
                options={{ headerShown: false }}
                initialParams={{ user_session : session }}
              />
              <stack.Screen
                name="HomePage"
                component={Homepage}
                options={{
                  headerStyle: { backgroundColor: globalColors.backgroundMain },
                  headerTintColor: globalColors.primaryBtn,
                  headerTitle: "Home Page",
                  headerTitleAlign: "center",
                }}
              />
              <stack.Screen
                name="Cabins"
                component={AllCabins}
                options={{
                  headerTitle: "All Cabins",
                  headerStyle: { backgroundColor: globalColors.backgroundMain },
                  headerTintColor: globalColors.primaryBtn,
                  headerBackTitle: "Back",
                }}
              />
              <stack.Screen
                name="CabinDetail"
                component={CabinDetail}
                options={{
                  headerTitle: "Cabin Details",
                  headerStyle: { backgroundColor: globalColors.backgroundMain },
                  headerTintColor: globalColors.primaryBtn,
                  headerBackTitle: "Back",
                }}
                initialParams={{ email : session?.user?.email}}
              />
              <stack.Screen
                name="CabinReservation"
                component={ReservationForm}
                options={{
                  headerTitle: "Cabin Reservation",
                  headerStyle: { backgroundColor: globalColors.backgroundMain },
                  headerTintColor: globalColors.primaryBtn,
                  headerBackTitle: "Back",
                }}
              />
              <stack.Screen
                name="ReservationEdit"
                component={EditReservation}
                options={{
                  headerTitle: "Edit Reservation",
                  headerStyle: { backgroundColor: globalColors.backgroundMain },
                  headerTintColor: globalColors.primaryBtn,
                  headerBackTitle: "Back",
                }}
              />
               <stack.Screen
                name="ThankYou"
                component={ThankYou}
                options={{
                  headerShown: false,
                  headerLeft: () => null,
                }}
              />
            </>
          )}
        </stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
}
