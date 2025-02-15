import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

interface Employee {
    id: number
    name: string
    title: string
    manager_id: number | null
}

export const useEmployees = () => useQuery({
    queryKey: ['employees'],
    queryFn: async (): Promise<Employee[]> => {
        const response = await fetch('http://localhost:8000/employees')
        if (!response.ok) {
            throw new Error('Failed to fetch employees')
        }
        console.log(`Fetched employees successfully`)
        return response.json()
    },
})

export const useUpdateManager = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ employeeId, newManagerId }: { employeeId: number, newManagerId: number | null }) => {
            const response = await fetch('http://localhost:8000/update-manager', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    employee_id: employeeId,
                    new_manager_id: newManagerId
                }),
            })
            if (!response.ok) {
                throw new Error('Failed to update manager')
            }
            console.log(`Updated manager successfully`)
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] })
        },
    })
};

