import { UploadFile } from 'antd';
import { get, post } from '../utils/http';


/***
 * @description: 上传文件
 * @author: 2024-06-04 11:27:46
 */
interface UploadType  {
    file: UploadFile;
}

export const upLoad = (data: any) => {
    return post('/api/upload', data, {
        'headers': { 'Content-Type': 'multipart/form-data' }, // 设置请求头为 multipart/form-data
    }
    )
};


/***
 * @description: 获取上传历史
 * @author: 2024-06-04 11:27:46
 * */
interface ParamsType {
    page: number;
    pageSize: number;
    userId: number; // 用户id
}

export const getUploadHistory = (data?: ParamsType) => {
    return get('/api/getUploadHistory', data)
} 