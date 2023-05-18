import axios from "axios";

const API_URL = "https://localhost:7119";

export const getAllDishes = async() => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/api/Dishes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getDish = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/api/Dishes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addDish = async (product) => {
  try {
    const token = localStorage.getItem('token');
    await axios.post(`${API_URL}/api/Dishes`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateDish = async (id, product) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/api/Dishes/${id}`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteDish = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/api/Dishes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export async function getDishIngredient(id) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/Dishes/GetDishIngredient?dish_id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
    } catch (error) {
    console.log(error);
  }
}

export const getTypeByTypeId = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/Dishes/GetTypeByTypeId?type_id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProviders = async() => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/api/Providers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getProvider = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/Providers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  const data = await response.json();
  return data;
  } catch (error) {
    console.log(error);
  }
}

export const addProvider = async (provider) => {
  try {
    const token = localStorage.getItem('token');
    await axios.post(`${API_URL}/api/Providers`, provider, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProvider = async (id, provider) =>  {
  try {
    const token = localStorage.getItem('token');
    await axios.put(`${API_URL}/api/Providers/${id}`, provider, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export const deleteProvider = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/api/Providers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllSales = async() => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/Sales`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  const data = await response.json();
  return data;
  } catch (error) {
    console.log(error);
  }
}

export const addSale = async (sale) => {
  try {
    const token = localStorage.getItem('token');
    await axios.post(`${API_URL}/api/Sales`, sale, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteSale = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/api/Sales/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTotalRevenue = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/Sales/GetTotalRevenue`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  const data = await response.json();
  return data;
  } catch (error) {
    console.log(error);
  }
};

export const authMethod = async ( email, password) => { 
  try {
    const response = await axios.post(`${API_URL}/api/UserAuth/authenticate?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
    const { token } = response.data;
    localStorage.setItem('token', token);  
    return response;  
  } catch (error) {
    console.log(error);
  }
}