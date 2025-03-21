import { QueryClient, QueryFunction } from "@tanstack/react-query";

// Helper function to ensure API paths work both locally and in production
function getApiUrl(path: string): string {
  // If the path already starts with http or https, return it as is
  if (path.startsWith('http')) return path;
  
  // If the path already includes .netlify/functions, return it as is
  if (path.includes('.netlify/functions')) return path;
  
  // If the path starts with /api, replace it with the Netlify function path in production
  if (path.startsWith('/api')) {
    // In development, use the path as is, otherwise use Netlify function path
    return import.meta.env.DEV 
      ? path 
      : path.replace('/api', '/.netlify/functions/api');
  }
  
  // Return the path as is for other cases
  return path;
}

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    let errorMessage;
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || res.statusText;
    } catch (e) {
      errorMessage = await res.text() || res.statusText;
    }
    throw new Error(`${res.status}: ${errorMessage}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  try {
    const apiUrl = getApiUrl(url);
    const res = await fetch(apiUrl, {
      method,
      headers: data ? { "Content-Type": "application/json" } : {},
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    });

    await throwIfResNotOk(res);
    return res;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const apiUrl = getApiUrl(queryKey[0] as string);
    const res = await fetch(apiUrl, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
