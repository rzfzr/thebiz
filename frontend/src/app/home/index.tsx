import { View } from "react-native"
import { Text } from "react-native-paper"
import { useEmployees } from "../../useEmployees"

export default function HomePage() {
    const { data: employees, isLoading, error } = useEmployees()

    if (isLoading) return <Text>Loading...</Text>
    if (error) return <Text>Error: {(error as Error).message}</Text>

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
                Employees
            </Text>
            {employees?.map((employee) => (
                <View key={employee.id} style={{ marginBottom: 12 }}>
                    <Text variant="titleMedium">{employee.name}</Text>
                    <Text variant="bodyMedium">{employee.title}</Text>
                </View>
            ))}
        </View>
    )
}