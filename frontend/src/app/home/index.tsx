import { View } from "react-native"
import { Text } from "react-native-paper"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useEmployees } from "../../useEmployees"

export default function HomePage() {
    const { data: employees, isLoading, error } = useEmployees()

    if (isLoading) return <Text>Loading...</Text>
    if (error) return <Text>Error: {(error as Error).message}</Text>

    const onDragEnd = (result: any) => {
        if (!result.destination) return
    }

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
                Employees Board
            </Text>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="employees">
                    {(provided) => (
                        <View
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{ backgroundColor: '#f5f5f5', padding: 8, borderRadius: 4 }}
                        >
                            {employees?.map((employee, index) => (
                                <Draggable
                                    key={employee.id}
                                    draggableId={employee.id.toString()}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                                ...provided.draggableProps.style,
                                                backgroundColor: 'white',
                                                padding: 12,
                                                marginBottom: 8,
                                                borderRadius: 4,
                                                shadowOffset: { width: 0, height: 1 },
                                                shadowOpacity: 0.2,
                                                shadowRadius: 2,
                                                elevation: 2,
                                            }}
                                        >
                                            <Text variant="titleMedium">{employee.name}</Text>
                                            <Text variant="bodyMedium">{employee.title}</Text>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </View>
                    )}
                </Droppable>
            </DragDropContext>
        </View>
    )
}