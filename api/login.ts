import { get, post } from '../utils/http';
/**
 * @description: 登陆
 * @author: 2024-06-04 11:27:46
 */

export interface DataType {
  username: string,
  password: string,
}
export interface ResType {
   status: {
    code: number,
    message: string,
   },
   data: {
    token: string,
   }
}
export const login = (data: DataType): Promise<ResType> => {
    return post('/api/login', data)
}