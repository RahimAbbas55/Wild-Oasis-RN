import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { getCabins } from "../data/data-service";
import { globalColors } from "../constants/colors";
import CabinRow from "../components/UI/CabinRow";
import Loader from "../components/Static/Loader";

export default function AllCabins({ navigation }) {
  const [allCabins, setAllCabins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  function onPressDetail(cabinId) {
    navigation.navigate("CabinDetail", { cabinId });
  }
  useEffect(() => {
    async function fetchAllCabins() {
      try {
        setIsLoading(true);
        const cabins = await getCabins();
        setAllCabins(cabins);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAllCabins();
  }, []);
  return (
    <View style={styles.outerContiner}>
      <Text style={styles.headingText}>Explore Our Luxury Cabins</Text>
      <Image source={{ uri: allCabins[0]?.image }} />
      {isLoading ? (
        <Loader/>
      ) : (
        <FlatList
          data={allCabins}
          keyExtractor={(item) => item.cabinId}
          renderItem={({ item }) => (
            <CabinRow data={item} onPressHandler={onPressDetail} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContiner: {
    flex: 1,
    backgroundColor: globalColors.backgroundMain,
    padding: 10,
  },
  headingText: {
    fontSize: 22,
    color: globalColors.primaryBtn,
    textDecorationLine: "underline",
    textAlign: "center",
    marginTop: 10,
  },
  cabinItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
