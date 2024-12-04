import { StyleSheet, Text, View } from "react-native";
import { globalColors } from "../../constants/colors";
import Icon from 'react-native-vector-icons/FontAwesome';
export default function CustomIcon({children , icon_name , icon_size , color}) {
    return (
        <View style={styles.container}>
            <Icon name={icon_name} size={icon_size} color={color}/>
            <Text style={styles.iconText}>
                {children}
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 6,
        flexDirection: 'row',
        marginVertical: 4,
        marginHorizontal: 4
    },
    iconText: {
        color: globalColors.primaryBtn,
        fontSize: 16,
        marginHorizontal: 6,
        marginLeft: 10,
    }
})
