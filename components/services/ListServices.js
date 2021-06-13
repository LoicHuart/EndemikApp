import React, { useEffect, useContext } from "react";
import { Text, View, FlatList } from "react-native";
import { CardService } from "./CardService";
import { AuthContext } from "../../context/AuthContext";
import { SearchBar } from "react-native-elements";
import color from "../../constants/color";
import { searchInJson, sortJson } from "../../function";
import { screen } from "../../styles/";
import DropDownPicker from "react-native-dropdown-picker";
import { getServiceApi } from "../../requestApi/";

export const ListServices = ({ refresh }) => {
  const { token } = useContext(AuthContext);
  const [services, setServices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState();
  const [servicesSearch, setServicesSearch] = React.useState(services);
  const [servicesSort, setServicesSort] = React.useState("A-Z");
  const [heightDropdown, setHeightDropdown] = React.useState(40);

  const displayServices = async () => {
    setLoading(true);
    getServiceApi(token, true)
      .then((result) => {
        setServices(result);
      })
  };

  useEffect(() => {
    displayServices();
  }, []);

  useEffect(() => {
    let test = searchInJson(services, ["name", "id_manager.firstName"], search);
    setServicesSearch(sortJson(test, "name", servicesSort));
  }, [search, servicesSort, services]);

  useEffect(() => {
    setLoading(false);
  }, [services]);

  useEffect(() => {
    displayServices();
  }, [refresh]);

  return (
    <>
      <SearchBar
        placeholder="Rechercher"
        onChangeText={setSearch}
        value={search}
        inputContainerStyle={screen.searchBarInputContainerStyle}
        containerStyle={screen.searchBarContainerStyle}
      />

      <View style={{ margin: 10, alignSelf: "center", height: heightDropdown }}>
        <DropDownPicker
          onChangeItem={(item) => setServicesSort(item.value)}
          items={[
            { value: "A-Z", label: "A-Z" },
            { value: "Z-A", label: "Z-A" },
          ]}
          value={servicesSort}
          placeholder="Trier"
          containerStyle={{ height: 40, width: 120 }}
          style={{ backgroundColor: color.COLORS.DEFAULT }}
          dropDownStyle={{ backgroundColor: color.COLORS.DEFAULT }}
          onOpen={() => { setHeightDropdown(120) }}
          onClose={() => setHeightDropdown(40)}
        />
      </View>

      <FlatList
        data={servicesSearch}
        ListEmptyComponent={() => <Text style={screen.h1}>Aucun résultat</Text>}
        refreshing={loading}
        onRefresh={() => displayServices()}
        renderItem={({ item }) => (
          <CardService item={item} refreshService={displayServices} />
        )}
        keyExtractor={(item) => item._id}
      />
    </>
  );
};