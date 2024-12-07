import { StyleSheet, View, Text } from 'react-native';
import { globalColors } from '../constants/colors';
import { signoutUser } from '../data/data-service';
import CustomButton from '../components/UI/CustomButton';

export default function Logout() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>😢</Text>
        <Text style={styles.text}>Leaving Soo Soon....</Text>
      <CustomButton onPressHandler={signoutUser}>Logout</CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  
    alignItems: 'center',      
    backgroundColor: globalColors.backgroundMain,
  },
  emoji: {
    fontSize: 100,              
    marginBottom: 20,          
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: globalColors.primaryBtn,
    marginBottom: 20
  }
});

