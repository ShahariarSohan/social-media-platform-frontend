import { getCookie } from "./tokenHandler";


const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const serverFetchHelper = async (
  endpoint: string,
  options: RequestInit,
): Promise<Response> => {
  const { headers, ...restOptions } = options;
  const accessToken = await getCookie("accessToken");

  // if (endpoint !== "/auth/refresh-token") {
  //   await getNewAccessToken()
  // }
  const response = await fetch(`${baseUrl}${endpoint}`, {
    headers: {
      Cookie: accessToken ? `accessToken=${accessToken}` : "",
      ...headers,
    },
    ...restOptions,
  });
  return response;
};

export const serverFetch = {
  get: async (endpoint: string, options?: RequestInit): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "GET" }),
  post: async (endpoint: string, options: RequestInit): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "POST" }),
  patch: async (endpoint: string, options: RequestInit): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "PATCH" }),
  put: async (endpoint: string, options: RequestInit): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "PUT" }),
  delete: async (endpoint: string, options?: RequestInit): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "DELETE" }),
};
