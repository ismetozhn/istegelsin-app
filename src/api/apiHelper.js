import axios from 'axios';

// Axios instance'ını yapılandırma
const axiosInstance = axios.create({
  baseURL: 'https://ig.colaksoft.online/api/v1/',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json-patch+json' },
  // Basic Authorization bilgilerini burada ekliyoruz
  auth: {
    username: 'test1@gmail.com',
    password: '123'
  }
});

// API yanıtını işlemek için yardımcı fonksiyon
const handleApiResponse = (response) => {
  // response nesnesinin varlığını ve içeriğini kontrol et
  if (response && response.data && response.data.isSuccess) {
    console.log('Başarılı:', response.data);
    return response.data.data;
  } else {
    // response.data.message varlığını kontrol et
    const message = response && response.data && response.data.message ? response.data.message : 'Bilinmeyen hata';
    throw new Error(message);
  }
};

// Hata yakalama için yardımcı fonksiyon
const handleError = (error) => {
  if (error.response) {
    // Hata yanıtını düzgün bir şekilde logla
    console.error('Hata Yanıtı:', error.response.data);
  } else if (error.request) {
    // Yanıt alınamadığında logla
    console.error('Yanıt alınamadı:', error.request);
  } else {
    // İstek hatasını logla
    console.error('İstek Hatası:', error.message);
  }
};

// API isteklerini göndermek için genel fonksiyon
const sendApiRequest = async (method, endpoint, data = null, params = {}, customBaseUrl = null) => {
  // Custom base URL varsa onu kullan
  const url = customBaseUrl ? `${customBaseUrl}/${endpoint}` : `${axiosInstance.defaults.baseURL}${endpoint}`;
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      params,
      // Her istek için Basic Authorization ekliyoruz
      auth: {
        username: 'test1@gmail.com',
        password: '123'
      }
    });
    return handleApiResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export default sendApiRequest;
