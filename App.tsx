import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';
import { useEffect, useState } from 'react';
import { oneSignalInitialize } from './src/libs/oneSignal';
import { tagUserInfoCreate } from './src/notifications/notificationsTags';
import { OSNotification, OneSignal } from 'react-native-onesignal';
import { NotificationEventTypeMap } from 'react-native-onesignal/dist/models/NotificationEvents';
import { Notification } from './src/components/Notification';

export default function App() {
  const [notification, setNotification] = useState<OSNotification>()
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  useEffect(() => {
    oneSignalInitialize()
    tagUserInfoCreate()
  }, [])

  useEffect(() => {
    const unsubscribe = OneSignal.Notifications.addEventListener('foregroundWillDisplay', (notificationReceivedEvent: NotificationEventTypeMap['foregroundWillDisplay']) => {
      const response = notificationReceivedEvent.getNotification()

      setNotification(response)      
    })

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

      {
        notification?.title &&
        <Notification title={notification.title} onClose={() => setNotification(undefined)}/>}
    </NativeBaseProvider>
  );
}