import useSWR from 'swr';
import { APIError } from '../utils/APIError';
import { PasteValue } from '../utils/types';
import { fetcher } from './helpers';

export const useGetPaste = (id: string) => useSWR<PasteValue, APIError>(`/pastes/${id}`, fetcher);
