import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '~/constants/icons'
import images from '~/constants/images'

const profile = () => {
    const hundelLogout = () => {
        console.log('profile')
    }
    return (
        <SafeAreaView className='h-full bg-white'>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName='pb-32 px-7'
            >
                <View className='flex flex-row justify-between items-center mt-5'>
                    <Text className='text-xl font-rubikBold'>
                        Profile
                    </Text>
                    <Image source={icons.bell} className='size-5' />
                </View>
                <View className='flex flex-row justify-center mt-5 '>
                    <View className='flex flex-col items-center relative'>
                        <Image source={images.avatar} className='size-44 relative rounded-full' />
                        <TouchableOpacity className='absolute bottom-11 right-2'>
                            <Image source={icons.edit} className='size-9' />
                        </TouchableOpacity>
                        <Text className='text-2xl font-rubikBold mt-2'>Yassine Ben Cheikh</Text>
                    </View>
                </View>
                <View className='flex flex-col mt-10'>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default profile