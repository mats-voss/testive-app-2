import axios from 'axios';
import Auth0 from 'react-native-auth0';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export const backendInstance = axios.create({
  baseURL: 'http://localhost:6060/api/'
})

backendInstance.interceptors.request.use(
  async (config) => {
    const auth0Instance = new Auth0({
      domain: 'testive.eu.auth0.com',
      clientId: 'obVp9ol0AS8o2RTVmk722QLr4bx19Spr'
    })
    const credentials = await auth0Instance.credentialsManager.getCredentials()
    if (!credentials) {
      await auth0Instance.credentialsManager.clearCredentials()
      Toast.show({
        type: 'error',
        text1: 'Login ausgelaufen!',
        text2: 'Bitte melde dich neu an.'
      })
    }
    if (config.headers || !credentials.accessToken) {
      config.headers["Authorization"]=`Bearer ${credentials.accessToken}`;
      return config;
    } else {
      throw new Error('[AxiosBackendInstance] "access_token" not attached to headers!')
    }
  },
  (error) => {
    console.error('Backend Instance Error', error);
    Promise.reject(error);
  }
);
