import React, { useEffect, useContext } from "react"
import { StyleSheet, Text, View, FlatList } from "react-native"
import { Dimensions} from 'react-native'
import { CardService } from "./CardService"
import { AuthContext } from "../../context/AuthContext";
import { SearchBar } from "react-native-elements";
import color from "../../constants/color";
import { searchInJson, sortJson } from "../../function"
import { screen } from "../../styles/";
import DropDownPicker from "react-native-dropdown-picker";

export const ListServices = ({refresh}) => {
  const { token } = useContext(AuthContext);
  const [services, setServices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState();
  const [servicesSearch, setServicesSearch] = React.useState(services);
  const [servicesSort, setServicesSort] = React.useState('A-Z');

  const displayServices = async () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `http://${process.env.REACT_APP_API_HOST}/api/services?populate=1`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result)
        setServices(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    displayServices();
  }, []);

  useEffect(() => {
    let test = searchInJson(services,['name','id_manager.firstName'],search)
    setServicesSearch(sortJson(test,'name',servicesSort))
  }, [search, servicesSort,services]);

  useEffect(() => {
    setLoading(false);
  }, [services]);

  useEffect(() => {
    displayServices()
  }, [refresh]);

  return (
    <View>

      <SearchBar
        placeholder="Rechercher"
        onChangeText={setSearch}
        value={search}
        inputContainerStyle={screen.searchBarInputContainerStyle}
        containerStyle={screen.searchBarContainerStyle}
      />

      <View style={{ margin: 10, alignSelf:"center" }}>
        <DropDownPicker
          onChangeItem={(item) => setServicesSort(item.value)}
          items={[{ value: 'A-Z', label: 'A-Z' },{ value: 'Z-A', label: 'Z-A' }]}
          value={servicesSort}
          placeholder="Trier"
          containerStyle={{ height: 40, width:120}}
          style={{ backgroundColor: color.COLORS.DEFAULT }}
          dropDownStyle={{ backgroundColor: color.COLORS.DEFAULT }}
        />
      </View>


      <FlatList
        data={servicesSearch}
        ListEmptyComponent={() => <Text style={screen.h1}>Aucun résultat</Text>}
        refreshing={loading}
        onRefresh={() => displayServices()}
        renderItem={({ item }) => <CardService item={item} refreshService={displayServices}/>}
        keyExtractor={(item) => item._id}
        style={{height:Dimensions.get('window').height-275}}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
