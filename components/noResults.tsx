import { View, Text, Image } from 'react-native'
import React from 'react'
import images from '~/constants/images'

const NoResults = () => {
    return (
        <View className='flex items-center my-5 justify-center'>
            <Image source={images.noResult} className='w-11/12 h-80' resizeMode='contain'/>
            <Text className='text-2xl font-rubikBold text-black-300 mt-5'>No Results</Text>
            <Text className='text-base text-black-100 mt-2'>we could not find any results</Text>
        </View>
    )
}

export default NoResults;