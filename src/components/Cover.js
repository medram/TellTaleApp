import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Image, colors } from 'react-native-elements'


export default function Cover(props)
{
    const { onPress, game, ...rest} = props

    return <TouchableOpacity onPress={onPress} activeOpacity={0.8} delayPressIn={30} style={styles.cover} {...rest} >
        <Image source={{ uri: game.assets.cover_image }} style={styles.coverImage} />
        <Text style={styles.coverTitle}>{game.title}</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    cover: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'hidden',
        // backgroundColor: colors.grey5,
        // borderWidth: 1,
        // borderColor: colors.grey4,
        // borderRadius: 5,
        // marginVertical: 5,
        // marginHorizontal: MARGIN_HORIZENTAL,
        // width: WIDTH / COLUMNS - MARGIN_HORIZENTAL * 2,
    },
    coverImage: {
        width: 150,
        height: 190,
        resizeMode: 'stretch',

        // width: WIDTH / COLUMNS - MARGIN_HORIZENTAL * 2,
        // height: (WIDTH / COLUMNS - MARGIN_HORIZENTAL * 2) * 12 / 9
    },
    coverTitle: {
        color: colors.grey2,
    },
})

