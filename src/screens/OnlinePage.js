import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import { getGamesDetailt } from '../services/common-service'


export default function OnlinePage(props)
{
    const { route, navigation , ...rest} = props
    const { url } = route.params
    const [content, setContent] = React.useState("")

    React.useEffect(() => {
        (async () => {
            setContent(await getGamesDetailt(url))
        })()
    }, [])


    return <WebView originWhitelist={['*']} source={{ html: content }} />
}

const styles = StyleSheet.create({

})
