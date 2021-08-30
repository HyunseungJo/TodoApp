import React,{useState} from 'react';
import { StyleSheet, Text, View,StatusBar,TextInput,Dimensions, ScrollView } from 'react-native';
import ToDo from "./ToDo"
const {height,width} =Dimensions.get("window")

export default function App() {
  const [newtodo,setNewtodo]=useState("")
  const controlNewtodo = text =>{
    setNewtodo(text)
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Kawai to do</Text>
      <View style={styles.card}>
        <TextInput 
        style={styles.input} 
        placeholder={"New To do"}
        value={newtodo}
        onChangeText={controlNewtodo}
        placeholderTextColor={"#999"}
        returnKeyType={"done"}
        autoCorrect={false}
        />
        <ScrollView contentContainerStyle={styles.toDos}>
          <ToDo/>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center',
  },
  title:{
    color:"white",
    fontSize:30,
    marginTop:50,
    fontWeight:"200",
    marginBottom:30
  },
  card:{
    backgroundColor:"white",
    flex:1,
    width:width-25,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    shadowColor:"rgb(50,50,50)",
    shadowRadius:5,
    shadowOpacity:0.5,
    shadowOffset:{
      height:-1,
      width:0
    }
  },
  input:{
    padding:20,
    borderBottomColor:"#bbb",
    borderBottomWidth:1,
    fontSize:25
  },
  toDos:{
    alignItems:"center"
  }
});
