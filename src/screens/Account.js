import * as React from 'react'
import { Text, View, StyleSheet, Alert } from 'react-native'
import { Badge, colors, Button } from 'react-native-elements'
import { fonts, sizes } from '../configs/fonts'
import { AuthContext } from '../utils/contexts'



export default function AccountScreen(props) {
    const {user, signOut} = React.useContext(AuthContext)

    const logoutHandler = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => {
                        (async () => {
                            await signOut()
                        })()
                    }
                }
            ]
        )
    }


    return <View style={styles.container}>
        <Text style={styles.title}>Account</Text>
        <View style={styles.profileContainer}>
            <Text style={[styles.text, {fontSize: sizes.h3}]}>{user.email}</Text>
            <Text style={styles.text}>{user.username && `Username: @${user.username}` }</Text>
            <Text style={styles.text}>Created: {user.created_at}</Text>
            <Text style={styles.text}>Last login: {user.last_login}</Text>
            <Text style={styles.text}>Status: {user.verified ? <Badge value='Verified' status='success' /> : <Badge value='Not Verified Yet' status='warning' />}</Text>
        </View>
        <Button title='Log out' type='clear' icon={{name:'logout', color: colors.grey2}} onPress={logoutHandler} />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    profileContainer: {
        borderWidth: 1,
        borderColor: colors.grey4,
        padding: 15,
        borderRadius: 10,
        backgroundColor: colors.grey5,
        marginVertical: 15,
    },
    text: {
        fontFamily: fonts.medium,
        color: colors.grey2,
        fontSize: sizes.h5,
    },
    title: {
        fontFamily: fonts.medium,
        fontSize: sizes.h1,
        color: colors.grey2,
    }

})

