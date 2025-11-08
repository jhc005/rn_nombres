import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { consultarProbabilidades } from './helpers/ConsultasApi'
import ItemPaisProbabilidad from './components/ItemPaisProbabilidad'
import { Probabilidad } from './model/Tipos'

export default function App() {
  //variables de estado
  const [nombre,setNombre]=useState("")
  const [listaProbabilidades, setListaProbabilidades]=useState<Array<Probabilidad>>([])


  //funciones auxiliares
  function botonPulsado(){
    if(validarNombre()){
      consultarProbabilidades(nombre)
      .then(respuesta => setListaProbabilidades(respuesta))
      .catch(error=> Alert.alert("Error",error.toString()))
    }else{
      Alert.alert("Error","El nombre no puede dejarse vacio")
    }
  }

  function validarNombre():boolean{
    return nombre.trim() !==""
  }

  return (
    <View style={styles.contenedorPrincipal}>
      <View style={styles.fila}>
        <TextInput
        value={nombre}
        onChangeText={setNombre}
        placeholder='Introduce tu nombre'
        style={styles.cuadroTexto}/>
        <Pressable
        onPress={botonPulsado}
        style={ ({pressed}) => pressed?styles.botonPresionado:styles.boton} >
          <Text style={styles.textoBoton} >Consultar</Text>
        </Pressable>
      </View>
      <FlatList 
      data={listaProbabilidades}
      renderItem={ItemPaisProbabilidad}
      keyExtractor={item=>item.country_id}
      ListEmptyComponent={() => <Text style={{ margin: 'auto' }}>No se han encontrado resultados</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  contenedorPrincipal:{
    flex:1,
    backgroundColor:"#f3f4f6"
  },
  fila:{
    flex:1,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    padding:20,
    columnGap:20,
    maxHeight:200
  },
  cuadroTexto:{
    flex:1,
    backgroundColor:"#fff",
    paddingVertical:12,
    paddingHorizontal:16,
    borderRadius:8,
    borderColor:"#d1D5DB",
    borderWidth:1,
    fontSize:16,
    color:"#111827"
  },
  textoBoton:{
    color:"#FFFFFF",
    fontSize:16,
    fontWeight:600
  },
  boton:{
    backgroundColor:"#2563EB",
    paddingVertical:14,
    paddingHorizontal:32,
    borderRadius:8,
    alignItems:"center"
  },
  botonPresionado:{
    paddingVertical:14,
    paddingHorizontal:32,
    borderRadius:8,
    alignItems:"center",
    backgroundColor:"#1E40AF",
    opacity:0.85
  }
})