import { get, post } from '../utils/http';
import { ResType } from './login';

/** 
 * @description: 获取用户信息
 * @author: 2024-06-04 11:27:46
 * */ 

interface ParamsType {
    userId: string
}
export const getUserInfo = () => {
    return get('/api/getUserInfo')
}

/**
 * @description: 修改用户信息
 * @author: 2024-06-04 11:27:46
 * */
interface UserInfoType {
    name?: string,
    pwd?: string,
    email?: string, 
    avatar?: File,
}
export const updateUserInfo = (data: UserInfoType): Promise<ResType> => {
    return post('/api/updateUserInfo', data)
}

