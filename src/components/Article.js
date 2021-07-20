import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { colors, Image, useTheme } from 'react-native-elements'
import { fonts, sizes } from '../configs/fonts'


export default function Article(props)
{
    const { colors } = useTheme().theme
    const {data : article, onPress} = props

    return <TouchableOpacity onPress={onPress} activeOpacity={0.8} delayPressIn={30} >
        <View style={styles.container} {...props}>
            <Image source={{ uri: article?.post_image }} style={{ height: 200 }} />
            <Text style={styles.title}>{article?.title}</Text>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        backgroundColor: colors.grey5,
        overflow: 'hidden',
    },
    title: {
        fontFamily: fonts.medium,
        color: colors.grey1,
        fontSize: sizes.h3,
        paddingHorizontal: 15,
        paddingVertical: 10,
    }
})
