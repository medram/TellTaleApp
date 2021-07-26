import * as React from 'react'
import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { colors } from 'react-native-elements'
import Progress from '../components/Progress'
import { fonts, sizes } from '../configs/fonts'
import { getGameDetail } from '../services/common-service'
import reactStringReplace from 'react-string-replace'


export default function MyGameDetailScreen(props) {
    const {route, navigation} = props
    const {game} = route.params

    const [refreshing, setRefreshing] = React.useState(true)
    const [gameDetail, setGameDetail] = React.useState({})


    React.useEffect(() => {
        (async () => {
            let data = await getGameDetail(game.slug)
            while (data?.choices?.choice_document === undefined)
            {
                // console.log('Getting Data Again')
                data = await getGameDetail(game.slug)
            }
            setGameDetail(data)
            setRefreshing(false)
        })()
    }, [])


    const parseEpisodes = React.useCallback((gameDetail) => {
        if (!Array.isArray(gameDetail?.choices?.choice_document) && !Array.isArray(gameDetail?.extended?.choice_document))
            return []

        let keys = gameDetail?.choices?.choice_document.concat(gameDetail?.extended?.choice_document).map((ep, index) => ep.episode)
        keys = Array.from(new Set(keys))

        // gameDetail?.choices?.choice_document.map((ep, index) => {
        // let episodes = gameDetail?.choices?.choice_document.filter(e => {
        //     return ep.episode === e.episode
        // })

        return keys.map(key => {
            return {
                key: key,
                questions: gameDetail?.choices?.choice_document.concat(gameDetail?.extended?.choice_document).filter(ep => ep.episode === key)
            }
        }).sort(function (a, b) {
            let x = a.key;
            let y = b.key;
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        })
    }, [])

    // console.log(parseEpisodes(gameDetail))

    return <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
            {!refreshing ? (Array.from(parseEpisodes(gameDetail).values()).map((item, i) => {
                // item = {key: 220, quesions: [...episodes]}
                return <View key={i} style={styles.episode}>
                    <Text style={styles.title}>Episode: {item.key}</Text>
                    {item.questions.map((ep, index) => {
                        // reformating the description
                        let description = ep.description.english.replace("^glyphScale:1.1^^font:MenuDisplaySmall.font^^color:#24c246^", '').replace('^^', '')
                        description = reactStringReplace(description, /([0-9\.]+%)/g, (match, i) => {
                            return <Text key={i} style={{fontFamily: fonts.bold, color: colors.grey0}}>{match}</Text>
                        })

                        return <React.Fragment key={index}>
                            <Text style={styles.question}>{ep.question.english}</Text>
                            <Text style={styles.description}>{description}</Text>

                            <Progress percent={ep.percent} color={colors.grey2} />
                        </React.Fragment>
                    })}
                </View>
            })) : (
                <ActivityIndicator color={colors.primary} size='large' />
            ) }
        </View>
    </ScrollView>
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    episode: {
        borderColor: colors.grey4,
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: colors.grey5,
    },
    title: {
        color: colors.grey1,
        fontFamily: fonts.bold,
        fontSize: sizes.h4,
    },
    description: {
        color: colors.grey2,
        fontFamily: fonts.regular,
        fontSize: sizes.h5,
    },
    question: {
        color: colors.primary,
        fontFamily: fonts.medium,
        fontSize: sizes.h5,
    },
})
