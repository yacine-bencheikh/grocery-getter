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
import property from "../properties/[id]";

const Explore = () => {
    const params = useLocalSearchParams<{ query?: string; filter?: string }>()

    const { data: properties, loading: propertiesLoading, refetch } = useAppwrite({
        fn: getProperties,
        params: {
            filter: params.filter!,
            query: params.query!,
            limit: 20,
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
                limit: 20,
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
                    <View className="px-5 ">
                        <View className="flex flex-row items-center justify-between mt-5">
                            <TouchableOpacity onPress={() => router.back()} className="flex flex-row items-center bg-primary-200 rounded-full size-11 justify-center">
                                <Image source={icons.backArrow} className="size-5"/>
                            </TouchableOpacity>
                            <Text className="text-base mr-2 text-center font-rubikMedium text-black-300">Search for your ideal Home</Text>
                            <Image source={icons.bell} className="size-5" />
                        </View>
                        <Search/>
                        <View className="mt-3">
                        <Filter />
                        <Text className="text-xl font-rubikBold text-black-300 mt-3">Found {properties? properties.length : 0} properties</Text>
                        </View>
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

export default Explore;
