import axios from 'axios';
import { saveDataByKey, readDataByKey, Keys, clearAllData } from '../helpers/storage';
import { encode } from 'base-64';

const axiosInstance = axios.create({
  baseURL: 'https://ig.colaksoft.online/api/v1/',
  timeout: 1000,
});

const handleApiResponse = (response) => {
  if (response && response.data && response.data.isSuccess) {
    console.log('Başarılı:', response.data.data);
    return response.data;
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

export const get = async (endpoint, headers = {}, requireAuthorization = false) => {
  try {
    const updatedHeaders = await addHeaders(headers, requireAuthorization);
    const response = await axiosInstance.get(endpoint, { headers: updatedHeaders });
    return handleApiResponse(response);
  } catch (error) {
    handleError(error);
  }
};


const addHeaders = async (headers, requireAuthorization) => {
  if (requireAuthorization) {
    let assignedEmail;
    let password;
    try {
      assignedEmail = await readDataByKey(Keys.email);
      password = await readDataByKey(Keys.password);
    } catch (error) {
      throw new Error('Authorization gerekiyor, ancak accessToken bulunamadı.');
    }
    const basicAuthString = encode(`${assignedEmail}:${password}`);
    const updatedHeaders = { ...headers }; // Başlıkları kopyalayarak referansı değiştir
    updatedHeaders['Authorization'] = `Basic ${basicAuthString}`;
    return updatedHeaders; // Güncellenmiş başlıkları döndür
  } else {
    return headers; // Gereksizse başlıkları değiştirmeden döndür
  }
};

export const update = async (endpoint, data, headers = {}, requireAuthorization = false) => {
  try {
    console.log(requireAuthorization);
    const updatedHeaders = await addHeaders(headers, requireAuthorization); // Güncellenmiş başlıkları al
    console.log(updatedHeaders);
    const response = await axiosInstance.put(endpoint, data, { headers: updatedHeaders });
    return handleApiResponse(response);
  } catch (error) {
    handleError(error);
  }
};


export const del = async (endpoint, headers = {}, requireAuthorization = false,) => {
  try {
    const updatedHeaders = await addHeaders(headers, requireAuthorization);
    const response = await axiosInstance.delete(endpoint, { headers: updatedHeaders });
    return handleApiResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const add = async (endpoint, data, headers = {}, requireAuthorization = false) => {
  try {
    const updatedHeaders = await addHeaders(headers, requireAuthorization);
    const response = await axiosInstance.post(endpoint, data, { headers: updatedHeaders });
    return handleApiResponse(response);
  } catch (error) {
    handleError(error);
  }
};
