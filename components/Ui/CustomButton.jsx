import { Pressable, StyleSheet, Text, View } from "react-native";
import { globalColors } from "../../constants/colors";

export default function CustomButton({
  children,
  onPressHandler,
  mode,
  style,
}) {
  return (
    <View style={[styles.outerContainer, style]}>
      <Pressable onPress={onPressHandler} android_ripple='true' style={({ pressed }) => [
        pressed && styles.pressed
      ]}>
        <View>
          <Text style={styles.text}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: 6,
    padding: 12, 
    backgroundColor: globalColors.primaryBtn,
    width: 150, 
    height: 50, 
    justifyContent: 'center',
    alignItems: 'center', 
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: 'white'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    textAlign: 'center'
  },
  pressed: {
    opacity: 0.75
  }
});
