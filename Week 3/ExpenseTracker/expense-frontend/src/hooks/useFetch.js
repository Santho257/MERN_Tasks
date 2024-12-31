import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (
  url,
  headers = {},
  initial = {},
  dependencies = []
) => {
  const [data, setData] = useState(initial);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setErrors({});
      try {
        const result = await axios.get(url, {
          headers,
          signal: controller.signal,
        });
        setData(result.data.data);
      } catch (error) {
        setErrors(error.response?.data?.errors ?? { message: error.message });
      }
    };
    fetchData();
    return () => controller.abort();
  }, [
    url,
    ...dependencies,
    ...Object.keys(headers).map((key) => headers[key]),
  ]);
  return [data, setData, errors, setErrors];
};
