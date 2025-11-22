import AsyncStorage from "@react-native-async-storage/async-storage";
import { Probabilidad } from "../model/Tipos";

async function getNumeroNombreOffLine():Promise<number> {
    const claves = await AsyncStorage.getAllKeys()
    return claves.length
}

async function guardarProbabilidad(nombre:String, probabilidades:Array<Probabilidad>){
    const json = JSON.stringify(probabilidades)
    await AsyncStorage.setItem(nombre,json)
}

async function consultarProbabilidadesOffLine(nombre:String){
    let lista = []
    const json = await AsyncStorage.getItem(nombre)
    if(json!=null){
        lista = JSON.parse(json)
    }
    return lista
}

async function existeNombre(nombre:String):Promise<boolean>{
    const claves= await AsyncStorage.getAllKeys()
    return claves.includes(nombre)  
}

async function borrarNombresOffLine(){
    await AsyncStorage.clear()
}



export {getNumeroNombreOffLine,guardarProbabilidad,consultarProbabilidadesOffLine,existeNombre,borrarNombresOffLine}