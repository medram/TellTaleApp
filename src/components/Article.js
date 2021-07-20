import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { colors, Image, useTheme } from 'react-native-elements'
import { fonts, sizes } from '../configs/fonts'


export default function Article(props)
{
    const { colors } = useTheme().theme
    const {data : article, onPress} = props

    return <TouchableOpacity onPress={onPress} activeOpacity={0.8} delayPressIn={30} >
        <View {...props} style={styles.container}>
            <Image source={{ uri: article?.post_image }} style={styles.post_image} />
            <View style={styles.description}>
            <Text style={styles.title}>{article?.title}</Text>
            {article?.extra && (
                <Text style={styles.extra}>{article.extra.join(' > ')}</Text>
            )}
            </View>
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
    post_image: {
        height: 200,
    },
    title: {
        fontFamily: fonts.medium,
        color: colors.grey1,
        fontSize: sizes.h3,
    },
    description: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    extra: {
        fontFamily: fonts.regular,
        color: colors.grey3,
        fontSize: sizes.h5,
        marginTop: 10,
    }
})
