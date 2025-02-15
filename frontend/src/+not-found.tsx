import { ArrowBack } from '@mui/icons-material'
import { Button, IconButton, Typography } from '@mui/material'
import { router, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function NotFound() {
    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({
            title: '404',
            headerLeft: () => (<IconButton onClick={() => {
                router.canGoBack() ? router.back() : router.replace('/')
            }}> <ArrowBack />
            </IconButton>)
        })
    }, [navigation])

    return (<View style={styles.container} >
        <Typography variant="h3" component="span">
            Not the page you're looking for
        </Typography>
        <Button
            variant="contained"
            onClick={() => router.replace('/')}>
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
    },
})