import * as React from 'react'
import { Text, View, StyleSheet, ScrollView, RefreshControl, FlatList, Dimensions } from 'react-native'
import { colors, Image } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import NotFound from '../components/NotFound'
import { getMyGames } from '../services/common-service'
import { FlatGrid } from 'react-native-super-grid';


const WIDTH = Dimensions.get('window').width
const MARGIN_HORIZENTAL = 3
let COLUMNS = 2

const getOrientation = () => {
    const window = Dimensions.get('window')
    return window.width < window.height ? 'portrait' : 'landscape'
}


export default function MyGamesScreen(props) {
    const [myGames, setMyGames] = React.useState([])
    const [refreshing, setRefreshing] = React.useState(true)
    const [orientation, setOrientation] = React.useState(getOrientation())

    React.useEffect(() => {
        (async () => {
            const games = await getMyGames()
            setMyGames(games)
            setRefreshing(false)
        })()

        COLUMNS = getOrientation() === 'portrait'? 2 : 4
        setOrientation(getOrientation())
    }, [])

    const refreshHandler = React.useCallback(() => {
        (async () => {
            setRefreshing(true)
            const games = await getMyGames()
            setMyGames(games)
            setRefreshing(false)
        })()
    }, [])

    const renderCover = React.useCallback(({ item: game }) => {
        // let coverWidth = orientation === 'portrait'? 180 : 140
        // let coverHeight = orientation === 'portrait' ? 220 : 190

        // return <View style={styles.cover}>
        //     <Image source={{ uri: game.assets.cover_image }} style={[styles.coverImage, { width: coverWidth, height: coverHeight }]} resizeMode='stretch' />
        //     <Text>{game.title}</Text>
        // </View>


        return <View style={styles.cover}>
            <Image source={{ uri: game.assets.cover_image }} style={styles.coverImage} />
            <Text style={styles.coverTitle}>{game.title}</Text>
        </View>
    }, [orientation])

        // <FlatList data={myGames} renderItem={renderCover} keyExtractor={(game) => game.slug} refreshing={refreshing} onRefresh={refreshHandler} />

    console.log('render')
    return <View style={styles.container}>
        {myGames.length ? (
            <FlatGrid data={myGames} renderItem={renderCover} refreshing={refreshing} onRefresh={refreshHandler} />
        ) : (
            refreshing || <NotFound text="No Games' Saves Found" icon={(props) => <Ionicons name='archive-outline' {...props} />} />
        )}
    </View>
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // flexWrap: 'wrap',
        // flexDirection: 'row',
        // justifyContent: 'space-evenly',
        // justifyContent: 'space-evenly',
        // paddingHorizontal: 10,
        // paddingVertical: 15,
    },
    cover: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // backgroundColor: colors.grey5,
        // borderWidth: 1,
        // borderColor: colors.grey4,
        // borderRadius: 5,
        overflow: 'hidden',
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
    columnWrapperStyle: {
    },
})
