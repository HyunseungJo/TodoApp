import React,{useState} from "react"
import { View,Text,TouchableOpacity, StyleSheet,Dimensions,TextInput } from 'react-native'
import PropTypes from "prop-types"
const {height,width} = Dimensions.get("window")

export default function ToDo(props){
    const [isEditing,setIsediting] =useState(false)
    const [toDoValue,setToDoValue] =useState("")
    const {text, id, deleteToDo, isCompleted}= props
    const toggleComplete=()=>{
        const {isCompleted, uncompleteToDo,completeToDo,id}=props
        if(isCompleted){
            uncompleteToDo(id)
        }else {
            completeToDo(id)
        }
    }
    const startEditing= ()=>{
        setIsediting(true)
        setToDoValue(props.text)
    }
    const finishEditing=()=>{
        const {id, updateToDo}=props
        updateToDo(id,toDoValue)
        setIsediting(false)
    }
    const controllInput =(text)=>{
        setToDoValue(text)
    }
    
    return(
        <View style={styles.container}>
            <View style={styles.column}>
                <TouchableOpacity onPress={toggleComplete}>
                    <View style={[styles.circle,
                    isCompleted? styles.completedCircle : styles.uncompletedCircle]}
                    />
                </TouchableOpacity>
                {isEditing? 
                <TextInput 
                style={[styles.text,styles.input,isCompleted? styles.completedText : styles.uncompletedCircleText]} 
                value={toDoValue} 
                multiline={true}
                onChangeText={controllInput}
                returnKeyType={"done"}
                onBlur={finishEditing}
                />
                :
                <Text style={[
                    styles.text,
                    isCompleted? styles.completedText : styles.uncompletedCircleText
                    ]}
                >
                    {text}
                </Text>}
            </View>
            
            {isEditing?(
                <View style={styles.actions}>
                    <TouchableOpacity onPressOut={finishEditing}>
                        <View style={styles.actionContainer}>
                            <Text style={styles.actionText}>✔️</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ):(
                <View style={styles.actions}>
                    <TouchableOpacity onPressOut={startEditing}>
                        <View style={styles.actionContainer}>
                            <Text style={styles.actionText}>✏️</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPressOut={()=>deleteToDo(id)}>
                        <View style={styles.actionContainer}>
                            <Text style={styles.actionText}>❌</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                        
                    )}
        </View>
        
    )
}
ToDo.propTypes ={
    text:PropTypes.string.isRequired,
    isCompleted:PropTypes.bool.isRequired,
    deleteToDo:PropTypes.func.isRequired,
    id:PropTypes.string.isRequired,
    completeToDo:PropTypes.func.isRequired,
    uncompleteToDo:PropTypes.func.isRequired,
    updateToDo:PropTypes.func.isRequired,
}

const styles= StyleSheet.create({
    container:{
        width:width-50,
        borderBottomColor:"#bbb",
        borderBottomWidth:StyleSheet.hairlineWidth,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    text:{
        fontWeight:"600",
        fontSize:20,
        marginVertical:20,
        paddingTop:5
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
    column:{
        flexDirection:"row",
        alignItems:"center",
        width:width/2,
    },
    actions:{
        flexDirection:"row"
    },
    actionContainer:{
        marginVertical:10,
        marginHorizontal:10
    },
    input:{
       
    }
})