import React, { useEffect } from "react";
import { Text, FlatList } from "react-native";
import { CardHolidayEmployee } from "./CardHolidayEmployee";
import { CardHolidayRh } from "./CardHolidayRh";
import { CardHolidayManager } from "./CardHolidayManager";
import { CardHolidayNoTouch } from "./CardHolidayNoTouch";
import { screen } from "../../styles/";
import {
  getHolidaysApi,
  getHolidaysByUserApi,
  getHolidaysByServiceApi,
} from "../../requestApi/";

export const ListHolidays = ({
  user,
  status,
  token,
  gestionRole,
  service,
  noTouch,
}) => {
  const [holidays, setHolidays] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const displayHolidays = async () => {
    setLoading(true);
    if (service === undefined) {
      if (user === undefined) {
        getHolidaysApi(token, status).then((result) => setHolidays(result));
      } else {
        getHolidaysByUserApi(token, user._id, status).then((result) =>
          setHolidays(result)
        );
      }
    } else {
      getHolidaysByServiceApi(token, status).then((result) =>
        setHolidays(result)
      );
    }
  };

  useEffect(() => {
    displayHolidays(status);
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [holidays]);

  return (
    <>
      <FlatList
        data={holidays}
        ListEmptyComponent={() => <Text style={screen.h1}>Aucun résultat</Text>}
        refreshing={loading}
        onRefresh={() => displayHolidays()}
        renderItem={({ item }) => {
          switch (gestionRole) {
            case "manager":
              if (noTouch) {
                return (
                  <CardHolidayNoTouch
                    item={item}
                    refreshHolidays={displayHolidays}
                  />
                );
              }
              return (
                <CardHolidayManager
                  item={item}
                  refreshHolidays={displayHolidays}
                />
              );
            case "rh":
              if (noTouch) {
                return (
                  <CardHolidayNoTouch
                    item={item}
                    refreshHolidays={displayHolidays}
                  />
                );
              }
              return (
                <CardHolidayRh item={item} refreshHolidays={displayHolidays} />
              );
            case "DEV":
              if (noTouch) {
                return (
                  <CardHolidayNoTouch
                    item={item}
                    refreshHolidays={displayHolidays}
                  />
                );
              }
              return (
                <CardHolidayRh item={item} refreshHolidays={displayHolidays} />
              );
            case undefined:
              if (noTouch) {
                return (
                  <CardHolidayNoTouch
                    item={item}
                    refreshHolidays={displayHolidays}
                  />
                );
              }
              return (
                <CardHolidayEmployee item={item} refreshHolidays={displayHolidays} />
              );
          }
        }}
        keyExtractor={(item) => item._id}
      />
    </>
  );
};
