import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type InformacionNombreProps = {
    totalNombresOffLine: number
}

export default function InformacionNombres({totalNombresOffLine}:InformacionNombreProps) {
  return (
    <View>
      <Text>Nombres alamcenados : {totalNombresOffLine}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})