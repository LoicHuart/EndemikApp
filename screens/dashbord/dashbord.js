import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, FlatList,ScrollView } from "react-native";
import { Button, Icon } from "react-native-elements";
import { dashbaord } from "../../styles/dashbaord";
import { HeaderCustom, ListHolidays } from "../../components/";
import { Card } from "../../components/Card";
import color from "../../constants/color";


import { AuthContext } from "../../context/AuthContext";

export const dashbord = ({ navigation, gestion }) => {
  const { signOut, user, token } = useContext(AuthContext);
  const [hollidays, setHollidays] = useState(null);
  const [hollidayWaiting, setHollidayWaiting] = useState();
  const [hollidayAccept, setHollidayAccept] = useState();


  const Pendingholliday = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      const resp = await fetch(
        `http://${process.env.REACT_APP_API_HOST}/api/holidays/user/${user._id}`,
        requestOptions
      );
      const respJSON = await resp.json();
      

      if (!resp.ok) {
        console.log("not ok");
        console.log(resp);
      }
      setHollidays(respJSON);

      let allWaiting = 0
      let allAccept = 0
      hollidays.forEach(holliday => {
        if(holliday.status == "en attente"){
          allWaiting += 1 
        }
        if(holliday.status == "prevalidé" || holliday.status == "validé"){
          allAccept += 1 
        }
      });
      setHollidayWaiting(allWaiting)
      setHollidayAccept(allAccept)

    } catch (e) {
      console.log(e);
    }
  };


  useEffect(( ) => {
    Pendingholliday()
  }, [])

  return (
    
    <View style={{ flex: 1 }}>
      <HeaderCustom navigation={navigation} />
      <ScrollView>
      <View style={{flexDirection: "row",    alignItems: "center", justifyContent: "center" }}>
            <Card >
              <Text style={{fontSize:11,align: "left"}}>Demande de congés en attente</Text>   
              <View style={{flexDirection: "row",  alignItems: "center", justifyContent: "center"}}>
                <Text style={{fontSize:50}}>{hollidayWaiting}</Text>
                  <View style={{borderRadius:100, backgroundColor:"orange", padding:15, margin:10}} >
                    <Icon
                        name="hourglass-half"
                        type="font-awesome-5"
                        color="white"
                        style={{ width:30}}
                      />
                  </View> 
              </View> 
            </Card>
          <Card>
            <Text style={{fontSize:11,align: "left"}}>Demande de congés traitées</Text>   
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
              <Text style={{fontSize:50}}>{hollidayAccept}</Text>
                <View style={{borderRadius:100, backgroundColor:"limegreen", padding:15, margin:10}} >
                  <Icon
                      name="check"
                      type="font-awesome-5"
                      color="white"
                      style={{ width:30}}
                    />
                </View>
            </View>
          </Card>
      </View>
      <Card >
          <ListHolidays third={true} token={token} user={user} noTouch={true} status={["en attente", "prévalidé", "annulé", "validé", "refusé"]}/>
      </Card>
      <Button onPress={signOut} title='Logout'/>
      </ScrollView>
    </View>
    
  );
};

const styles = StyleSheet.create({
});

            {/* <FlatList
            data={hollidays}
            ListEmptyComponent={() => (
              <View style={{ alignItems: "center" }}>
                <Text style={{ margin: 10 }}>
                  Vous n'avez pas encore de demandes
                </Text>
                <Text style={{ color: color.COLORS.GREY }}>
                  Balayez vers le bas pour actualiser
                </Text>
                <Icon
                  name="angle-double-down"
                  type="font-awesome-5"
                  color={color.COLORS.GREY}
                />
              </View>
            )}
            refreshing={loading}
            onRefresh={() => displayHolidays()}
            renderItem={({ item }) => (
              <CardHoliday
              item={item}
              gestion={gestion}
              refreshHolidays={Pendingholliday}
            />
             )}
            keyExtractor={(item) => item._id}
          />
          <Icon
            name="plus-circle"
            type="font-awesome-5"
            color="grey"
            style={{ width:30, marginBottom:20}}
          /> */}