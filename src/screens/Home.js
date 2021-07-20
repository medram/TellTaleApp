import * as React from 'react'
import { Text, View, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Article from '../components/Article'
import { getGames } from '../services/common-service'


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

    const onRefreshHandler = React.useCallback(() => {
        (async () => {
            setRefreshing(true)
            const games = await getGames()
            setGames(games)
            setRefreshing(false)
        })()
    })

    return <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshHandler} />}>
        <View style={styles.container}>
            {games.map((game, index) => {
                return <Article key={index} data={game}
                        onPress={() => navigation.navigate('OnlinePage', {
                            title: game.title,
                            url: game.url
                        })} />
            })}
        </View>
    </ScrollView>
}

const styles = {
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    }
}


