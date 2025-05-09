import { createClient } from './index.js';

export const profileClient = createClient();

profileClient.interceptors.response.use(res => res.data);
