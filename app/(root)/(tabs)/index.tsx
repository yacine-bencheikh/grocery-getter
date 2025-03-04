import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "~/constants/images";
import icons from "~/constants/icons";
import Search from "~/components/Search";
import { Card, FeaturedCard } from "~/components/Cards";
import Filter from "~/components/Filter";
import { useGlobalContext } from "~/lib/globale-provider";
export default function Home() {

  const {user} = useGlobalContext()
  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
      data={[1,2,3,4]}
      renderItem={({item}) => <Card/>}  
      keyExtractor={(item) => item.toString()}
      numColumns={2}
      contentContainerClassName="pb-32 "
      columnWrapperClassName="flex gap-5 px-5"
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View className="px-5">
        <View className="flex flex-row items-center justify-between mt-5">
          <View className="flex flex-row items-center">
            <Image source={{uri:user?.avatar}} className="size-12 rounded-full" />
            <View className="flex flex-col items-start ml-2 justify-center">
              <Text className="text-xs font-rubik text-black-100">
                good morning
              </Text>
              <Text className="text-base font-rubikMedium text-black-300">
                {user?.name}
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
          <FlatList
            data={[1,2,3]}
            renderItem={({item}) => <FeaturedCard/>}  
            keyExtractor={(item) => item.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            contentContainerClassName="mt-5 gap-5 mt-5"/>
          
        </View>
        <View className="flex flex-row items-center justify-between"> 
            <Text className="text-xl font-rubikBold text-black-300">Our Recommandation</Text>
            <TouchableOpacity><Text className="text-base font-rubikBold text-primary-300">See All</Text></TouchableOpacity>
          </View>
            <Filter/>

          
      </View>
      }
      
      />
      
    </SafeAreaView>
  );
}
