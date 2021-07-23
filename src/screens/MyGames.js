import * as React from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FlatGrid } from 'react-native-super-grid';

import NotFound from '../components/NotFound'
import { getMyGames } from '../services/common-service'
import Cover from '../components/Cover'


const WIDTH = Dimensions.get('window').width
const MARGIN_HORIZENTAL = 3
let COLUMNS = 2

const getOrientation = () => {
    const window = Dimensions.get('window')
    return window.width < window.height ? 'portrait' : 'landscape'
}


export default function MyGamesScreen(props) {
    const {route, navigation} = props
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
        return <Cover game={game} onPress={() => navigation.navigate('MyGameDetail', {
            title: game.title,
            game: game
        })} />
    }, [])


    return <View style={styles.container}>
        {myGames.length ? (
            <FlatGrid data={myGames} renderItem={renderCover} keyExtractor={(item) => item.slug}
                refreshing={refreshing} onRefresh={refreshHandler} />
        ) : (
            refreshing || <NotFound text="No Games' Saves Found" icon={(props) => <Ionicons name='archive-outline' {...props} />} />
        )}
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexWrap: 'wrap',
        // flexDirection: 'row',
        // justifyContent: 'space-evenly',
        // justifyContent: 'space-evenly',
        // paddingHorizontal: 10,
        // paddingVertical: 15,
    },
    columnWrapperStyle: {
    },
})
