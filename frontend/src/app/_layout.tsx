import { Stack } from 'expo-router'
import { Text } from 'react-native'
import { QueryClient } from '@tanstack/react-query'
import ErrorBoundary from '../ErrorBoundary'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'

export default function AppLayout() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                gcTime: 1000 * 60 * 60,
            },
        },
    })
    const asyncStoragePersister = createAsyncStoragePersister({
        storage: AsyncStorage,
    })

    return (
        <ErrorBoundary fallback={<Text>Something went wrong</Text>}>
            <PersistQueryClientProvider
                client={queryClient}
                persistOptions={{ persister: asyncStoragePersister }}
            >
                <Stack />
            </PersistQueryClientProvider>
        </ErrorBoundary>
    )
}