import React, { useEffect, useContext } from "react";
import { StyleSheet, View, FlatList, Dimensions } from "react-native";
import { CardEmployee } from "./CardEmployee";
import { AuthContext } from "../../context/AuthContext";
import { SearchBar } from "react-native-elements";
import { searchInJson, sortJson } from "../../function";
import { screen } from "../../styles/";
import DropDownPicker from "react-native-dropdown-picker";

import color from "../../constants/color";

export const ListEmployees = (refresh) => {
  const { token } = useContext(AuthContext);
  const [employees, setEmployees] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState();
  const [employeesSearch, setEmployeesSearch] = React.useState(employees);
  const [employeesSort, setEmployeesSort] = React.useState("A-Z");

  const displayEmployees = async () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var raw = "";

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const resp = await fetch(
        `http://${process.env.REACT_APP_API_HOST}/api/employees?populate=1`,
        requestOptions
      );

      const respJSON = await resp.json();

      if (!resp.ok) {
        console.log("error");
        console.log(resp);
      }
      setEmployees(respJSON);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    displayEmployees();
  }, []);

  // console.log(firstName);
  useEffect(() => {
    let test = searchInJson(
      employees,
      ["firstName", "lastName", "mail", "tel_nb"],
      search
    );
    setEmployeesSearch(sortJson(test, "firstName", employeesSort));
  }, [search, employeesSort, employees]);

  useEffect(() => {
    setLoading(false);
  }, [employees]);

  useEffect(() => {
    displayEmployees();
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

      <View style={{ margin: 10, alignSelf: "center" }}>
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
        />
      </View>
      <FlatList
        data={employeesSearch}
        style={{ height: Dimensions.get("window").height - 150 }}
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

const styles = StyleSheet.create({});
