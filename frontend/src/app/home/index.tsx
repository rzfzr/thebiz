import { View } from "react-native"
import { Text } from "react-native-paper"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useEmployees, useUpdateManager } from "../../useEmployees"

interface Employee {
    id: number
    name: string
    title: string
    manager_id: number | null
}

const buildHierarchy = (employees: Employee[]) => {
    const topLevel = employees.filter(e => !e.manager_id)

    const getSubordinates = (managerId: number) => {
        return employees.filter(e => e.manager_id === managerId)
    }

    const flattenHierarchy = (emps: Employee[], level: number = 0): [Employee, number][] => {
        return emps.flatMap(emp => [
            [emp, level],
            ...flattenHierarchy(getSubordinates(emp.id), level + 1)
        ])
    }

    return flattenHierarchy(topLevel)
}

export default function HomePage() {
    const { data: employees, isLoading, error } = useEmployees()
    console.table(employees)
    const updateManager = useUpdateManager()

    if (isLoading) return <Text>Loading...</Text>
    if (error) return <Text>Error: {(error as Error).message}</Text>

    const hierarchicalEmployees = buildHierarchy(employees || [])

    const onDragEnd = (result: any) => {
        if (!result.destination) return

        const sourceIndex = hierarchicalEmployees.findIndex(
            ([emp]) => emp.id.toString() === result.draggableId
        )

        // If dropping into an employee's droppable area
        if (result.destination.droppableId !== 'employees') {
            const newManagerId = parseInt(result.destination.droppableId)
            const [draggedEmployee] = hierarchicalEmployees[sourceIndex]

            // Don't update if dropping on current manager
            if (draggedEmployee.manager_id === newManagerId) return

            updateManager.mutate({
                employeeId: draggedEmployee.id,
                newManagerId
            })
            return
        }

        const destinationIndex = result.destination.index

        if (sourceIndex === -1) return

        const [draggedEmployee] = hierarchicalEmployees[sourceIndex]
        const [dropTarget] = hierarchicalEmployees[destinationIndex]

        // Don't update if dropping at the same spot
        if (draggedEmployee.manager_id === dropTarget.id) return

        // If dropping at position 0, remove manager
        if (destinationIndex === 0) {
            updateManager.mutate({
                employeeId: draggedEmployee.id,
                newManagerId: null
            })
            return
        }

        // Find the new manager (the closest item above with a lower level)
        let newManagerIndex = destinationIndex - 1
        while (newManagerIndex >= 0) {
            const [potentialManager, managerLevel] = hierarchicalEmployees[newManagerIndex]
            const [, dropTargetLevel] = hierarchicalEmployees[destinationIndex]
            if (managerLevel < dropTargetLevel) {
                updateManager.mutate({
                    employeeId: draggedEmployee.id,
                    newManagerId: potentialManager.id
                })
                break
            }
            newManagerIndex--
        }
    }

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
                Employees Board
            </Text>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="employees">
                    {(provided, snapshot) => (
                        <View
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{ backgroundColor: '#f5f5f5', padding: 8, borderRadius: 4 }}
                        >
                            {hierarchicalEmployees.map(([employee, level], index) => (
                                <Draggable
                                    key={employee.id}
                                    draggableId={employee.id.toString()}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            style={{
                                                ...provided.draggableProps.style,
                                                marginLeft: level * 32,
                                                position: 'relative',
                                            }}
                                        >
                                            <Droppable droppableId={employee.id.toString()}>
                                                {(dropProvided, dropSnapshot) => (
                                                    <div
                                                        ref={dropProvided.innerRef}
                                                        {...dropProvided.droppableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{
                                                            backgroundColor: 'white',
                                                            padding: 12,
                                                            marginBottom: 8,
                                                            borderRadius: 4,
                                                            position: 'relative',
                                                            boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                                                            border: dropSnapshot.isDraggingOver
                                                                ? '2px dashed #2196f3'
                                                                : '2px solid transparent',
                                                            background: dropSnapshot.isDraggingOver
                                                                ? '#e3f2fd'
                                                                : 'white',
                                                            transition: 'all 0.2s ease',
                                                        }}
                                                    >
                                                        <div>
                                                            <Text variant="titleMedium">{employee.name}</Text>
                                                            {` - `}
                                                            <Text variant="bodyMedium">{employee.title}</Text>
                                                        </div>
                                                        {dropProvided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
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