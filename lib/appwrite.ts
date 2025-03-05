import { Account, Avatars, Client, Databases, OAuthProvider, Query } from 'react-native-appwrite';
import * as linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';


export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    project: "67c3912700135fbc2132",
    databaseId: "67c6daa400365471f04a",
    galleriesCollectionId: "67c6e1ad000d33c30dbe",
    reviewsCollectionId: "67c6e25a0006b798b9a8",
    agentsCollectionId: "67c6df18003648e2da1e",
    propertiesCollectionId: "67c6e4e1002978ae1334"

}

export const client = new Client()

client

    .setEndpoint(config.endpoint!)
    .setProject(config.project!)

export const avatar = new Avatars(client)
export const account = new Account(client)
export const databases = new Databases(client)

export async function login() {
    try {
        const redurectUri = linking.createURL('/')
        const response = await account.createOAuth2Token(OAuthProvider.Google, redurectUri)
        if (!response) throw new Error('No response');
        const browserResult = await openAuthSessionAsync(response.toString(), redurectUri)
        if (browserResult.type !== 'success' || !browserResult.url) throw new Error('No session async');

        const url = new URL(browserResult.url)
        const secret = url.searchParams.get('secret')?.toString()
        const userId = url.searchParams.get('userId')?.toString()
        if (!secret || !userId) throw new Error('No secret or user id');

        const session = await account.createSession(userId, secret)
        if (!session) throw new Error('No session');
        return true

    } catch (error) {

    }
}
export async function logout() {
    try {
        await account.deleteSession('current')
        return true
    } catch (error) {

    }
}
export async function getUser() {
    try {
        const user = await account.get()
        if (user.$id) {
            const userAavatar = await avatar.getInitials(user.$id)
            return {
                ...user,
                avatar: userAavatar.toString()

            }
        }
        return user
    } catch (error) {

    }
}
export async function getLatestProperty() {
    try {
        const result = await databases.listDocuments(config.databaseId!, config.propertiesCollectionId!, [Query.orderAsc('$createdAt'), Query.limit(5)])
        return result.documents

    } catch (error) {
        console.log(error)
    }
}
export async function getProperties({ filter, query, limit }: { filter: string, query: string, limit: number }) {
    try {
        const buildQuery = [Query.orderDesc('$createdAt')]
        if (filter && filter !== "All") {
            buildQuery.push(Query.equal('type', filter))
        }
        if (query) {
            buildQuery.push(Query.or([
                Query.search('name', query),
                Query.search('address', query),
                Query.search('type', query),
            ]))
        }
        if(limit){
            buildQuery.push(Query.limit(limit))
        }
        const result = await databases.listDocuments(config.databaseId!, config.propertiesCollectionId!, buildQuery)
        return result.documents
    } catch (error) {
        console.log(error)
        return []
    }
}

