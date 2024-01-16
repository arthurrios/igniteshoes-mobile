import { OneSignal } from 'react-native-onesignal'
import { Platform } from 'react-native'

function oneSignalInitialize() {
  // const {
  //   EXPO_PUBLIC_ONE_SIGNAL_APP_ID_ANDROID,
  //   EXPO_PUBLIC_ONE_SIGNAL_APP_ID_IOS,
  // } = process.env;

  const oneSignalAppId =
    Platform.OS === 'ios' ? '' : 'e7569ea7-1579-4a97-a126-8a9c3dbbe119'

  if (oneSignalAppId) {
    OneSignal.initialize(oneSignalAppId)
  }

  if (Platform.OS === 'ios') {
    OneSignal.Notifications.canRequestPermission().then((response) => {
      if (response) {
        OneSignal.Notifications.requestPermission(true)
      }
    })
  }
}

export { oneSignalInitialize }
