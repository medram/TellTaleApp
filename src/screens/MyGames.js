import * as React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import NotFound from '../components/NotFound'



export default function MyGamesScreen(props) {
    const [games, setGames] = React.useState([])

    return <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
            {games.length ? games.map((game, index) => {
                return <Text>ggg</Text>
            }) : (
                <NotFound text='No Games Found' icon={(props) => <Ionicons name='archive-outline' {...props} />} />
            )}
        </View>
    </ScrollView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
