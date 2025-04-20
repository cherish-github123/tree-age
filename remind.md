# 接口文档

登陆： /api/login
注册：/api/register
获取用户信息： /api/getUserInfo
修改用户信息：/api/updateUserInfo
上传文件：/api/upload
获取上传历史：/api/getUploadHistory

### 1. 登陆

#### 接口地址
```
GET /api/register
```

#### 请求参数

| 参数名 | 类型   | 是否必填 | 说明 |
| ------ | ------ | -------- | ---- |·
| password   | string | 是       | 密码 |
| username   | string | 是       | 用户名 |
| email      | string | 是       | 邮箱 |

#### 响应数据

{
  status:{
    code: 200,
    message: "success"
  }, 
}


### 2. 登陆


#### 接口地址
```
GET /api/login
```

#### 请求参数

| 参数名 | 类型   | 是否必填 | 说明 |
| ------ | ------ | -------- | ---- |·
| password   | string | 是       | 密码 |
| username   | string | 是       | 用户名 |
| email      | string | 是       | 邮箱 |

#### 响应数据

{
  status:{
    code: 200,
    message: "success"
  },
  data: {userid: 1, username: "admin", email: "admin@163.com"}
}

### 3. 获取用户信息

#### 接口地址
```
GET /api/getUserInfo
```

#### 请求参数

| 参数名 | 类型   | 是否必填 | 说明 |
| ------ | ------ | -------- | ---- |·
| userid   | int | 是       | 用户id |

#### 响应数据

{
  status:{
    code: 200,
    message: "success"
  },
  data: {userid: 1, username: "admin", email: "admin@163.com"}
}

### 4. 修改用户信息

#### 接口地址
```
POST /api/updateUserInfo
```

#### 请求参数

| 参数名 | 类型   | 是否必填 | 说明 |
| ------ | ------ | -------- | ---- |·
| username   | string | 否       | 用户名 |
| password   | string | 否       | 密码 |
| email      | string | 否       | 邮箱 |

#### 响应数据

{
  status:{
    code: 200,
    message: "success"
  },
}

### 5. 上传文件

#### 接口地址
```
POST /api/upload
```
#### 请求参数

| 参数名 | 类型   | 是否必填 | 说明 |
| ------ | ------ | -------- | ---- |·
| file   | file | 是       | 文件 |

#### 响应数据

{
  status:{
    code: 200,
    message: "success"
  },
}
### 6. 获取上传历史

#### 接口地址
```
GET /api/getUploadHistory
```

#### 请求参数

| 参数名 | 类型   | 是否必填 | 说明 |
| ------ | ------ | -------- | ---- |·
| userid   | int | 是       | 用户id |

#### 响应数据

{
  status:{
    code: 200,
    message: "success"
  },
  data: [
    {
      id: 1,
      filename: "test.txt",
      upload_time: "2020-01-01 12:00:00",
      recognize: "识别结果",
    },
  ]
  
}