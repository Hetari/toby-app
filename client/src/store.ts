import router from '@/router';
import axios from 'axios';

const store = {
  backend: {
    url: 'http://localhost:3000',
    api: '/api/v1',
  },
  checkAuth: () => {
    const jwtToken = localStorage.getItem('token');
    axios.defaults.baseURL = store.backend.url + store.backend.api;

    axios
      .post(
        store.backend.url + store.backend.api + '/is-logged-in/',
        {},
        {
          headers: { authorization: `Bearer ${jwtToken}` },
        }
      )
      .then((response) => {
        if (!response.data.success) {
          localStorage.removeItem('token');
          router.push('/login');
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/login');
      });
  },
};

export default store;
