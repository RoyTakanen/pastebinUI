import useSWR from 'swr';
import { APIError } from '../utils/APIError';
import { PasteValue } from '../utils/types';
import { fetcher } from './helpers';

export const useGetPaste = (id: string) =>
  useSWR<PasteValue, APIError>(`/pastes/${id}`, fetcher, { errorRetryCount: 3 });

export const useGetLatestPastes = () =>
  useSWR<PasteValue[], APIError>('/pastes?sorting=-date', fetcher, { errorRetryCount: 3 });
