import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { categories } from '~/constants/data'

const Filter = () => {
    const params = useLocalSearchParams<{ filter?: string }>()
    const [category, setCategory] = useState(params.filter || 'All')
    const handleFilterPress = (filter: string) => { 
        if(category === filter ){
            setCategory('All')
            router.setParams({filter: "All"})
            return
        }
        setCategory(filter)
        router.setParams({filter})
    }
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className='mt-3 mb-2'
        >
            {categories.map((item, index) => (
                <TouchableOpacity key={index}
                    className={`flex flex-col items-start mr-2 px-4 py-2 rounded-full  ${category === item.title ? 'bg-primary-300' : 'bg-primary-100 border border-primary-200'}`}
                    onPress={() => handleFilterPress(item.title)}
                >
                    <Text
                    className={`${category === item.title ? 'text-white font-rubikBold mt-0.5' : 'text-black-300'} `}
                    >{item.title}</Text>
                </TouchableOpacity>)
            )}

        </ScrollView>
    )
}

export default Filter;