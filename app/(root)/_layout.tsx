import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "~/lib/globale-provider";

export default function AppLayout() {
    const { loading, isLogged } = useGlobalContext();
    if (false) {

        return (<SafeAreaView className="h-full flex justify-center items-center bg-white">
            <ActivityIndicator className="text-primary-300" size={"large"} />
        </SafeAreaView>)
    }
    if(!isLogged)return <Redirect href='/sign-in'/>

    return(
        <Slot/>
    )
    
}