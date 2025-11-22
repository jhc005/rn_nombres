import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type BotonModoProps = {
    texto:string
    activado:boolean
    setActivado:React.Dispatch<React.SetStateAction<boolean>>
}

export default function BotonModo({texto,activado,setActivado}:BotonModoProps) {
    const color= activado ? "#34c759" : "#ff3b30"
  return (
    <Pressable style={styles.contenedor} onPress={()=> setActivado(!activado)}>
        <View style={[styles.circulo, {backgroundColor:color}]}>
            <Text>{texto}</Text>
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    contenedor:{
        flexDirection:"row",
        alignItems:"center",
        padding:20,
        columnGap:5
    },
    circulo:{
        width:12,
        height:12,
        borderRadius:6
    }
})