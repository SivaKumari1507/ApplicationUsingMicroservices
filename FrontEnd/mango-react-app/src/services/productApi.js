import axios from 'axios';
import { getAuthHeader } from '../utils/auth';

const API_BASE = 'http://localhost:5016/api/product'; // adjust port if needed

export const getProducts = () => axios.get(API_BASE, getAuthHeader());
export const getProductById = (id) => axios.get(`${API_BASE}/${id}`, getAuthHeader());
export const addProduct = (product) => axios.post(API_BASE, product, getAuthHeader());
export const updateProduct = (product) => axios.put(API_BASE, product, getAuthHeader());
export const deleteProduct = (id) => axios.delete(`${API_BASE}/${id}`, getAuthHeader());