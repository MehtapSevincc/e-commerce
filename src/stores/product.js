import axios from "axios";
import { fakeDatas } from "../data/data";
const API_URL = "https://5fc9346b2af77700165ae514.mockapi.io/products";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.map((product)=>({
        ...product,
        numPrice:parseFloat(product.price) || 0,
    }));
  } catch (error) {
    console.error("API failed,using fake data instead.", error);
    return fakeDatas;
  }
};
