import React, { useEffect, useContext } from "react";
import { StyleSheet, View, FlatList, Dimensions, Text } from "react-native";
import { CardEmployee } from "./CardEmployee";
import { AuthContext } from "../../context/AuthContext";
import { SearchBar, Tooltip } from "react-native-elements";
import { searchInJson, sortJson } from "../../function";
import { screen } from "../../styles/";
import DropDownPicker from "react-native-dropdown-picker";
import color from "../../constants/color";
import { getEmployeeApi } from "../../requestApi/";

export const ListEmployees = (refresh) => {
  const { token } = useContext(AuthContext);
  const [employees, setEmployees] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState();
  const [employeesSearch, setEmployeesSearch] = React.useState(employees);
  const [employeesSort, setEmployeesSort] = React.useState("A-Z");
  const [heightDropdown, setHeightDropdown] = React.useState(40);

  const displayEmployees = async () => {
    setLoading(true);
    getEmployeeApi(token, true)
      .then((result) => {
        setEmployees(result);
      })
  };

  useEffect(() => {
    displayEmployees();
  }, []);

  // console.log(firstName);
  useEffect(() => {
    let filtre = searchInJson(
      employees,
      ["firstName", "lastName", "mail", "tel_nb"],
      search
    );
    setEmployeesSearch(sortJson(filtre, "firstName", employeesSort));
  }, [search, employeesSort, employees]);

  useEffect(() => {
    setLoading(false);
  }, [employees]);

  useEffect(() => {
    displayEmployees();
  }, [refresh]);

  return (
    <View>
      <Tooltip
        popover={
          <Text style={{ fontStyle: "italic" }}>
            Filtrage par nom, prénom, numéro de téléphone et email
          </Text>
        }
        containerStyle={styles.tooltip}
      >
        <SearchBar
          placeholder="Rechercher"
          onChangeText={setSearch}
          value={search}
          inputContainerStyle={screen.searchBarInputContainerStyle}
          containerStyle={screen.searchBarContainerStyle}
        />
      </Tooltip>
      <View style={{ margin: 10, alignSelf: "center", height: heightDropdown }}>
        <DropDownPicker
          onChangeItem={(item) => setEmployeesSort(item.value)}
          items={[
            { value: "A-Z", label: "A-Z" },
            { value: "Z-A", label: "Z-A" },
          ]}
          value={employeesSort}
          placeholder="Trier"
          containerStyle={{ height: 40, width: 120 }}
          style={{ backgroundColor: color.COLORS.DEFAULT }}
          dropDownStyle={{ backgroundColor: color.COLORS.DEFAULT }}
          onOpen={() => { setHeightDropdown(120) }}
          onClose={() => setHeightDropdown(40)}
        />
      </View>
      <FlatList
        data={employeesSearch}
        style={{ height: Dimensions.get("window").height - 275 }}
        refreshing={loading}
        onRefresh={() => displayEmployees()}
        renderItem={({ item }) => (
          <CardEmployee item={item} refreshEmployee={displayEmployees} />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tooltip: {
    width: 150,
    height: 70,
    backgroundColor: "#999999",
  },
});
