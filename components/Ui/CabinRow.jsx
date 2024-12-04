import { StyleSheet, View, Text, Image, Button } from "react-native";
import CustomButton from "./CustomButton";
import { globalColors } from "../../constants/colors";

export default function CabinRow({ data , onPressHandler }) {
    return (
        <View style={styles.outerContainer}>
            <Image 
                style={styles.cabinImage} 
                source={{ uri: data.image}} 
            />
            <Text style={styles.description}>Cabin {data.name}</Text>
            <CustomButton style={styles.customBtn} onPressHandler={() => onPressHandler(data.cabinId)}>Details</CustomButton>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        marginTop: 10,
        height: 110,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        marginBottom: 10,
        borderRadius: 5,
        marginHorizontal: 5
    },
    cabinImage: {
        width: 90,
        height: 85,
        marginRight: 10,
        borderColor: globalColors.primaryBtn,
        borderWidth: 2,
        borderRadius: 5,
    },
    description: {
        flex: 1,
        fontSize: 18,
        marginRight: 10,
        color: globalColors.primaryBtn
    },
    customBtn: {
        width: 100,
        height: 45,
    }
});
