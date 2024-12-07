import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { globalColors } from "../constants/colors";
import CustomButton from '../components/UI/CustomButton';
export default function ThankYou({ navigation }) {
    const confettiRefLeft = React.useRef(null);
    const confettiRefRight = React.useRef(null);
    useEffect(() => {
        if (confettiRefLeft.current) {
            confettiRefLeft.current.start();
        }
        if (confettiRefRight.current) {
            confettiRefRight.current.start();
        }
    }, []);

    function returnToHomepage(){
        navigation.navigate("Drawer")
    }
    return (
        <View style={styles.outerContainer}>
            <ConfettiCannon
                ref={confettiRefLeft}
                count={100}
                origin={{ x: 0, y: 0 }}
            />
            
            <ConfettiCannon
                ref={confettiRefRight}
                count={100}
                origin={{ x: 400, y: 0 }}
            />
            <Text style={styles.text}>Thank you for your booking!</Text>
            <Text style={styles.text}>We await your visit to our cabins!</Text>
            <CustomButton style={styles.btn} onPressHandler={returnToHomepage}>
                Return to Homepage
            </CustomButton>
        </View>
    );
}
const styles = StyleSheet.create({
    outerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' , backgroundColor: globalColors.backgroundMain},
    text : { fontSize: 24, marginTop: 20 ,marginBottom: 20 , color: globalColors.primaryBtn},
    btn: { width: 200 , marginTop: 20}
})