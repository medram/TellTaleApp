import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { colors, useTheme } from 'react-native-elements'
import { sizes, fonts } from '../configs/fonts'



export default function Progress(props) {
    const { colors } = useTheme().theme
    const {percent, color} = props

    return <View style={[styles.container]}>
        <View style={[styles.progress, { width: percent + '%', backgroundColor: color }]}></View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        marginTop: 3,
        marginBottom: 10,
        backgroundColor: colors.grey4,
        borderRadius: 10,
        overflow: 'hidden',
    },
    progress: {
        backgroundColor: colors.primary,
        height: 15,
    }
})
