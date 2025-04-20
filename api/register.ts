import { get, post } from '../utils/http';
import { DataType } from './login';

/**
 * @description: 注册
 * @author: 2024-06-04 11:27:46
 */
interface paramsType extends DataType {
  email: string
}

export const regist = (data: paramsType) => {
    return post('/api/register', data)
}

export const sendEmail = (data: { email: string }) => {
    return post('/api/sendEmail', data)
}