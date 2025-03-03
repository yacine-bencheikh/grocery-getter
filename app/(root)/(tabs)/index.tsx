import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "~/constants/images";
import icons from "~/constants/icons";
import Search from "~/components/Search";
import { Card, FeaturedCard } from "~/components/Cards";
export default function Home() {
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-5">
        <View className="flex flex-row items-center justify-between mt-5">
          <View className="flex flex-row items-center">
            <Image source={images.avatar} className="size-12 rounded-full" />
            <View className="flex flex-col items-start ml-2 justify-center">
              <Text className="text-xs font-rubik text-black-100">
                good morning
              </Text>
              <Text className="text-base font-rubikMedium text-black-300">
                Adrian
              </Text>
            </View>
          </View>
          <Image source={icons.bell} className="size-6" />
        </View>
        <Search />
        <View className="my-5">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xl font-rubikBold text-black-300">Featured</Text>
            <TouchableOpacity><Text className="text-base font-rubikBold text-primary-300">See All</Text></TouchableOpacity>
          </View>
          <View className="flex flex-row gap-5 mt-5">
            <FeaturedCard />
            <FeaturedCard />
          </View>
        </View>
        <View className="flex flex-row items-center justify-between">
            <Text className="text-xl font-rubikBold text-black-300">Our Recommandation</Text>
            <TouchableOpacity><Text className="text-base font-rubikBold text-primary-300">See All</Text></TouchableOpacity>
          </View>
          <View className="flex flex-row gap-5 mt-5">
            <Card/>
            <Card/> 
            
          </View>
      </View>
    </SafeAreaView>
  );
}
