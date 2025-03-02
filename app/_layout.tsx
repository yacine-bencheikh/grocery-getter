import '../global.css';
import {useFonts} from 'expo-font';
import { useEffect } from 'react';

import { SplashScreen, Stack } from 'expo-router';
import { GlobalProvider } from '~/lib/globale-provider';

export default function Layout() {
  const [fontsloaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });
  useEffect(() => {
    if (fontsloaded) {
      SplashScreen.hide();
    }
  }, [fontsloaded]);
  if(!fontsloaded) return null;

  return (
    <GlobalProvider>
      <Stack  screenOptions={{headerShown:false}}/>
    </GlobalProvider>
);
}
