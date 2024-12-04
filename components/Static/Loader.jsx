import {ActivityIndicator , StyleSheet, View } from "react-native"
import { globalColors } from "../../constants/colors"

export default function Loader() {
    return (
       <View style={styles.mainContainer}>
            <ActivityIndicator size="large" color={globalColors.primaryBtn} />
       </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
