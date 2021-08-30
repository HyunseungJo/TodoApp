import React,{useState} from "react"
import { View,Text,TouchableOpacity, StyleSheet,Dimensions } from 'react-native'

const {height,width} = Dimensions.get("window")

export default function ToDo(){
    const [isEditing,setIsediting] =useState(false)
    const [isCompleted,setIscompleted]=useState(false)
    const toggleComplete=()=>{
        setIscompleted(!isCompleted)
    }
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleComplete}>
                <View style={[styles.circle,
                isCompleted? styles.completedCircle : styles.uncompletedCircle]}
                />
            </TouchableOpacity>
            <Text style={[styles.text,
                isCompleted? styles.completedText : styles.uncompletedCircleText]}>Hello I'm todo</Text>
        </View>
    )
}


const styles= StyleSheet.create({
    container:{
        width:width-50,
        borderBottomColor:"#bbb",
        borderBottomWidth:StyleSheet.hairlineWidth,
        flexDirection:"row",
        alignItems:"center"
    },
    text:{
        fontWeight:"600",
        fontSize:20,
        marginVertical:20
    },
    completedText:{
        color:"#bbb",
        textDecorationLine:"line-through"
    },
    uncompletedCircleText:{
        color:"#353535"
    },
    circle:{
        borderRadius:15,
        borderColor:"red",
        borderWidth:3,
        width:30,
        height:30,
        marginRight:20
    },
    completedCircle:{
        borderColor:"#bbb"
    },
    uncompletedCircle:{
        borderColor:"#F23657"
    },
})