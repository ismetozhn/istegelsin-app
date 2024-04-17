import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://ig.colaksoft.online/api/v1/',
  timeout: 1000,
  headers: { 
    'Content-Type': 'application/json-patch+json',
    'company': 'true' // company bilgisini headers'a ekle
  },
});

const handleApiResponse = (response) => {
  if (response && response.data && response.data.isSuccess) {
    console.log('Başarılı:', response.data);
    return response.data.data;
  } else {
    const message = response && response.data && response.data.message ? response.data.message : 'Bilinmeyen hata';
    throw new Error(message);
  }
};

const handleError = (error) => {
  if (error.response) {
    console.error('Hata Yanıtı:', error.response.data);
  } else if (error.request) {
    console.error('Yanıt alınamadı:', error.request);
  } else {
    console.error('İstek Hatası:', error.message);
  }
};

export const get = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return handleApiResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const update = async (endpoint, data) => {
  try {
    const response = await axiosInstance.put(endpoint, data);
    return handleApiResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const del = async (endpoint) => {
  try {
    const response = await axiosInstance.delete(endpoint);
    return handleApiResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const add = async (endpoint, data) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return handleApiResponse(response);
  } catch (error) {
    handleError(error);
  }
};
