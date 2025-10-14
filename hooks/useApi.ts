import { useState } from 'react'

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface UseApiReturn<T> {
  data: T | null
  loading: boolean
  error: string | null
  execute: (...args: any[]) => Promise<T | null>
  reset: () => void
}

/**
 * Custom hook for handling API calls with loading and error states
 * 
 * @example
 * const { data, loading, error, execute } = useApi(clientesAPI.getAll)
 * 
 * useEffect(() => {
 *   execute()
 * }, [])
 */
export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<T>
): UseApiReturn<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = async (...args: any[]): Promise<T | null> => {
    setState({ data: null, loading: true, error: null })
    
    try {
      const result = await apiFunction(...args)
      setState({ data: result, loading: false, error: null })
      return result
    } catch (error: any) {
      const errorMessage = error.message || 'An error occurred'
      setState({ data: null, loading: false, error: errorMessage })
      return null
    }
  }

  const reset = () => {
    setState({ data: null, loading: false, error: null })
  }

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    execute,
    reset,
  }
}

/**
 * Hook for handling mutations (create, update, delete)
 */
export function useMutation<T, Args extends any[]>(
  mutationFn: (...args: Args) => Promise<T>
) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const mutate = async (...args: Args): Promise<{ success: boolean; data?: T; error?: string }> => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const data = await mutationFn(...args)
      setSuccess(true)
      setLoading(false)
      return { success: true, data }
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred'
      setError(errorMessage)
      setLoading(false)
      return { success: false, error: errorMessage }
    }
  }

  const reset = () => {
    setLoading(false)
    setError(null)
    setSuccess(false)
  }

  return {
    mutate,
    loading,
    error,
    success,
    reset,
  }
}

/**
 * Hook for handling list data with pagination and search
 */
export function useList<T>(
  fetchFn: (params?: { search?: string; page?: number; limit?: number }) => Promise<T[]>
) {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const fetchItems = async (searchTerm?: string, pageNum?: number) => {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchFn({
        search: searchTerm || search,
        page: pageNum || page,
      })
      setItems(data)
    } catch (err: any) {
      setError(err.message || 'Error fetching items')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm)
    setPage(1)
    fetchItems(searchTerm, 1)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    fetchItems(search, newPage)
  }

  const refresh = () => {
    fetchItems(search, page)
  }

  return {
    items,
    loading,
    error,
    search,
    page,
    handleSearch,
    handlePageChange,
    refresh,
    fetchItems,
  }
}