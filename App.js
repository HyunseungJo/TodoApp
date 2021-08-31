import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,StatusBar,TextInput,Dimensions, ScrollView } from 'react-native';
import ToDo from "./ToDo"
import AppLoading from 'expo-app-loading';
import {v1 as uuidv1} from "uuid"
import  'react-native-get-random-values' ;  
import { bool } from 'prop-types';

const {height,width} =Dimensions.get("window")

export default function App() {
  const [newtodo,setNewtodo]=useState("")
  const [loadedToDos,setLoadedToDos]=useState(false)
  const [toDos,setToDos]=useState("")
  const controlNewtodo = text =>{
    setNewtodo(text)
  }
  const loadToDos=()=>{
    setLoadedToDos(true)
  }
  const addTodo =()=>{
    if(newtodo!==""){
      // setNewtodo("")
      const ID=uuidv1();
      const newToDoObject={
        [ID]:{
          id:ID,
          isCompleted:false,
          text:newtodo,
          createdAt:Date.now()
        }
      }
      setNewtodo("")
      const newObject={
        ...toDos,
        ...newToDoObject
      }
      setToDos(newObject)
    }
  }
  
  const deleteToDo =(id)=>{
    let newTodos = {
      ...toDos
    }
    delete newTodos[id]
    setToDos(newTodos)
  }
  
  const uncompleteToDo=(id)=>{
    const newTodos={
      ...toDos,
      [id]:{
        ...toDos[id],
        isCompleted:false
      }
    }
    setToDos(newTodos)
  }
  
  const completeToDo =(id)=>{
    const newTodos={
      ...toDos,
      [id]:{
        ...toDos[id],
        isCompleted:true
      }
    }
    setToDos(newTodos)
  }
  
  const updateToDo=(id,text)=>{
    const newTodos={
      ...toDos,
      [id]:{
        ...toDos[id],
        text:text
      }
    }
    setToDos(newTodos)
  }
  useEffect(()=>{
    loadToDos()
  },[])
  if(!loadedToDos){
    <AppLoading />
  }
  console.log(toDos)
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
        onSubmitEditing={addTodo}
        />
        <ScrollView contentContainerStyle={styles.toDos}>
          {toDos?Object.values(toDos).reverse().map(toDo=>
          <ToDo key={toDo.id} 
          deleteToDo={deleteToDo}
          uncompleteToDo={uncompleteToDo}
          completeToDo={completeToDo}
          updateToDo={updateToDo}
          {...toDo}
          />) : null}
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
