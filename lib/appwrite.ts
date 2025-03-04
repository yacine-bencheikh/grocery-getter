import { Account, Avatars, Client, Databases, OAuthProvider } from 'react-native-appwrite';
import * as linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';
export const config = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    project: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALERIES_COLLECTION_ID,
    reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
    agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
    propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID
    
}

export const client = new Client()

client

.setEndpoint(config.endpoint!)
.setProject(config.project!)

export const avatar = new Avatars(client)
export const account = new Account(client)
export const databases = new Databases(client)

export async function login(){
    try {
        const redurectUri = linking.createURL('/')
        const response = await account.createOAuth2Token(OAuthProvider.Google, redurectUri)
        if(!response) throw new Error('No response');
        const browserResult = await openAuthSessionAsync(response.toString(), redurectUri)
        if(browserResult.type !== 'success' || !browserResult.url) throw new Error('No session async');

        const url = new URL(browserResult.url)
        const secret = url.searchParams.get('secret')?.toString()
        const userId = url.searchParams.get('userId')?.toString()
        if(!secret || !userId) throw new Error('No secret or user id');

        const session = await account.createSession(userId, secret)
        if(!session) throw new Error('No session');
        return true

    } catch (error) {
        
    }
}
export async function logout(){
    try {
        await account.deleteSession('current')
        return true
    } catch (error) {
        
    }
}
export async function getUser(){
    try {
        const user = await account.get()
        if(user.$id){
            const userAavatar = await avatar.getInitials(user.$id)
            return {...user,
                avatar: userAavatar.toString()

            }
        } 
        return user
    } catch (error) {
        
    }
}