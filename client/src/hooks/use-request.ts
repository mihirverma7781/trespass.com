"use client";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useState, useEffect } from "react";

interface IRequestParams {
  url: string;
  method?: "get" | "post" | "put" | "delete" | "patch";
  onSuccess?: (response: AxiosResponse) => void;
  onError?: (error: any) => void;
}

type IResponseParams = {
  doRequest: (
    body?: any,
    params?: Record<string, any>
  ) => Promise<AxiosResponse | void>;
  errors: any;
  isLoading: boolean;
};

export default ({
  url,
  method = "get",
  onSuccess = () => {},
  onError = () => {},
}: IRequestParams): IResponseParams => {
  const [errors, setErrors] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const doRequest = async (
    body?: any,
    params?: Record<string, any>
  ): Promise<AxiosResponse | void> => {
    try {
      setErrors(null);
      setIsLoading(true);

      const response: AxiosResponse = await axios.request({
        url,
        method,
        data: body,
        params,
      });

      // Trigger the success callback if provided
      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data as AxiosResponse;
    } catch (error: any) {
      if (onError) {
        onError(error);
      }
      setErrors(error.response?.data?.errors);
    } finally {
      setIsLoading(false);
    }
  };

  return { doRequest, errors, isLoading };
};
