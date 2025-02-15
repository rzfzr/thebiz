import { router, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-paper'

export default function NotFound() {
    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({
            title: '404',
        })
    }, [navigation])

    return (
        <View style={styles.container}>
            <Text variant="headlineLarge" style={styles.text}>
                Not the page you're looking for
            </Text>
            <Button
                mode="contained"
                onPress={() => router.replace('/')}
            >
                Go Home
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    }, text: {
        marginBottom: 24,
        textAlign: 'center',
    },
})