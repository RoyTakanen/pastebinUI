import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import { APIError } from '../utils/APIError';
import { PasteValue } from '../utils/types';
import { fetcher } from './helpers';

export const useGetPaste = (id: string) =>
  useSWRImmutable<PasteValue, APIError>(`/pastes/${id}`, fetcher, {
    errorRetryCount: 3,
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

export const useGetLatestPastes = () =>
  useSWR<PasteValue[], APIError>('/pastes?sorting=-date', fetcher, {
    errorRetryCount: 3,
    revalidateOnFocus: true,
  });
