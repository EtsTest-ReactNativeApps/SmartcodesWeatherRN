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
    StatusBar, FlatList, Dimensions, Image,
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
function Item({ city }) {
    return (
        <>
            <Text style={{ width : 10}}>&nbsp;</Text>
            <View style={{ backgroundColor : "#0fabbc" , elevation : 5 , borderRadius : 15 , display : 'flex' , flexDirection : "column" , width : (DEVICE_WIDTH - 20) , height : "90%" , justifyContent : "center" , alignItems : "center" }}>

                <View style={{ flex : 3 , flexDirection : "row", width : "100%" , justifyContent : "center" }}>
                    <View style={{ flexDirection : "row", width : "100%" , justifyContent : "space-around" , alignItems : "center"}}>
                        <View style={{ flexDirection : "column" }}>
                            <Text style={{ fontWeight : "bold" , fontSize : 24}}>{ city.name }</Text>
                            <Text style={{ fontWeight : "bold" , fontSize : 48 }}>{ city.main.temp } °C</Text>
                            <Text style={{  }}>Feels Like { city.main.feels_like }°C</Text>
                        </View>
                        <View style={{ flexDirection : "column" }}>
                            {/*<Text> {  city.weather[0].icon }</Text>*/}
                            <Image
                                style = {{width: 100,height: 100, resizeMode : 'contain' }}
                                source={{
                                    uri: 'http://openweathermap.org/img/wn/'+ city.weather[0].icon + '@2x.png'
                                }}
                            />
                            <Text style={{ textTransform : "capitalize" , textAlign : "center"}}>{ city.weather[0].description }</Text>
                        </View>
                    </View>
                </View>
                <View  style={{  flex : 1 , padding : 10 , flexDirection : "row" , width : "100%" , justifyContent : "space-around" , backgroundColor : "#12cad6" , elevation : 8 , borderBottomLeftRadius : 15 , borderBottomRightRadius : 15}}>
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
            <Text style={{ width : 10}}>&nbsp;</Text>
        </>

    );
}

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

const App: () => React$Node = () => {


    const [citiesData, setCitiesData] = useState(
        []
    );
    const [loopHack, setLoopHack] = useState(
        0
    );

    function getCities() {
        return fetch( 'https://api.openweathermap.org/data/2.5/group?id=160263,160196,161325,152224,159071,161290,153209,154380,160961,157738&units=metric&appid=555bafb41217b157a36e3e6e0c2c3174', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.list);

                setCitiesData(responseJson.list);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(()=>{


        (async () => {getCities()})();
      // alert("Lets Goo!");
    } , [ loopHack ] );


  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ backgroundColor : '#e4f9ff' }}>
          <View style={{width: '100%' , height: '10%' }}>
              <Text style={{ textAlign : "center" , padding : 5 , fontWeight : "bold" , fontSize : 26}}>
                  Smartcodes Weather App
              </Text>
          </View>
              <FlatList showsHorizontalScrollIndicator={true}
                        horizontal={true}
                        snapToAlignment={"start"}
                        snapToInterval={ DEVICE_WIDTH }
                        decelerationRate={"fast"}
                        data={citiesData}
                        renderItem={({ item }) => <Item city={item} />}
                        keyExtractor={item => item.id}
                        style={{width: '100%' , height: '85%' , paddingBottom : 10}}
              />
          <View style={{width: '100%' , height: '5%' }}>
              <Text style={{ textAlign : "center" , padding : 5 }}>
                  Swipe Left / Right To Navigate
              </Text>
          </View>

      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
