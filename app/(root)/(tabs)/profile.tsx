import { View, Text, ScrollView, Image, TouchableOpacity, ImageSourcePropType, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '~/constants/icons'
import images from '~/constants/images'
import { settings } from '~/constants/data'
import { useGlobalContext } from '~/lib/globale-provider'
import { logout } from '~/lib/appwrite'

interface SettingItemProps{
    icon: ImageSourcePropType,
    title: string,
    onPress?: () => void,
    textStyle?: string,
    showArrow?: boolean
    
}

const SettingItem= ({icon,title,onPress,textStyle,showArrow = true}:SettingItemProps) =>{
    return(
        <TouchableOpacity onPress={onPress} className='flex flex-row items-center justify-between py-3'>
            <View className='flex flex-row items-center justify-between gap-3'>
                <Image className='size-6' source={icon}/>
                <Text className={`text-lg font-rubikMedium text-black-300 ${textStyle}`} >{title}</Text>
            </View>
            {showArrow && <Image source={icons.rightArrow} className='size-4'/>}
        </TouchableOpacity>
    )
        
    
}
const profile = () => {
    const {user , refetch} = useGlobalContext();

    const hundelLogout = async() => {
        const result = await logout()
        if(result){
            Alert.alert("Success","you have been logged out");
            refetch({});
        }else{
            Alert.alert("Error","An error occured")
        }
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
                        <Image source={{uri:user?.avatar}} className='size-44 relative rounded-full' />
                        <TouchableOpacity className='absolute bottom-11 right-2'>
                            <Image source={icons.edit} className='size-9' />
                        </TouchableOpacity>
                        <Text className='text-2xl font-rubikBold mt-2'>{user?.name}</Text>
                    </View>
                </View>
                <View className='flex flex-col mt-10'>
                    <SettingItem icon={icons.calendar} title='My Bookings' onPress={() => { }} />
                    <SettingItem icon={icons.wallet} title='Payment' onPress={() => { }} />
                </View>
                <View className='flex flex-col mt-5 border-t pt-5 border-primary-200'>
                    {settings.slice(2).map((item,index)=>(
                        <SettingItem key={index} {...item} />
                    ))}
                </View>
                <View className='flex flex-col mt-5 border-t pt-5 border-primary-200'>
                    <SettingItem icon={icons.logout} title='Logout' onPress={hundelLogout} textStyle='text-danger' showArrow={false}/>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default profile