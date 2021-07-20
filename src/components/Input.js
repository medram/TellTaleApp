import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Input as TextInput, useTheme } from 'react-native-elements'


export default function Input(props)
{
    const { colors } = useTheme().theme
    const { style, inputContainerStyle, containerStyle, labelStyle} = props

    return <TextInput {...props} style={[styles.input, { borderColor: colors.primary, color: colors.grey2 }, style]} inputContainerStyle={[styles.inputContainerStyle, inputContainerStyle]} containerStyle={[styles.containerStyle, containerStyle]} labelStyle={[styles.label, {color: colors.grey1}, labelStyle]} />
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        borderRadius: 7,
        margin: 0,
        paddingHorizontal: 20,
    },
    label: {
    },
    inputContainerStyle: {
        borderBottomWidth: 0,
    },
    containerStyle: {
        paddingHorizontal: 0,
    }
})
