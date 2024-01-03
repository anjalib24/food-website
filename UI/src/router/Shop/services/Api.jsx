import axios from "axios";

const apiUrl = 'http://127.0.0.1:8000/api/v1';
const token = localStorage.getItem('token');

// export const fetchData = async (endpoint) => {
//     const response = await fetch(`${apiUrl}/${endpoint}`);
//     const data = await response.json();
//     return data;
// };

export const getshowingdata = async (endpoint) => {
    const response = await fetch(`${apiUrl}/${endpoint}`);
    const data = await response.json();
    return data;
};

export const fetchData = async (endpoint, params = {}) => {
    const url = new URL(`${apiUrl}/${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  export const registration = async (endpoint) => {
    const response = await fetch(`${apiUrl}/${endpoint}`);
    const data = await response.json();
    return data;
};


export const addtocart = async(data) =>{
  const response = await axios.post(`${apiUrl}/products/add-to-cart`, data, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return response;
 }


