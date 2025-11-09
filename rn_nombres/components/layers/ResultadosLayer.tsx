import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import { Probabilidad } from '../../model/Tipos'
import ItemPaisProbabilidad from '../ItemPaisProbabilidad'

type ResultadosLayerProps={
    listaProbabilidades:Array<Probabilidad>
}

export default function ResultadosLayer({listaProbabilidades}:ResultadosLayerProps) {
  return (
    <FlatList 
          data={listaProbabilidades}
          renderItem={ItemPaisProbabilidad}
          keyExtractor={item=>item.country_id}
          ListEmptyComponent={() => <Text style={{ margin: 'auto' }}>No se han encontrado resultados</Text>}
          />
  )
}

const styles = StyleSheet.create({})