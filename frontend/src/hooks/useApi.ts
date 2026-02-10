import { useCallback, useEffect, useRef } from 'react';
import { useMutation, UseMutationOptions, UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import axiosInstance, { NormalizedError } from '@/api/axiosInstance';
import { useToast } from '@/components/ui/Toast';
import { queryClient } from '@/api/queryClient';

export const useApiQuery = <TQueryFnData = unknown, TData = TQueryFnData, TQueryKey extends readonly unknown[] = readonly unknown[]>(
  key: TQueryKey,
  url: string,
  options?: Partial<UseQueryOptions<TQueryFnData, NormalizedError, TData, TQueryKey>>
): UseQueryResult<TData, NormalizedError> => {
  const { push } = useToast();
  const lastError = useRef<string | null>(null);

  const queryResult = useQuery<TQueryFnData, NormalizedError, TData, TQueryKey>({
    queryKey: key,
    queryFn: async () => {
      const res = await axiosInstance.get(url);
      return res.data?.data ?? res.data;
    },
    ...options
  });

  useEffect(() => {
    const message = queryResult.error?.message;
    if (message && message !== lastError.current) {
      push({ variant: 'error', title: 'Error', description: message });
      lastError.current = message;
    }
  }, [queryResult.error, push]);

  return queryResult;
};

export const useApiMutation = <TData = unknown, TVariables = unknown, TContext = unknown>(
  url: string,
  method: 'post' | 'put' | 'patch' | 'delete' = 'post',
  options?: UseMutationOptions<TData, NormalizedError, TVariables, TContext>
) => {
  const { push } = useToast();

  const mutateFn = useCallback(
    async (variables: TVariables) => {
      if (options?.mutationFn) {
        return options.mutationFn(variables, {
          client: queryClient,
          meta: options.meta,
          mutationKey: options.mutationKey
        });
      }
      const res = await axiosInstance.request({ url, method, data: variables });
      return res.data?.data ?? res.data;
    },
    [method, url, options?.mutationFn, options?.meta, options?.mutationKey]
  );

  return useMutation<TData, NormalizedError, TVariables, TContext>({
    mutationFn: mutateFn,
    onError: (err) => push({ variant: 'error', title: 'Action failed', description: err.message }),
    ...options
  });
};
