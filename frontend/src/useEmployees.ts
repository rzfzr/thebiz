import { useQuery } from "@tanstack/react-query"

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
        return response.json()
    },
})

