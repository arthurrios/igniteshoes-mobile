/* eslint-disable camelcase */
import { StatusBar } from 'react-native'
import { NativeBaseProvider } from 'native-base'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { Routes } from './src/routes'

import { THEME } from './src/theme'
import { Loading } from './src/components/Loading'

import { CartContextProvider } from './src/contexts/CartContext'
import { useEffect } from 'react'
import { oneSignalInitialize } from './src/libs/oneSignal'
import { tagUserInfoCreate } from './src/notifications/notificationsTags'
import { OneSignal } from 'react-native-onesignal'
import { NotificationEventTypeMap } from 'react-native-onesignal/dist/models/NotificationEvents'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  useEffect(() => {
    oneSignalInitialize()
    tagUserInfoCreate()
  }, [])

  useEffect(() => {
    const unsubscribe = OneSignal.Notifications.addEventListener(
      'click',
      (notificationReceivedEvent: NotificationEventTypeMap['click']) => {
        const { actionId } = notificationReceivedEvent.result

        switch (actionId) {
          case '1':
            return console.log('See all')
          case '2':
            return console.log('See request')
          default:
            return console.log('Action button was not clicked')
        }
      },
    )
    return () => unsubscribe
  }, [])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  )
}
