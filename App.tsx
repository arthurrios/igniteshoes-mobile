import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';
import { useEffect } from 'react';
import { oneSignalInitialize } from './src/libs/oneSignal';
import { tagUserInfoCreate } from './src/notifications/notificationsTags';
import { OneSignal } from 'react-native-onesignal';
import { NotificationEventTypeMap } from 'react-native-onesignal/dist/models/NotificationEvents';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  useEffect(() => {
    oneSignalInitialize()
    tagUserInfoCreate()
  }, [])

  useEffect(() => {
    const unsubscribe = OneSignal.Notifications.addEventListener('foregroundWillDisplay', (notificationReceivedEvent: NotificationEventTypeMap['foregroundWillDisplay']) => {
      console.log(notificationReceivedEvent);
      
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
    </NativeBaseProvider>
  );
}