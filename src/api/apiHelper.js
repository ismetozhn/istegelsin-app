import axios from 'axios';

// Axios instance'ını yapılandırma
const axiosInstance = axios.create({
  baseURL: 'https://ig.colaksoft.online/api/v1/',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json-patch+json' },
  auth: {
    username: 'Test',
    password: 'Test'
  }
});

// API yanıtını işlemek için yardımcı fonksiyon
const handleApiResponse = (response) => {
  if (response.data.IsSuccess) {
    console.log('Başarılı:', response.data);
    return response.data.Data;
  } else {
    throw new Error(response.data.Message);
  }
};

// Hata yakalama için yardımcı fonksiyon
const handleError = (error) => {
  if (error.response) {
    console.error('Hata Yanıtı:', error.response.data);
  } else if (error.request) {
    console.error('Yanıt alınamadı:', error.request);
  } else {
    console.error('İstek Hatası:', error.message);
  }
};

// API isteklerini göndermek için genel fonksiyon
const sendApiRequest = async (method, endpoint, data = null, params = {}, customBaseUrl = null) => {
  const url = customBaseUrl ? `${customBaseUrl}/${endpoint}` : `${axiosInstance.defaults.baseURL}${endpoint}`;
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      params
    });
    return handleApiResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export default sendApiRequest;