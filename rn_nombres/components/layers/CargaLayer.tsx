import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function CargaLayer() {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.texto}>Cargando datos</Text>
      <ActivityIndicator size={"large"} color={"#000ff"}/>
    </View>
  )
}

const styles = StyleSheet.create({
    contenedor:{
        paddingHorizontal:40,
        flex:1,
        alignItems:"center",
        marginTop:300
    },
    texto:{
        color:"#111827",
        marginBottom:30
    }
})