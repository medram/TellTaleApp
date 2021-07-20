import * as React from 'react'
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native'
import { useTheme } from 'react-native-elements'
import Input from '../components/Input'
import Button from '../components/Button'
import { AuthContext } from '../utils/contexts'


export default function LoginScreen(props) {
    const { signIn, isLoading } = React.useContext(AuthContext)

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')


    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.container}>
            <Image source={require("../assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
            <View style={styles.loginBox}>
                <Input placeholder='Email' autoCapitalize='none' keyboardType='email-address' autoCompleteType='email' onChangeText={setEmail} />

                <Input placeholder='Password' secureTextEntry={true} autoCapitalize='none' onChangeText={setPassword} />

                <Button title='Sign In' onPress={() => signIn(email, password)} loading={isLoading} />
            </View>
        </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollViewContainer: {
        flex: 1,
    },
    logo: {
        height: 40,
        marginVertical: 15,
    },
    loginBox: {
        marginVertical: 10,
        width: 300,
    },
})
