const apiUrl = 'http://127.0.0.1:8000/api/v1';

export const fetchData = async (endpoint) => {
    const response = await fetch(`${apiUrl}/${endpoint}`);
    const data = await response.json();
    console.log(data)
    return data;
};
