import * as React from 'react'
import { Text, View, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Article from '../components/Article'
import { getNews } from '../services/common-service'
import NotFound from '../components/NotFound'


export default function NewsScreen(props) {
    const navigation = useNavigation()
    const [news, setNews] = React.useState([])
    const [refreshing, setRefreshing] = React.useState(true)

    React.useEffect(() => {
        (async () => {
            const news = await getNews()
            setNews(news)
            setRefreshing(false)
        })()
    }, [])

    const onRefreshHandler = React.useCallback(() => {
        (async () => {
            setRefreshing(true)
            const news = await getNews()
            setNews(news)
            setRefreshing(false)
        })()
    }, [])

    return <ScrollView contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshHandler} />}>
        <View style={styles.container}>
            {news.length ? news.map((article, index) => {
                return <Article key={index} data={article}
                    onPress={() => navigation.navigate('OnlinePage', {
                        title: article.title,
                        url: article.url
                    })} />
            }) : (
                refreshing || <NotFound text='No News Found' icon={(props) => <Ionicons name='newspaper-outline' {...props} />} />
            )}
        </View>
    </ScrollView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})


