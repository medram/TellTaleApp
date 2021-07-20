import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-elements'
import { sizes, fonts } from '../configs/fonts'



export default function NotFound(props) {
    const { colors } = useTheme().theme
    const { icon : Icon, text, ...rest } = props

    return <View style={styles.container} {...rest}>
            <Icon size={50} color={colors.grey3} />
            <Text style={[styles.notFoundMessage, { color: colors.grey3 }]}>{text}</Text>
        </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notFoundMessage: {
        fontFamily: fonts.medium,
        fontSize: sizes.base,
    }
})
