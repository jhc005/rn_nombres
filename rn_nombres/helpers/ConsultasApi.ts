import axios from "axios"
import { Probabilidad } from "../model/Tipos"
import { consultarProbabilidadesOffLine, existeNombre, guardarProbabilidad } from "./ConsultaAlmacenamientoInterno"


async function consultarProbabilidadesApi(nombre:string):Promise<Array<Probabilidad>>{
    const endpoint= `https://api.nationalize.io/`
    const respuestaServidor= await axios.get(endpoint)
    const resultado= respuestaServidor.data.country
    for(let objeto of resultado){
        objeto.pais = await consultarNombrePais(objeto.country_id)
    }
    await guardarProbabilidad(nombre,resultado)
    return resultado

}

async function consultarNombrePais(codigo:string):Promise<String>{
    const endpoint = `https://restcountries.com/v3.1/alpha/${codigo}`
    const respuesta = await axios.get(endpoint)
    return respuesta.data[0].translations.spa.common
}

async function rellenarCampoPais(objeto:Probabilidad):Promise<Probabilidad>{
    objeto.pais = await consultarNombrePais(objeto.country_id);
    return objeto
}

async function consultarProbabilidades(nombre:string,online:boolean, usarCache:boolean){
    let resultado = []
    if(online){
        if(usarCache){
            const existe = await existeNombre(nombre)
            if(existe){
                resultado = await consultarProbabilidadesOffLine(nombre)
            } else {
                resultado = await consultarProbabilidadesApi(nombre)
            }
        }else{
            resultado = await consultarProbabilidadesApi(nombre)
        }
    }else{
        resultado = await consultarProbabilidadesOffLine(nombre)
    }
    return resultado
}

export{consultarProbabilidadesApi,rellenarCampoPais,consultarProbabilidades}