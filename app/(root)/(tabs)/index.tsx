import { Button, FlatList, Image, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "~/constants/images";
import icons from "~/constants/icons";
import Search from "~/components/Search";
import { Card, FeaturedCard } from "~/components/Cards";
import Filter from "~/components/Filter";
import { useGlobalContext } from "~/lib/globale-provider";
import { getLatestProperty, getProperties } from "~/lib/appwrite";
import { useAppwrite } from "~/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import NoResults from "~/components/noResults";

const Home = () => {
  const { user } = useGlobalContext()

  const params = useLocalSearchParams<{ query?: string; filter?: string }>()

  const { data: latestProperties, loading: latestPropertiesLoading } = useAppwrite({
    fn: getLatestProperty,
  })

  const { data: properties, loading: propertiesLoading, refetch } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  })
  const handelCardPress = (id: string) => {
    router.push(`/properties/${id}`);
  }

  useEffect(() => {
    refetch(
      {
        filter: params.filter!,
        query: params.query!,
        limit: 6,
      }
    )
  }, [params.query, params.filter])

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={properties}
        renderItem={({ item }) => <Card item={item} onPress={() => handelCardPress(item?.$id)} />}
        keyExtractor={(item: any) => item.$id}
        numColumns={2}
        contentContainerClassName="pb-32 "
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center">
                <Image source={{ uri: user?.avatar }} className="size-12 rounded-full" />
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
              <View className={`flex flex-row items-center justify-between ${(!latestProperties && latestProperties!.length === 0)? 'hidden' : ''}`}>
                <Text className="text-xl font-rubikBold text-black-300">Featured</Text>
                <TouchableOpacity><Text className="text-base font-rubikBold text-primary-300">See All</Text></TouchableOpacity>
              </View>
              {latestPropertiesLoading ? <ActivityIndicator className="text-primary-300 mt-5" size="large" /> :
                !latestProperties && latestProperties!.length === 0 ? <NoResults /> : <FlatList
                  data={latestProperties}
                  renderItem={({ item }) => <FeaturedCard item={item} onPress={() => handelCardPress(item?.$id)} />}
                  keyExtractor={(item:any) => item.$id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                  contentContainerClassName="mt-5 gap-5 mt-5" />
              }
            </View>
            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubikBold text-black-300">Our Recommandation</Text>
              <TouchableOpacity><Text className="text-base font-rubikBold text-primary-300">See All</Text></TouchableOpacity>
            </View>
            <Filter />


          </View>
        }
        ListEmptyComponent={
          propertiesLoading ? (
            <ActivityIndicator className="text-primary-300 mt-5" size="large" />
          ) : <NoResults />
        }

      />

    </SafeAreaView>
  );
}

export default Home;
