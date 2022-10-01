import { APIError } from '../utils/APIError';

export const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const fetcher = async (endpoint: string) => {
  const res = await fetch(API_URL + endpoint);
  const values = await res.json();

  if (!res.ok) {
    const error = new APIError(res.status, values.error.message, values.error.title);

    throw error;
  }

  return values;
};
