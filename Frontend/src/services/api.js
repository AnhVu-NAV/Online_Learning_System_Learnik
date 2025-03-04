import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchCourses = () => API.get('/courses');
export const registerCourse = (userId, courseId) => API.post('/user_courses/register', { userId, courseId });
export const createPayment = (userId, courseId, amount) => API.post('/payment/create-payment', { userId, courseId, amount });

export default API;
