import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, SafeAreaView, Button, TextInput, FlatList, View} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer, useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {useState} from "react";
import { LinearGradient } from "expo-linear-gradient";
import NumericInput from 'react-native-numeric-input'
import Ionicons from "react-native-vector-icons/Ionicons";






const HomeView = () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [listMovies, setListMovies] = useState([{ id: 0, title: "Spider-Man : No Way Home", rate: 5, desc: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression." },{ id: 1, title: "Venom : Let There Be Carnage", rate: 3, desc: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression." }]);



    const addElement = ({title,rate,desc}) => {
        setListMovies((current) => [...current, { id: current.length, title:title, rate:rate, desc:desc}]);
    };


    console.log(listMovies)


    useFocusEffect(() => {
        if (!route.params.addElement) return;

        addElement(route.params.addElement);
        route.params.addElement = null;
    });

    return (


            <SafeAreaView>
                <StatusBar style="auto"></StatusBar>
                    <FlatList  keyExtractor={(item) => item.id} data={listMovies} renderItem={({ item }) => (
                        <View>
                            <LinearGradient style={customStyle.boxMovies} colors={["#D36EFF", "#A821E2"]}>
                            <Text style={customStyle.title}>{item.title}</Text>
                            <Text style={customStyle.rate}>{item.rate} ⭐️</Text>
                            <Text style={customStyle.desc} >{item.desc}</Text>
                        </LinearGradient>
                        </View>
                    )}
                    ></FlatList>
            </SafeAreaView>

    );
};






const AddItemView = () => {


    const [valueTitle, setValueTitle] = useState("");
    const [valueRate, setValueRate] = useState();
    const [valueDesc, setValueDesc] = useState("");

    const navigation = useNavigation();

    const route = useRoute();

  return(
      <SafeAreaView>
          <View>
              <LinearGradient style={customStyle.titlebox} colors={["#D36EFF", "#A821E2"]}>
                  <View style={customStyle.container}>
                  <Text style={customStyle.titlepage}>Ajouter un film a votre liste</Text>
                  </View>
              </LinearGradient>
          </View>

          <View style={{textAlign:"center", display:"flex", alignItems: "center", marginTop: 20}}>
          <TextInput
              style={customStyle.input}
              value={valueTitle}
              placeholder="Titre du film"
              onChangeText={setValueTitle}
          />

          <TextInput
              style={customStyle.input}
              value={valueDesc}
              placeholder="Avis personnel"
              onChangeText={setValueDesc}
          />
              <Text style={{marginBottom:10}}>Notes</Text>
              <NumericInput
                  value={valueRate}
                  rounded
                  valueType='real'
                  minValue={0}
                  maxValue={5}
                  onChange={setValueRate}
              />
              <Text></Text>


          <Button  title="Ajouter a la liste" onPress={() => navigation.navigate("Home", { addElement: {title: valueTitle, rate: valueRate, desc: valueDesc} })}/>

          </View>


      </SafeAreaView>
  )
}


const Tab = createBottomTabNavigator();
const App   = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, size, color }) => {
                        let iconName;
                        if (route.name == "Home") {
                            iconName = focused ? "home" : "home-outline";
                        } else if (route.name == "AddItem") {
                            iconName = focused ? "add-circle" : "add-circle-outline";
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "violet",
                    tabBarInactiveTintColor: "grey",
                })}
            >
                <Tab.Screen name="Home" component={HomeView} initialParams={{ addElement: null }}/>
                <Tab.Screen name="AddItem" component={AddItemView} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}






const customStyle = StyleSheet.create({


  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
    titlepage : {
        fontSize:20,
        color:"white",
        fontWeight : "600"
    },
    boxMovies:{
        flex:1,
        backgroundColor:"red",
        padding:20,
        marginTop:10,
    },

    button: {
      backgroundColor:"red"
    },
    title:{
        fontSize:30,
        color:"white",
        fontWeight:"700",
        marginBottom:10
    },

    rate:{
        fontSize:20,
        color:"white",
        fontWeight:"700",
        marginBottom:10
    },

    desc:{
      fontSize:15,
        color:"white",
        fontWeight:"500"
    },

    input:{
      borderBottomWidth:1,
        width:200,
        borderColor:"grey",
        marginBottom:20,
        fontSize:16,

    },
    titlebox:{
      height:100,
        marginBottom:20

    }


});

export default App;
