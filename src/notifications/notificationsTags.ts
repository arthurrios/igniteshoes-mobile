import { OneSignal } from "react-native-onesignal";

export function tagUserInfoCreate() {
  OneSignal.User.addTags({
    'user_name': 'Arthur',
    'user_email': 'arthur.rios007@gmail.com',
  });
}