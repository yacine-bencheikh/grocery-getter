import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '~/constants/images'
import icons from '~/constants/icons'
import { login } from '~/lib/appwrite'
import { useGlobalContext } from '~/lib/globale-provider'
import { Redirect } from 'expo-router'

const SignIn = () => {

const {refetch, loading, isLogged} = useGlobalContext()
if(!loading && isLogged){
  return <Redirect href='/'/>
}
  const handelLogin = async () => {
    const result = await login()
    if(result){
      refetch({});
    }else{
      Alert.alert('Error', 'An error occured while trying to login')
    }
  }
  return (
    <SafeAreaView>
      <ScrollView contentContainerClassName='bg-white h-full'>
        <Image source={images.onboarding} className='w-full h-4/6 ' resizeMode='contain'/>
        <View className='px-10'>
          <Text className='text-base text-center uppercase font-rubik text-black-200' >
            welcome to restate
          </Text>
          <Text className='text-3xl font-rubikBold text-black-300 text-center mt-2'>
            Let's Get you Closer to {`\n`}
            <Text className='text-primary-300'>Your ideal Home</Text>
          </Text>
          
          <Text className='text-lg font-rubik text-black-200 text-center mt-12'>
            Login to Restate with Google 
          </Text>
          <TouchableOpacity onPress={handelLogin} className='bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5 '>
            <View className='flex flex-row items-center justify-center'>

            <Image
            source={icons.google}
            className='w-5 h-5'
            resizeMode='contain'

            />
            <Text className='text-lg font-rubikMedium text-black-300 ml-2'>continue with google</Text>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn;