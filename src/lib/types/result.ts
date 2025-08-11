export type Success<T> = {
  data: T;
  error: null;
};

export type Failure = {
  data: null;
  error: Error;
};

export type Result<T> = Success<T> | Failure;

export async function tryCatch<T>(
  promise: Promise<T>,
  options?: {
    onSuccess?: (data: T) => void;
    onError: (error: Error) => T,
    onFinally?: () => void
  }
): Promise<Result<T>> {
  try {
    const data = await promise;
    options?.onSuccess?.(data);
    return {
      data,
      error: null,
    };
  } catch (e) {
    options?.onError?.(e as Error);
    return {
      data: null,
      error: e as Error,
    };
  } finally {
    options?.onFinally?.();
  }
}
