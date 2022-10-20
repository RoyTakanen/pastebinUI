import { APIError } from '../utils/APIError';
import { PasteValue } from '../utils/types';
import { fetcher } from './helpers';

export const getPaste = async (
  id: string
): Promise<{
  error: APIError | null;
  data: PasteValue | null;
}> => {
  const res = await fetcher<PasteValue>(`/pastes/${id}`);

  if (res instanceof APIError) {
    return {
      error: res,
      data: null,
    };
  }

  return {
    error: null,
    data: res,
  };
};

export const getLatestPastes = async (): Promise<{
  error: APIError | null;
  data: PasteValue[] | null;
}> => {
  const res = await fetcher<PasteValue[]>('/pastes?sorting=-date');

  if (res instanceof APIError) {
    return {
      error: res,
      data: null,
    };
  }

  return {
    error: null,
    data: res,
  };
};
