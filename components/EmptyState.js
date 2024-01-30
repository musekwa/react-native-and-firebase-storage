import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SvgComponent from '../assets/Svg'

const EmptyState = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <SvgComponent />
            <Text
                style={{
                    color: "gray", marginTop: 20,
                }}
            >
                No photo uploaded yet
            </Text>
        </View>
    )
}

export default EmptyState

const styles = StyleSheet.create({})