import * as React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Text, View, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Article from '../components/Article'
import { getGames } from '../services/common-service'
import NotFound from '../components/NotFound'


export default function HomeScreen(props)
{
    const navigation = useNavigation()
    const [games, setGames] = React.useState([])
    const [refreshing, setRefreshing] = React.useState(false)

    React.useEffect(() => {
        (async () => {
            const games = await getGames()
            setGames(games)
        })()
    }, [])

    const onRefreshHandler = () => {
        (async () => {
            setRefreshing(true)
            const games = await getGames()
            setGames(games)
            setRefreshing(false)
        })()
    }

    return <ScrollView contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshHandler} />}>
        <View style={styles.container}>
            {games.length ? games.map((game, index) => {
                return <Article key={index} data={game}
                        onPress={() => navigation.navigate('OnlinePage', {
                            title: game.title,
                            url: game.url
                        })} />
            }) : (
                <NotFound text='No Games Found' icon={(props) => <Ionicons name='home-outline' {...props} />} />
            )}
        </View>
    </ScrollView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})


