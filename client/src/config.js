const API_URL = process.env.NODE_ENV === 'production' 
  ? process.env.REACT_APP_API_URL || '/api'
  : '/api';

export default API_URL;