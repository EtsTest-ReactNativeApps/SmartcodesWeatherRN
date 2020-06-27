/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar, FlatList, Dimensions, Image, ActivityIndicator,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

// Card Item For Weather of the cities
function Item({ city }) {
    return (
        <>
            {/*Left spacing of the card*/}
            <Text style={{ width : 10}}>&nbsp;</Text>

            {/*Card itself*/}
            <View style={{
                backgroundColor : "#3949ab" ,
                elevation : 5 ,
                borderRadius : 15 ,
                display : 'flex' ,
                flexDirection : "column" ,
                width : (DEVICE_WIDTH - 20) ,
                height : "90%" ,
                justifyContent : "center" ,
                alignItems : "center" }}>

                {/*Top part of the card*/}
                <View style={{
                    flex : 3 ,
                    flexDirection : "row",
                    width : "100%" ,
                    justifyContent : "center" }}>
                    <View style={{
                        flexDirection : "row",
                        width : "100%" ,
                        justifyContent : "space-around" ,
                        alignItems : "center"}}>
                        <View style={{ flexDirection : "column" }}>
                            <Text style={{
                                color : "white" ,
                                fontWeight : "bold" ,
                                fontSize : 24}}>{ city.name }</Text>
                            <Text style={{
                                color : "white" ,
                                fontWeight : "bold" ,
                                fontSize : 48 }}>
                                { city.main.temp } °C
                            </Text>
                            <Text style={{ color : "white" ,  }}>
                                Feels Like { city.main.feels_like }°C
                            </Text>
                        </View>
                        <View style={{ flexDirection : "column" }}>
                            {/*<Text> {  city.weather[0].icon }</Text>*/}
                            <Image
                                style = {{
                                    width: 100,
                                    height: 100,
                                    resizeMode : 'contain' }}
                                source={{
                                    uri: 'http://openweathermap.org/img/wn/'+ city.weather[0].icon + '@2x.png'
                                }}
                            />
                            <Text style={{
                                color : "white" ,
                                textTransform : "capitalize" ,
                                textAlign : "center"}}>
                                { city.weather[0].description }
                                </Text>
                        </View>
                    </View>
                </View>

                {/*Bottom part of card*/}
                <View  style={{
                    flex : 1 ,
                    padding : 10 ,
                    flexDirection : "row" ,
                    width : "100%" ,
                    justifyContent : "space-around" ,
                    backgroundColor : "#8e99f3" ,
                    elevation : 8 ,
                    borderBottomLeftRadius : 15 ,
                    borderBottomRightRadius : 15}}>
                    <Text>&nbsp;</Text>
                    <View style={{ flexDirection : "column"  ,}}>
                        <Text style={{ fontWeight : "bold"}}>Humidity</Text>
                        <Text style={{ width : 10}}>&nbsp;</Text>
                        <Image
                            style = {{width: 60,height: 60, resizeMode : 'contain' }}
                            source={require('./assets/hum.png')}
                        />
                        <Text style={{ textAlign : "center" , flex : 1}}>{ city.main.humidity } %</Text>

                    </View>
                    <View style={{ flexDirection : "column" }}>
                        <Text style={{ fontWeight : "bold"}}>Pressure</Text>
                        <Text style={{ width : 10}}>&nbsp;</Text>

                        <Image
                            style = {{width: 60,height: 60, resizeMode : 'contain' }}
                            source={require('./assets/press.png')}
                        />
                        <Text style={{ textAlign : "center" ,flex : 1}}>{ city.main.pressure } hpa</Text>

                    </View>
                    <View style={{ flexDirection : "column" }}>
                        <Text style={{ fontWeight : "bold"}}>Wind Speed</Text>
                        <Text style={{ width : 10}}>&nbsp;</Text>

                        <Image
                            style = {{width: 60,height: 60, resizeMode : 'contain' }}
                            source={require('./assets/wind.png')}
                        />
                        <Text style={{ textAlign : "center" , flex : 1}}>{ city.wind.speed } Km / Hr {"\n"} { city.wind.deg } ° </Text>

                    </View>
                    <Text>&nbsp;</Text>
                </View>
            </View>

            {/*Right spacing of the card */}
            <Text style={{ width : 10}}>&nbsp;</Text>
        </>

    );
}

const App: () => React$Node = () => {


    // Holds data of cities from the API
    const [citiesData, setCitiesData] = useState(
        []
    );

    // Holds boolean flag variable for displaying loader
    const [loading, setLoading] = useState(
        true
    );
    // This is meant to stop UseEffect from having an infinite loop
    const [loopHack, setLoopHack] = useState(
        0
    );

    // Get JSON response of cities from server
    function getCities() {
        return fetch( 'https://api.openweathermap.org/data/2.5/group?id=160263,160196,161325,152224,159071,161290,153209,154380,160961,157738&units=metric&appid=555bafb41217b157a36e3e6e0c2c3174', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.list);
                setCitiesData(responseJson.list);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(()=>{

        // Get data of cities on initialization
        (async () => {getCities()})();
    } , [ loopHack ] );


  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ backgroundColor : '#ffffff' }}>

          {/*App Title */}
          <View style={{
              width: '100%' ,
              height: '10%' }}>
              <Text style={{
                  textAlign : "center" ,
                  padding : 10 ,
                  fontWeight : "bold" ,
                  fontSize : 26}}>
                  Smartcodes Weather Today
              </Text>
          </View>

          {/*Conditional rendering to hide loader after data is loaded*/}
          { loading ?

              // Show loader
              <View style={{
                  flex: 1,
                  justifyContent: "center",
                  flexDirection: "row",
                  paddingTop: 20 ,
                  height: '85%'
              }}>
                  <ActivityIndicator size="large" color="#0000ff" />
                  <Text style={{ textAlign : "center" }}> Loading Info ...</Text>
              </View>

              :

              // Show cards list
              <FlatList showsHorizontalScrollIndicator={true}
                        horizontal={true}
                        snapToAlignment={"start"}
                        snapToInterval={ DEVICE_WIDTH }
                        decelerationRate={"fast"}
                        data={citiesData}
                        renderItem={({ item }) => <Item city={item} />}
                        keyExtractor={item => item.id}
                        style={{
                            width: '100%' ,
                            height: '85%' ,
                            paddingBottom : 10}}
              />

          }

          <View style={{
              width: '100%' ,
              height: '5%' }}>
              <Text style={{
                  textAlign : "center" ,
                  padding : 5 }}>
                  Swipe Left / Right To Navigate
              </Text>
          </View>

      </SafeAreaView>
    </>
  );
};

export default App;
