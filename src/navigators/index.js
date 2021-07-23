import * as React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import HomeScreen from '../screens/Home'
import MyGamesScreen from '../screens/MyGames'
import NewsScreen from '../screens/News'
import AccountScreen from '../screens/Account'
import LoginScreen from '../screens/Login'
import MyGameDetailScreen from '../screens/MyGameDetail'
import AccountDetailsScreen from '../screens/AccountDetails'
import OnlinePage from '../screens/OnlinePage'
import { fonts, sizes } from '../configs/fonts'
import { AuthContext } from '../utils/contexts'


const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const getTabScreenOptions = (route) => {
    return {
        tabBarIcon: ({ focused, color, size }) => {
            let iconName = ''
            if (route.name === 'Home'){
                iconName = 'home-outline'
            } else if (route.name === 'Account') {
                iconName = 'person-circle-outline'
            } else if(route.name === 'News') {
                iconName = 'newspaper-outline'
            } else if (route.name === 'MyGames') {
                iconName = 'archive-outline'
            }

            return <Ionicons name={iconName} size={size} color={color} />
        }
    }
}

const tabBarOptions = {
    style: {
        height: 65,
    },
    tabStyle: {
        paddingTop: 5,
        paddingBottom: 10,
    },
    labelStyle: {
        fontFamily: fonts.medium,
        fontSize: sizes.base,
    }
}

function DefaultTabBarButton(props)
{
    return <TouchableOpacity {...props} />
}

export function TabMenu(props)
{
    return (
        <Tab.Navigator screenOptions={({ route }) => getTabScreenOptions(route)} tabBarOptions={tabBarOptions}>
            <Tab.Screen name="Home" component={HomeScreen}
                options={{ title: 'Games', tabBarButton: DefaultTabBarButton }} />

            <Tab.Screen name="News" component={NewsScreen}
                options={{ tabBarButton: DefaultTabBarButton }} />

            <Tab.Screen name="MyGames" component={MyGamesScreen}
                options={{title: 'My Saves', tabBarButton: DefaultTabBarButton }} />

            <Tab.Screen name="Account" component={AccountScreen}
                options={{ tabBarButton: DefaultTabBarButton }} />
        </Tab.Navigator>
    )
}

export function StackMenu(props)
{
    const {isLoggedIn} = React.useContext(AuthContext)

    return (
        <Stack.Navigator>
        {!isLoggedIn ?
            <Stack.Screen name='Login' component={LoginScreen}
                options={{ headerShown: false }} />
        : (
            <>
                <Stack.Screen name='Home' component={TabMenu}
                    options={{ headerShown: false }} />

                <Stack.Screen name='MyGameDetail' component={MyGameDetailScreen}
                            options={({ route }) => ({ title: `${route.params.title} (Choices)`})} />

                <Stack.Screen name='AccountDetails' component={AccountDetailsScreen}
                    options={{ headerShown: false }} />

                <Stack.Screen name='OnlinePage' component={OnlinePage}
                    options={({route}) => ({title: route.params.title})} />
            </>
        )}
        </Stack.Navigator>
    )
}



