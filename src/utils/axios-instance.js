import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const METHOS_TYPE = {
  get: 'get',
  post: 'post',
  put: 'put',
  delete: 'delete',
};

export const HEADER_TYPES = {
  multipart: { 'Content-Type': 'multipart/form-data' },
  json: { 'Content-Type': 'application/json' },
};

export const callApi = async (path, method, headers, body) => {
  const url = `${BACKEND_URL}${path}`;
  try {
    const resp = await axios(url, {
      method,
      headers,
      data: body,
    });
    const { data, status } = resp;
    return { data, status };
  } catch (error) {
    if (error.response) {
      const { data, status } = error.response;
      return { data, status };
    }

    throw error.message;
  }
};
