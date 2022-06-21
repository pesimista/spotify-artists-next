import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const createWrapper = () => {
  // ✅ creates a new QueryClient for each test
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }

  return Wrapper
}

export default createWrapper
