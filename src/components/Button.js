import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Button as ButtonComponent, useTheme } from 'react-native-elements'


export default function Button(props) {
    const { style } = props

    return <ButtonComponent {...props} style={[styles.button, style]} />
}

const styles = StyleSheet.create({
    button: {
    },

})
