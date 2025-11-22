import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { ReactNode, useEffect, useState } from 'react'
import { consultarProbabilidades } from './helpers/ConsultasApi'
import { Probabilidad } from './model/Tipos'
import BienvenidaLayer from './components/layers/BienvenidaLayer'
import CargaLayer from './components/layers/CargaLayer'
import ResultadosLayer from './components/layers/ResultadosLayer'
import BotonModo from './components/BotonModo'
import InformacionNombres from './components/InformacionNombres'
import { borrarNombresOffLine, getNumeroNombreOffLine} from './helpers/ConsultaAlmacenamientoInterno'

export default function App() {
  //variables de estado
  const [nombre,setNombre]=useState("")
  const [listaProbabilidades, setListaProbabilidades]=useState<Array<Probabilidad>>([])
  const [capaActiva,setCapaActiva]=useState(1)
  const [online,setOnline]=useState(false)
  const [totalNombresOffLine, setTotalNombresOffLine]=useState (0)
  const [usarCache,setUsarCache] = useState(true)

  useEffect( () =>{actualizarNumeroNombres() }, [listaProbabilidades] )


  //funciones auxiliares
  function botonPulsado(){
    if(validarNombre()){
      setCapaActiva(2)
      consultarProbabilidades(nombre,online,usarCache)
      .then(respuesta => {
        setListaProbabilidades(respuesta) 
        setCapaActiva(3)})
      .catch(error=> {
        Alert.alert("Error",error.toString())
        setCapaActiva(1)
        setOnline(false)
      }
    )
    }else{
      Alert.alert("Error","El nombre no puede dejarse vacio")
    }
  }

  function validarNombre():boolean{
    return nombre.trim() !==""
  }

  function getCapaActiva():ReactNode{
    return  capaActiva===1 ? <BienvenidaLayer/> :
            capaActiva===2 ? <CargaLayer/> :
            capaActiva===3 ? <ResultadosLayer listaProbabilidades={listaProbabilidades}/> : 
            <View/>
  }

  async function actualizarNumeroNombres(){
    const total= await getNumeroNombreOffLine()
    setTotalNombresOffLine(total)
  }

  function borrarNombres(){
    Alert.alert(
      "Desea borrar todos los datos?",
      "Los datos eliminados no pueden ser recuperados",
      [{text:"Aceptar", onPress: () =>{
        borrarNombresOffLine()
        setListaProbabilidades([])
      }},
        {text:"Cancelar"}]
    )
  }

  return (
    <View style={styles.contenedorPrincipal}>
      <View style={styles.fila}>
        <TextInput
        value={nombre}
        onChangeText={setNombre}
        editable={capaActiva!==2}
        placeholder='Introduce tu nombre'
        style={styles.cuadroTexto}/>
        <Pressable
        onPress={botonPulsado}
        disabled={capaActiva===2}
        style={ ({pressed}) => pressed?styles.botonPresionado:styles.boton} >
          <Text style={styles.textoBoton} >Consultar</Text>
        </Pressable>
      </View>
      <View style={styles.contenedorCapas}>
        {
          getCapaActiva()
        }
      </View>
      <View style={styles.filaFondo}>
        <BotonModo texto={"on line"} activado={online} setActivado={setOnline} />
        <BotonModo texto={"cache"} activado={usarCache} setActivado={setUsarCache} />
        <InformacionNombres totalNombresOffLine={totalNombresOffLine}/>
      </View>
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
  },
  contenedorCapas:{
    flex:1
  },
  filaFondo:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    paddingRight:20
  }
})