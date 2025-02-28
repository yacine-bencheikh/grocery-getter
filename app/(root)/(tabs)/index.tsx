import { Text,View } from "react-native";
import { Link } from "expo-router";
export default function Home() {
  return (
  <View>
    <Text className=" font-rubikBold">welcome to restate</Text>
    <Link href="/sign-in">Sign in</Link>
    <Link href="/explore">Explore</Link>
    <Link href="/profile">profile</Link>
    {/* <Link href="/properties/1">propertys</Link> */}
    
  </View>
  );
}
