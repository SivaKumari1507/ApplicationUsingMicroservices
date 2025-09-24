import axios from 'axios';
import { getAuthHeader } from '../utils/auth';

const API_BASE = 'http://localhost:5014/api/coupon';

export const getCoupons = () => axios.get(API_BASE, getAuthHeader());
export const getCouponById = (id) => axios.get(`${API_BASE}/${id}`, getAuthHeader());
export const getCouponByCode = (code) => axios.get(`${API_BASE}/GetByCode/${code}`, getAuthHeader());
export const addCoupon = (coupon) => axios.post(API_BASE, coupon, getAuthHeader());
export const updateCoupon = (coupon) => axios.put(API_BASE, coupon, getAuthHeader());
export const deleteCoupon = (id) => axios.delete(`${API_BASE}/${id}`, getAuthHeader());
