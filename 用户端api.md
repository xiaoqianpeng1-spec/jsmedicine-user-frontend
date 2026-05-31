---
title: 默认模块
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.30"

---

# 默认模块

Base URLs:

# Authentication

# 用户端认证

## POST 用户端账号密码登录

POST /api/v1/app/auth/login

用户端账号密码登录

> Body 请求参数

```json
{
  "username": "string",
  "password": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|
|body|body|[AppLoginRequest](#schemaapploginrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "tokenType": "string",
    "accessToken": "string",
    "expiresIn": 0,
    "user": {
      "id": 0,
      "username": "string",
      "nickname": "string",
      "avatarUrl": "string",
      "lastLoginAt": "string"
    }
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseAppLoginResponse](#schemaapiresponseapploginresponse)|

## POST 发送用户端手机号验证码

POST /api/v1/app/auth/sms-code

发送用户端手机号验证码

> Body 请求参数

```json
{
  "mobile": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|
|body|body|[AppSmsCodeRequest](#schemaappsmscoderequest)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseVoid](#schemaapiresponsevoid)|

## POST 用户端手机号验证码登录

POST /api/v1/app/auth/sms-login

用户端手机号验证码登录

> Body 请求参数

```json
{
  "mobile": "string",
  "code": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|
|body|body|[AppSmsLoginRequest](#schemaappsmsloginrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "tokenType": "string",
    "accessToken": "string",
    "expiresIn": 0,
    "user": {
      "id": 0,
      "username": "string",
      "nickname": "string",
      "avatarUrl": "string",
      "lastLoginAt": "string"
    }
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseAppLoginResponse](#schemaapiresponseapploginresponse)|

## POST 用户端微信授权登录

POST /api/v1/app/auth/wechat-login

用户端微信授权登录

> Body 请求参数

```json
{
  "code": "string",
  "nickname": "string",
  "avatarUrl": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|
|body|body|[AppWechatLoginRequest](#schemaappwechatloginrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "registered": true,
    "needBindMobile": true,
    "bindToken": "string",
    "tokenType": "string",
    "accessToken": "string",
    "expiresIn": 0,
    "user": {
      "id": 0,
      "username": "string",
      "nickname": "string",
      "avatarUrl": "string",
      "lastLoginAt": "string"
    }
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseAppWechatLoginResponse](#schemaapiresponseappwechatloginresponse)|

## POST 用户端微信授权绑定手机号

POST /api/v1/app/auth/wechat-bind-mobile

用户端微信授权绑定手机号

> Body 请求参数

```json
{
  "bindToken": "string",
  "mobile": "string",
  "code": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|
|body|body|[AppWechatBindMobileRequest](#schemaappwechatbindmobilerequest)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "tokenType": "string",
    "accessToken": "string",
    "expiresIn": 0,
    "user": {
      "id": 0,
      "username": "string",
      "nickname": "string",
      "avatarUrl": "string",
      "lastLoginAt": "string"
    }
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseAppLoginResponse](#schemaapiresponseapploginresponse)|

## POST 用户端退出登录

POST /api/v1/app/auth/logout

用户端退出登录

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseVoid](#schemaapiresponsevoid)|

## GET 获取当前登录用户

GET /api/v1/app/auth/me

获取当前登录用户

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "username": "string",
    "nickname": "string",
    "avatarUrl": "string",
    "mobile": "string",
    "email": "string",
    "profileCompleted": true,
    "studentId": 0,
    "certificationStatus": "UNSUBMITTED"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseCurrentAppUserResponse](#schemaapiresponsecurrentappuserresponse)|

## GET 校验用户端登录状态

GET /api/v1/app/auth/status

校验用户端登录状态

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": true
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseBoolean](#schemaapiresponseboolean)|

# 用户端互动

## POST 发起咨询

POST /api/v1/app/interaction/qa/questions

发起咨询

> Body 请求参数

```json
{
  "expertCategoryId": 0,
  "expertId": 0,
  "title": "string",
  "content": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|
|body|body|[AppQaQuestionRequest](#schemaappqaquestionrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "expertCategoryId": 0,
    "expertId": 0,
    "title": "string",
    "content": "string",
    "status": "PENDING",
    "answers": [
      {
        "id": 0,
        "questionId": 0,
        "adminId": 0,
        "expertId": 0,
        "content": "string",
        "answeredAt": "string"
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseAppQaQuestionResponse](#schemaapiresponseappqaquestionresponse)|

## GET 我的咨询列表

GET /api/v1/app/interaction/qa/questions

我的咨询列表

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 是 |none|
|size|query|integer| 是 |none|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "records": [
      {
        "id": 0,
        "expertCategoryId": 0,
        "expertId": 0,
        "title": "string",
        "content": "string",
        "status": "PENDING",
        "answers": [
          {
            "id": null,
            "questionId": null,
            "adminId": null,
            "expertId": null,
            "content": null,
            "answeredAt": null
          }
        ]
      }
    ],
    "total": 0,
    "page": 0,
    "size": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponsePageResponseAppQaQuestionResponse](#schemaapiresponsepageresponseappqaquestionresponse)|

## GET 我的咨询详情

GET /api/v1/app/interaction/qa/questions/{id}

我的咨询详情

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "expertCategoryId": 0,
    "expertId": 0,
    "title": "string",
    "content": "string",
    "status": "PENDING",
    "answers": [
      {
        "id": 0,
        "questionId": 0,
        "adminId": 0,
        "expertId": 0,
        "content": "string",
        "answeredAt": "string"
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseAppQaQuestionResponse](#schemaapiresponseappqaquestionresponse)|

## POST 提交反馈

POST /api/v1/app/interaction/feedbacks

提交反馈

> Body 请求参数

```json
{
  "feedbackType": "string",
  "content": "string",
  "contact": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|
|body|body|[AppFeedbackRequest](#schemaappfeedbackrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "userId": 0,
    "studentId": 0,
    "feedbackType": "string",
    "content": "string",
    "contact": "string",
    "status": "PENDING",
    "processedBy": 0,
    "processedAt": "string",
    "processNote": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseFeedbackResponse](#schemaapiresponsefeedbackresponse)|

# 用户端知识库

## GET 知识库分类树

GET /api/v1/app/knowledge/categories/tree

知识库分类树

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": [
    {
      "id": 0,
      "parentId": 0,
      "categoryName": "string",
      "categoryCode": "string",
      "description": "string",
      "sortOrder": 0,
      "children": [
        {
          "id": 0,
          "parentId": 0,
          "categoryName": "string",
          "categoryCode": "string",
          "description": "string",
          "sortOrder": 0,
          "children": [
            {}
          ]
        }
      ]
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseListAppKnowledgeCategoryResponse](#schemaapiresponselistappknowledgecategoryresponse)|

## GET 搜索知识库条目

GET /api/v1/app/knowledge/entries

搜索知识库条目

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 是 |none|
|size|query|integer| 是 |none|
|keyword|query|string| 否 |none|
|categoryId|query|integer| 否 |none|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "records": [
      {
        "id": 0,
        "title": "string",
        "summary": "string",
        "categoryId": 0,
        "categoryName": "string",
        "categoryCode": "string"
      }
    ],
    "total": 0,
    "page": 0,
    "size": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponsePageResponseAppKnowledgeSearchResult](#schemaapiresponsepageresponseappknowledgesearchresult)|

## GET 知识库条目详情

GET /api/v1/app/knowledge/entries/{id}

知识库条目详情

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "categoryId": 0,
    "title": "string",
    "summary": "string",
    "coverUrl": "string",
    "content": "string",
    "keywords": "string",
    "source": "string",
    "sortOrder": 0,
    "viewCount": 0,
    "publishedAt": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseAppKnowledgeEntryResponse](#schemaapiresponseappknowledgeentryresponse)|

# 用户端直播

## GET 分页查询直播

GET /api/v1/app/live-sessions

分页查询直播

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 是 |none|
|size|query|integer| 是 |none|
|keyword|query|string| 否 |none|
|liveStatus|query|string| 否 | NOT_STARTED :NOT_STARTED|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

#### 详细说明

**liveStatus**:  NOT_STARTED :NOT_STARTED
LIVE :LIVE
ENDED :ENDED
CANCELED :CANCELED

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "records": [
      {
        "id": 0,
        "title": "string",
        "coverUrl": "string",
        "anchorName": "string",
        "speakerName": "string",
        "tags": [
          "string"
        ],
        "liveUrl": "string",
        "playbackUrl": "string",
        "startAt": "string",
        "endAt": "string",
        "reviewStatus": "DRAFT",
        "liveStatus": "NOT_STARTED",
        "videos": [
          {
            "id": null,
            "liveSessionId": null,
            "title": null,
            "videoUrl": null,
            "durationSeconds": null,
            "sortOrder": null,
            "status": null
          }
        ]
      }
    ],
    "total": 0,
    "page": 0,
    "size": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponsePageResponseLiveSessionResponse](#schemaapiresponsepageresponselivesessionresponse)|

## GET 直播详情

GET /api/v1/app/live-sessions/{id}

直播详情

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "title": "string",
    "coverUrl": "string",
    "anchorName": "string",
    "speakerName": "string",
    "tags": [
      "string"
    ],
    "liveUrl": "string",
    "playbackUrl": "string",
    "startAt": "string",
    "endAt": "string",
    "reviewStatus": "DRAFT",
    "liveStatus": "NOT_STARTED",
    "videos": [
      {
        "id": 0,
        "liveSessionId": 0,
        "title": "string",
        "videoUrl": "string",
        "durationSeconds": 0,
        "sortOrder": 0,
        "status": "DISABLED"
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseLiveSessionResponse](#schemaapiresponselivesessionresponse)|

# 用户端学习资源

## GET 分页查询课程

GET /api/v1/app/learning/courses

分页查询课程

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 是 |none|
|size|query|integer| 是 |none|
|sort|query|string| 否 |none|
|keyword|query|string| 否 |none|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "records": [
      {
        "id": 0,
        "courseName": "string",
        "subtitle": "string",
        "coverUrl": "string",
        "lecturerName": "string",
        "introduction": "string",
        "paperId": 0,
        "publishedAt": "string",
        "progressPercent": 0,
        "studySeconds": 0,
        "videos": [
          {
            "id": null,
            "courseId": null,
            "title": null,
            "videoUrl": null,
            "durationSeconds": null,
            "paperId": null,
            "sortOrder": null
          }
        ]
      }
    ],
    "total": 0,
    "page": 0,
    "size": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponsePageResponseAppCourseResponse](#schemaapiresponsepageresponseappcourseresponse)|

## GET 课程详情

GET /api/v1/app/learning/courses/{id}

课程详情

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "courseName": "string",
    "subtitle": "string",
    "coverUrl": "string",
    "lecturerName": "string",
    "introduction": "string",
    "paperId": 0,
    "publishedAt": "string",
    "progressPercent": 0,
    "studySeconds": 0,
    "videos": [
      {
        "id": 0,
        "courseId": 0,
        "title": "string",
        "videoUrl": "string",
        "durationSeconds": 0,
        "paperId": 0,
        "sortOrder": 0
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseAppCourseResponse](#schemaapiresponseappcourseresponse)|

## GET 课程视频详情

GET /api/v1/app/learning/courses/{courseId}/videos/{videoId}

课程视频详情

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|courseId|path|integer| 是 |none|
|videoId|path|integer| 是 |none|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "courseId": 0,
    "title": "string",
    "videoUrl": "string",
    "durationSeconds": 0,
    "paperId": 0,
    "sortOrder": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseAppCourseVideoResponse](#schemaapiresponseappcoursevideoresponse)|

## GET 分页查询图书分类

GET /api/v1/app/learning/book-categories

分页查询图书分类

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 是 |none|
|size|query|integer| 是 |none|
|sort|query|string| 否 |none|
|keyword|query|string| 否 |none|
|parentId|query|integer| 否 |none|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "records": [
      {
        "id": 0,
        "parentId": 0,
        "categoryName": "string",
        "sortOrder": 0
      }
    ],
    "total": 0,
    "page": 0,
    "size": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponsePageResponseAppBookCategoryResponse](#schemaapiresponsepageresponseappbookcategoryresponse)|

## GET 分页查询图书

GET /api/v1/app/learning/books

分页查询图书

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 是 |none|
|size|query|integer| 是 |none|
|sort|query|string| 否 |none|
|keyword|query|string| 否 |none|
|categoryId|query|integer| 否 |none|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "records": [
      {
        "id": 0,
        "categoryId": 0,
        "bookName": "string",
        "author": "string",
        "publisher": "string",
        "coverUrl": "string",
        "introduction": "string",
        "totalPages": 0,
        "paperId": 0,
        "publishedAt": "string",
        "progressPercent": 0,
        "studySeconds": 0,
        "chapters": [
          {
            "id": null,
            "bookId": null,
            "parentId": null,
            "chapterTitle": null,
            "content": null,
            "startPage": null,
            "pageCount": null,
            "paperId": null,
            "sortOrder": null
          }
        ]
      }
    ],
    "total": 0,
    "page": 0,
    "size": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponsePageResponseAppBookResponse](#schemaapiresponsepageresponseappbookresponse)|

## GET 图书详情

GET /api/v1/app/learning/books/{id}

图书详情

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "categoryId": 0,
    "bookName": "string",
    "author": "string",
    "publisher": "string",
    "coverUrl": "string",
    "introduction": "string",
    "totalPages": 0,
    "paperId": 0,
    "publishedAt": "string",
    "progressPercent": 0,
    "studySeconds": 0,
    "chapters": [
      {
        "id": 0,
        "bookId": 0,
        "parentId": 0,
        "chapterTitle": "string",
        "content": "string",
        "startPage": 0,
        "pageCount": 0,
        "paperId": 0,
        "sortOrder": 0
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseAppBookResponse](#schemaapiresponseappbookresponse)|

## GET 图书章节详情

GET /api/v1/app/learning/books/{bookId}/chapters/{chapterId}

图书章节详情

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|bookId|path|integer| 是 |none|
|chapterId|path|integer| 是 |none|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "bookId": 0,
    "parentId": 0,
    "chapterTitle": "string",
    "content": "string",
    "startPage": 0,
    "pageCount": 0,
    "paperId": 0,
    "sortOrder": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseAppBookChapterResponse](#schemaapiresponseappbookchapterresponse)|

## GET 分页查询播客

GET /api/v1/app/learning/podcasts

分页查询播客

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 是 |none|
|size|query|integer| 是 |none|
|sort|query|string| 否 |none|
|keyword|query|string| 否 |none|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "records": [
      {
        "id": 0,
        "title": "string",
        "summary": "string",
        "coverUrl": "string",
        "speakerName": "string",
        "tags": [
          "string"
        ],
        "publishedAt": "string",
        "progressPercent": 0,
        "studySeconds": 0,
        "audios": [
          {
            "id": null,
            "podcastId": null,
            "title": null,
            "audioUrl": null,
            "durationSeconds": null,
            "paperId": null,
            "sortOrder": null
          }
        ]
      }
    ],
    "total": 0,
    "page": 0,
    "size": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponsePageResponseAppPodcastResponse](#schemaapiresponsepageresponseapppodcastresponse)|

## GET 播客详情

GET /api/v1/app/learning/podcasts/{id}

播客详情

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "title": "string",
    "summary": "string",
    "coverUrl": "string",
    "speakerName": "string",
    "tags": [
      "string"
    ],
    "publishedAt": "string",
    "progressPercent": 0,
    "studySeconds": 0,
    "audios": [
      {
        "id": 0,
        "podcastId": 0,
        "title": "string",
        "audioUrl": "string",
        "durationSeconds": 0,
        "paperId": 0,
        "sortOrder": 0
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseAppPodcastResponse](#schemaapiresponseapppodcastresponse)|

## GET 分页查询考卷

GET /api/v1/app/learning/exam-papers

分页查询考卷

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 是 |none|
|size|query|integer| 是 |none|
|sort|query|string| 否 |none|
|keyword|query|string| 否 |none|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "records": [
      {
        "id": 0,
        "paperName": "string",
        "description": "string",
        "totalScore": 0,
        "passScore": 0,
        "durationMinutes": 0,
        "status": "DISABLED",
        "questions": [
          {
            "questionId": null,
            "questionType": null,
            "title": null,
            "difficulty": null,
            "score": null,
            "sortOrder": null,
            "options": null
          }
        ]
      }
    ],
    "total": 0,
    "page": 0,
    "size": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponsePageResponseAppExamPaperResponse](#schemaapiresponsepageresponseappexampaperresponse)|

## GET 考卷详情

GET /api/v1/app/learning/exam-papers/{id}

考卷详情

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "paperName": "string",
    "description": "string",
    "totalScore": 0,
    "passScore": 0,
    "durationMinutes": 0,
    "status": "DISABLED",
    "questions": [
      {
        "questionId": 0,
        "questionType": "SINGLE_CHOICE",
        "title": "string",
        "difficulty": "EASY",
        "score": 0,
        "sortOrder": 0,
        "options": [
          {
            "id": null,
            "optionKey": null,
            "optionContent": null,
            "sortOrder": null
          }
        ]
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseAppExamPaperResponse](#schemaapiresponseappexampaperresponse)|

## POST 提交考卷答案

POST /api/v1/app/learning/exam-papers/{id}/submit

提交考卷答案

> Body 请求参数

```json
{
  "sourceType": "string",
  "sourceId": 0,
  "answers": [
    {
      "questionId": 0,
      "answerContent": "string"
    }
  ]
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|
|body|body|[AppExamSubmitRequest](#schemaappexamsubmitrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "studentId": 0,
    "paperId": 0,
    "paperName": "string",
    "sourceType": "string",
    "sourceId": 0,
    "score": 0,
    "passed": 0,
    "startedAt": "string",
    "submittedAt": "string",
    "answers": [
      {
        "questionId": 0,
        "questionType": "SINGLE_CHOICE",
        "title": "string",
        "answerContent": "string",
        "correctAnswer": "string",
        "analysis": "string",
        "score": 0,
        "correct": 0,
        "options": [
          {
            "id": null,
            "optionKey": null,
            "optionContent": null,
            "sortOrder": null
          }
        ]
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseAppExamRecordResponse](#schemaapiresponseappexamrecordresponse)|

## GET 分页查询考试记录

GET /api/v1/app/learning/exam-records

分页查询考试记录

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 是 |none|
|size|query|integer| 是 |none|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "records": [
      {
        "id": 0,
        "studentId": 0,
        "paperId": 0,
        "paperName": "string",
        "sourceType": "string",
        "sourceId": 0,
        "score": 0,
        "passed": 0,
        "startedAt": "string",
        "submittedAt": "string",
        "answers": [
          {
            "questionId": null,
            "questionType": null,
            "title": null,
            "answerContent": null,
            "correctAnswer": null,
            "analysis": null,
            "score": null,
            "correct": null,
            "options": null
          }
        ]
      }
    ],
    "total": 0,
    "page": 0,
    "size": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponsePageResponseAppExamRecordResponse](#schemaapiresponsepageresponseappexamrecordresponse)|

## GET 考试结果与解析

GET /api/v1/app/learning/exam-records/{id}

考试结果与解析

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "studentId": 0,
    "paperId": 0,
    "paperName": "string",
    "sourceType": "string",
    "sourceId": 0,
    "score": 0,
    "passed": 0,
    "startedAt": "string",
    "submittedAt": "string",
    "answers": [
      {
        "questionId": 0,
        "questionType": "SINGLE_CHOICE",
        "title": "string",
        "answerContent": "string",
        "correctAnswer": "string",
        "analysis": "string",
        "score": 0,
        "correct": 0,
        "options": [
          {
            "id": null,
            "optionKey": null,
            "optionContent": null,
            "sortOrder": null
          }
        ]
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseAppExamRecordResponse](#schemaapiresponseappexamrecordresponse)|

## GET 分页查询专题

GET /api/v1/app/learning/topics

分页查询专题

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 是 |none|
|size|query|integer| 是 |none|
|sort|query|string| 否 |none|
|keyword|query|string| 否 |none|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "records": [
      {
        "id": 0,
        "title": "string",
        "summary": "string",
        "learningRequirements": "string",
        "coverUrl": "string",
        "viewCount": 0,
        "publishedAt": "string",
        "items": [
          {
            "id": null,
            "topicId": null,
            "itemType": null,
            "itemId": null,
            "sortOrder": null,
            "resource": null
          }
        ]
      }
    ],
    "total": 0,
    "page": 0,
    "size": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponsePageResponseAppTopicResponse](#schemaapiresponsepageresponseapptopicresponse)|

## GET 专题详情

GET /api/v1/app/learning/topics/{id}

专题详情

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "title": "string",
    "summary": "string",
    "learningRequirements": "string",
    "coverUrl": "string",
    "viewCount": 0,
    "publishedAt": "string",
    "items": [
      {
        "id": 0,
        "topicId": 0,
        "itemType": "string",
        "itemId": 0,
        "sortOrder": 0,
        "resource": {}
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseAppTopicResponse](#schemaapiresponseapptopicresponse)|

## POST 同步学习记录

POST /api/v1/app/learning/records

同步学习记录

> Body 请求参数

```json
{
  "resourceType": "string",
  "resourceId": 0,
  "studySeconds": 0,
  "progressPercent": 100,
  "completed": true
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|
|body|body|[AppLearningRecordRequest](#schemaapplearningrecordrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "studentId": 0,
    "resourceType": "string",
    "resourceId": 0,
    "studySeconds": 0,
    "progressPercent": 0,
    "completed": 0,
    "completedAt": "string",
    "lastStudiedAt": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseAppLearningRecordResponse](#schemaapiresponseapplearningrecordresponse)|

# 用户端专家

## GET 分页查询专家分类

GET /api/v1/app/experts/categories

分页查询专家分类

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 是 |none|
|size|query|integer| 是 |none|
|keyword|query|string| 否 |none|
|parentId|query|integer| 否 |none|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "records": [
      {
        "id": 0,
        "parentId": 0,
        "categoryName": "string",
        "sortOrder": 0
      }
    ],
    "total": 0,
    "page": 0,
    "size": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponsePageResponseAppExpertCategoryResponse](#schemaapiresponsepageresponseappexpertcategoryresponse)|

## GET 分页查询可咨询专家

GET /api/v1/app/experts

分页查询可咨询专家

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 是 |none|
|size|query|integer| 是 |none|
|keyword|query|string| 否 |none|
|categoryId|query|integer| 否 |none|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "records": [
      {
        "id": 0,
        "realName": "string",
        "gender": "UNKNOWN",
        "birthDate": "string",
        "mobile": "string",
        "avatarUrl": "string",
        "coverUrl": "string",
        "title": "string",
        "organization": "string",
        "specialty": "string",
        "introduction": "string",
        "consultationNotice": "string",
        "sortOrder": 0,
        "categoryIds": [
          0
        ],
        "experiences": [
          {
            "id": null,
            "expertId": null,
            "experienceType": null,
            "title": null,
            "description": null,
            "startDate": null,
            "endDate": null,
            "sortOrder": null
          }
        ]
      }
    ],
    "total": 0,
    "page": 0,
    "size": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponsePageResponseAppExpertResponse](#schemaapiresponsepageresponseappexpertresponse)|

## GET 专家详情

GET /api/v1/app/experts/{id}

专家详情

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "realName": "string",
    "gender": "UNKNOWN",
    "birthDate": "string",
    "mobile": "string",
    "avatarUrl": "string",
    "coverUrl": "string",
    "title": "string",
    "organization": "string",
    "specialty": "string",
    "introduction": "string",
    "consultationNotice": "string",
    "sortOrder": 0,
    "categoryIds": [
      0
    ],
    "experiences": [
      {
        "id": 0,
        "expertId": 0,
        "experienceType": "EDUCATION",
        "title": "string",
        "description": "string",
        "startDate": "string",
        "endDate": "string",
        "sortOrder": 0
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseAppExpertResponse](#schemaapiresponseappexpertresponse)|

# 用户端个人中心

## GET 获取用户端个人资料

GET /api/v1/app/profile

获取用户端个人资料

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "username": "string",
    "mobile": "string",
    "email": "string",
    "nickname": "string",
    "profileSignature": "string",
    "avatarUrl": "string",
    "authProvider": "WECHAT_MINIAPP",
    "gender": "UNKNOWN",
    "status": "DISABLED",
    "profileCompleted": true,
    "studentId": 0,
    "certificationStatus": "UNSUBMITTED"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseAppProfileResponse](#schemaapiresponseappprofileresponse)|

## PUT 修改用户端个人资料

PUT /api/v1/app/profile

修改用户端个人资料

> Body 请求参数

```json
{
  "nickname": "string",
  "profileSignature": "string",
  "avatarUrl": "string",
  "email": "user@example.com",
  "gender": "UNKNOWN"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|
|body|body|[AppProfileUpdateRequest](#schemaappprofileupdaterequest)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "username": "string",
    "mobile": "string",
    "email": "string",
    "nickname": "string",
    "profileSignature": "string",
    "avatarUrl": "string",
    "authProvider": "WECHAT_MINIAPP",
    "gender": "UNKNOWN",
    "status": "DISABLED",
    "profileCompleted": true,
    "studentId": 0,
    "certificationStatus": "UNSUBMITTED"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseAppProfileResponse](#schemaapiresponseappprofileresponse)|

## POST 申请头像上传地址

POST /api/v1/app/profile/avatar/upload-url

申请头像上传地址

> Body 请求参数

```json
{
  "originalName": "string",
  "contentType": "string",
  "fileSize": 1
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|
|body|body|[AppAvatarUploadRequest](#schemaappavataruploadrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "method": "string",
    "uploadUrl": "string",
    "bucketName": "string",
    "objectKey": "string",
    "contentType": "string",
    "fileSize": 0,
    "expiresAt": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseAppAvatarUploadResponse](#schemaapiresponseappavataruploadresponse)|

## POST 确认头像上传

POST /api/v1/app/profile/avatar/confirm

确认头像上传

> Body 请求参数

```json
{
  "objectKey": "string",
  "originalName": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|
|body|body|[AppAvatarConfirmRequest](#schemaappavatarconfirmrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "username": "string",
    "mobile": "string",
    "email": "string",
    "nickname": "string",
    "profileSignature": "string",
    "avatarUrl": "string",
    "authProvider": "WECHAT_MINIAPP",
    "gender": "UNKNOWN",
    "status": "DISABLED",
    "profileCompleted": true,
    "studentId": 0,
    "certificationStatus": "UNSUBMITTED"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseAppProfileResponse](#schemaapiresponseappprofileresponse)|

## POST 提交学员认证申请

POST /api/v1/app/profile/certification

提交学员认证申请

> Body 请求参数

```json
{
  "realName": "string",
  "mobile": "string",
  "idCardNo": "string",
  "province": "string",
  "provinceCode": "string",
  "city": "string",
  "cityCode": "string",
  "district": "string",
  "districtCode": "string",
  "organization": "string",
  "organizationId": 0,
  "positionTitle": "string",
  "practiceTypeId": 0,
  "certificationMaterials": "string",
  "certificationFiles": [
    {
      "fileAssetId": 0,
      "sourceUrl": "string",
      "materialType": "string",
      "sortOrder": 0
    }
  ]
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|
|body|body|[AppStudentCertificationRequest](#schemaappstudentcertificationrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "studentId": 0,
    "studentNo": "string",
    "realName": "string",
    "mobile": "string",
    "province": "string",
    "provinceCode": "string",
    "city": "string",
    "cityCode": "string",
    "district": "string",
    "districtCode": "string",
    "organization": "string",
    "organizationId": 0,
    "positionTitle": "string",
    "practiceTypeId": 0,
    "status": "DISABLED",
    "certificationStatus": "UNSUBMITTED",
    "certificationSubmittedAt": "string",
    "certificationReviewedAt": "string",
    "rejectReason": "string",
    "certificationMaterials": "string",
    "certificationFiles": [
      {
        "id": 0,
        "fileAssetId": 0,
        "sourceUrl": "string",
        "materialType": "string",
        "sortOrder": 0
      }
    ],
    "enrolledAt": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseAppStudentCertificationResponse](#schemaapiresponseappstudentcertificationresponse)|

## GET 查询学员认证结果

GET /api/v1/app/profile/certification

查询学员认证结果

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "studentId": 0,
    "studentNo": "string",
    "realName": "string",
    "mobile": "string",
    "province": "string",
    "provinceCode": "string",
    "city": "string",
    "cityCode": "string",
    "district": "string",
    "districtCode": "string",
    "organization": "string",
    "organizationId": 0,
    "positionTitle": "string",
    "practiceTypeId": 0,
    "status": "DISABLED",
    "certificationStatus": "UNSUBMITTED",
    "certificationSubmittedAt": "string",
    "certificationReviewedAt": "string",
    "rejectReason": "string",
    "certificationMaterials": "string",
    "certificationFiles": [
      {
        "id": 0,
        "fileAssetId": 0,
        "sourceUrl": "string",
        "materialType": "string",
        "sortOrder": 0
      }
    ],
    "enrolledAt": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseAppStudentCertificationResponse](#schemaapiresponseappstudentcertificationresponse)|

## GET 查询我的收藏

GET /api/v1/app/profile/favorites

查询我的收藏

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 是 |none|
|size|query|integer| 是 |none|
|sort|query|string| 否 |none|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "records": [
      {
        "id": 0,
        "resourceType": "string",
        "resourceId": 0,
        "source": "string",
        "viewCount": 0,
        "occurredAt": "string"
      }
    ],
    "total": 0,
    "page": 0,
    "size": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponsePageResponseAppResourceRecordResponse](#schemaapiresponsepageresponseappresourcerecordresponse)|

## GET 查询浏览记录

GET /api/v1/app/profile/browse-histories

查询浏览记录

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 是 |none|
|size|query|integer| 是 |none|
|sort|query|string| 否 |none|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "records": [
      {
        "id": 0,
        "resourceType": "string",
        "resourceId": 0,
        "source": "string",
        "viewCount": 0,
        "occurredAt": "string"
      }
    ],
    "total": 0,
    "page": 0,
    "size": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponsePageResponseAppResourceRecordResponse](#schemaapiresponsepageresponseappresourcerecordresponse)|

## GET 查询个人中心聚合信息

GET /api/v1/app/profile/summary

查询个人中心聚合信息

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "profile": {
      "id": 0,
      "username": "string",
      "mobile": "string",
      "email": "string",
      "nickname": "string",
      "profileSignature": "string",
      "avatarUrl": "string",
      "authProvider": "WECHAT_MINIAPP",
      "gender": "UNKNOWN",
      "status": "DISABLED",
      "profileCompleted": true,
      "studentId": 0,
      "certificationStatus": "UNSUBMITTED"
    },
    "certificationStatus": "UNSUBMITTED",
    "favoriteCount": 0,
    "browseHistoryCount": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseAppProfileSummaryResponse](#schemaapiresponseappprofilesummaryresponse)|

# 公共文件资源

## GET 读取公开图片资源内容

GET /api/v1/files/{id}/content

读取公开图片资源内容

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|
|Authorization|header|string| 否 |none|
|Content-Type|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "inputStreamSource": {},
  "description": "string",
  "equality": {},
  "read": false
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResponseEntityInputStreamResource](#schemaresponseentityinputstreamresource)|

# 数据模型

<h2 id="tocS_ApiResponseVoid">ApiResponseVoid</h2>

<a id="schemaapiresponsevoid"></a>
<a id="schema_ApiResponseVoid"></a>
<a id="tocSapiresponsevoid"></a>
<a id="tocsapiresponsevoid"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": null
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|null|false|none||none|

<h2 id="tocS_InputStreamSource">InputStreamSource</h2>

<a id="schemainputstreamsource"></a>
<a id="schema_InputStreamSource"></a>
<a id="tocSinputstreamsource"></a>
<a id="tocsinputstreamsource"></a>

```json
{}

```

### 属性

*None*

<h2 id="tocS_ResponseEntityInputStreamResource">ResponseEntityInputStreamResource</h2>

<a id="schemaresponseentityinputstreamresource"></a>
<a id="schema_ResponseEntityInputStreamResource"></a>
<a id="tocSresponseentityinputstreamresource"></a>
<a id="tocsresponseentityinputstreamresource"></a>

```json
{
  "inputStreamSource": {},
  "description": "string",
  "equality": {},
  "read": false
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|inputStreamSource|[InputStreamSource](#schemainputstreamsource)|false|none||none|
|description|string|false|none||none|
|equality|object|false|none||none|
|read|boolean|false|none||none|

<h2 id="tocS_QaAnswerResponse">QaAnswerResponse</h2>

<a id="schemaqaanswerresponse"></a>
<a id="schema_QaAnswerResponse"></a>
<a id="tocSqaanswerresponse"></a>
<a id="tocsqaanswerresponse"></a>

```json
{
  "id": 0,
  "questionId": 0,
  "adminId": 0,
  "expertId": 0,
  "content": "string",
  "answeredAt": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|questionId|integer(int64)|false|none||none|
|adminId|integer(int64)|false|none||none|
|expertId|integer(int64)|false|none||none|
|content|string|false|none||none|
|answeredAt|string|false|none||none|

<h2 id="tocS_FeedbackResponse">FeedbackResponse</h2>

<a id="schemafeedbackresponse"></a>
<a id="schema_FeedbackResponse"></a>
<a id="tocSfeedbackresponse"></a>
<a id="tocsfeedbackresponse"></a>

```json
{
  "id": 0,
  "userId": 0,
  "studentId": 0,
  "feedbackType": "string",
  "content": "string",
  "contact": "string",
  "status": "PENDING",
  "processedBy": 0,
  "processedAt": "string",
  "processNote": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|userId|integer(int64)|false|none||none|
|studentId|integer(int64)|false|none||none|
|feedbackType|string|false|none||none|
|content|string|false|none||none|
|contact|string|false|none||none|
|status|string|false|none||none|
|processedBy|integer(int64)|false|none||none|
|processedAt|string|false|none||none|
|processNote|string|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|status|PENDING|
|status|PROCESSED|

<h2 id="tocS_ApiResponseFeedbackResponse">ApiResponseFeedbackResponse</h2>

<a id="schemaapiresponsefeedbackresponse"></a>
<a id="schema_ApiResponseFeedbackResponse"></a>
<a id="tocSapiresponsefeedbackresponse"></a>
<a id="tocsapiresponsefeedbackresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "userId": 0,
    "studentId": 0,
    "feedbackType": "string",
    "content": "string",
    "contact": "string",
    "status": "PENDING",
    "processedBy": 0,
    "processedAt": "string",
    "processNote": "string"
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[FeedbackResponse](#schemafeedbackresponse)|false|none||none|

<h2 id="tocS_AppQaQuestionResponse">AppQaQuestionResponse</h2>

<a id="schemaappqaquestionresponse"></a>
<a id="schema_AppQaQuestionResponse"></a>
<a id="tocSappqaquestionresponse"></a>
<a id="tocsappqaquestionresponse"></a>

```json
{
  "id": 0,
  "expertCategoryId": 0,
  "expertId": 0,
  "title": "string",
  "content": "string",
  "status": "PENDING",
  "answers": [
    {
      "id": 0,
      "questionId": 0,
      "adminId": 0,
      "expertId": 0,
      "content": "string",
      "answeredAt": "string"
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|expertCategoryId|integer(int64)|false|none||none|
|expertId|integer(int64)|false|none||none|
|title|string|false|none||none|
|content|string|false|none||none|
|status|string|false|none||none|
|answers|[[QaAnswerResponse](#schemaqaanswerresponse)]|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|status|PENDING|
|status|ANSWERED|
|status|CLOSED|

<h2 id="tocS_ApiResponseAppQaQuestionResponse">ApiResponseAppQaQuestionResponse</h2>

<a id="schemaapiresponseappqaquestionresponse"></a>
<a id="schema_ApiResponseAppQaQuestionResponse"></a>
<a id="tocSapiresponseappqaquestionresponse"></a>
<a id="tocsapiresponseappqaquestionresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "expertCategoryId": 0,
    "expertId": 0,
    "title": "string",
    "content": "string",
    "status": "PENDING",
    "answers": [
      {
        "id": 0,
        "questionId": 0,
        "adminId": 0,
        "expertId": 0,
        "content": "string",
        "answeredAt": "string"
      }
    ]
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[AppQaQuestionResponse](#schemaappqaquestionresponse)|false|none||none|

<h2 id="tocS_AppQaQuestionRequest">AppQaQuestionRequest</h2>

<a id="schemaappqaquestionrequest"></a>
<a id="schema_AppQaQuestionRequest"></a>
<a id="tocSappqaquestionrequest"></a>
<a id="tocsappqaquestionrequest"></a>

```json
{
  "expertCategoryId": 0,
  "expertId": 0,
  "title": "string",
  "content": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|expertCategoryId|integer(int64)|false|none||none|
|expertId|integer(int64)|false|none||none|
|title|string|true|none||none|
|content|string|true|none||none|

<h2 id="tocS_PageResponseAppQaQuestionResponse">PageResponseAppQaQuestionResponse</h2>

<a id="schemapageresponseappqaquestionresponse"></a>
<a id="schema_PageResponseAppQaQuestionResponse"></a>
<a id="tocSpageresponseappqaquestionresponse"></a>
<a id="tocspageresponseappqaquestionresponse"></a>

```json
{
  "records": [
    {
      "id": 0,
      "expertCategoryId": 0,
      "expertId": 0,
      "title": "string",
      "content": "string",
      "status": "PENDING",
      "answers": [
        {
          "id": 0,
          "questionId": 0,
          "adminId": 0,
          "expertId": 0,
          "content": "string",
          "answeredAt": "string"
        }
      ]
    }
  ],
  "total": 0,
  "page": 0,
  "size": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|records|[[AppQaQuestionResponse](#schemaappqaquestionresponse)]|false|none||none|
|total|integer(int64)|false|none||none|
|page|integer(int64)|false|none||none|
|size|integer(int64)|false|none||none|

<h2 id="tocS_ApiResponsePageResponseAppQaQuestionResponse">ApiResponsePageResponseAppQaQuestionResponse</h2>

<a id="schemaapiresponsepageresponseappqaquestionresponse"></a>
<a id="schema_ApiResponsePageResponseAppQaQuestionResponse"></a>
<a id="tocSapiresponsepageresponseappqaquestionresponse"></a>
<a id="tocsapiresponsepageresponseappqaquestionresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "records": [
      {
        "id": 0,
        "expertCategoryId": 0,
        "expertId": 0,
        "title": "string",
        "content": "string",
        "status": "PENDING",
        "answers": [
          {
            "id": null,
            "questionId": null,
            "adminId": null,
            "expertId": null,
            "content": null,
            "answeredAt": null
          }
        ]
      }
    ],
    "total": 0,
    "page": 0,
    "size": 0
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[PageResponseAppQaQuestionResponse](#schemapageresponseappqaquestionresponse)|false|none||none|

<h2 id="tocS_AppFeedbackRequest">AppFeedbackRequest</h2>

<a id="schemaappfeedbackrequest"></a>
<a id="schema_AppFeedbackRequest"></a>
<a id="tocSappfeedbackrequest"></a>
<a id="tocsappfeedbackrequest"></a>

```json
{
  "feedbackType": "string",
  "content": "string",
  "contact": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|feedbackType|string|false|none||none|
|content|string|true|none||none|
|contact|string|false|none||none|

<h2 id="tocS_AppKnowledgeCategoryResponse">AppKnowledgeCategoryResponse</h2>

<a id="schemaappknowledgecategoryresponse"></a>
<a id="schema_AppKnowledgeCategoryResponse"></a>
<a id="tocSappknowledgecategoryresponse"></a>
<a id="tocsappknowledgecategoryresponse"></a>

```json
{
  "id": 0,
  "parentId": 0,
  "categoryName": "string",
  "categoryCode": "string",
  "description": "string",
  "sortOrder": 0,
  "children": [
    {
      "id": 0,
      "parentId": 0,
      "categoryName": "string",
      "categoryCode": "string",
      "description": "string",
      "sortOrder": 0,
      "children": [
        {
          "id": 0,
          "parentId": 0,
          "categoryName": "string",
          "categoryCode": "string",
          "description": "string",
          "sortOrder": 0,
          "children": [
            {}
          ]
        }
      ]
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|parentId|integer(int64)|false|none||none|
|categoryName|string|false|none||none|
|categoryCode|string|false|none||none|
|description|string|false|none||none|
|sortOrder|integer|false|none||none|
|children|[[AppKnowledgeCategoryResponse](#schemaappknowledgecategoryresponse)]|false|none||none|

<h2 id="tocS_ApiResponseListAppKnowledgeCategoryResponse">ApiResponseListAppKnowledgeCategoryResponse</h2>

<a id="schemaapiresponselistappknowledgecategoryresponse"></a>
<a id="schema_ApiResponseListAppKnowledgeCategoryResponse"></a>
<a id="tocSapiresponselistappknowledgecategoryresponse"></a>
<a id="tocsapiresponselistappknowledgecategoryresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": [
    {
      "id": 0,
      "parentId": 0,
      "categoryName": "string",
      "categoryCode": "string",
      "description": "string",
      "sortOrder": 0,
      "children": [
        {
          "id": 0,
          "parentId": 0,
          "categoryName": "string",
          "categoryCode": "string",
          "description": "string",
          "sortOrder": 0,
          "children": [
            {}
          ]
        }
      ]
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[[AppKnowledgeCategoryResponse](#schemaappknowledgecategoryresponse)]|false|none||none|

<h2 id="tocS_AppKnowledgeSearchResult">AppKnowledgeSearchResult</h2>

<a id="schemaappknowledgesearchresult"></a>
<a id="schema_AppKnowledgeSearchResult"></a>
<a id="tocSappknowledgesearchresult"></a>
<a id="tocsappknowledgesearchresult"></a>

```json
{
  "id": 0,
  "title": "string",
  "summary": "string",
  "categoryId": 0,
  "categoryName": "string",
  "categoryCode": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|title|string|false|none||none|
|summary|string|false|none||none|
|categoryId|integer(int64)|false|none||none|
|categoryName|string|false|none||none|
|categoryCode|string|false|none||none|

<h2 id="tocS_PageResponseAppKnowledgeSearchResult">PageResponseAppKnowledgeSearchResult</h2>

<a id="schemapageresponseappknowledgesearchresult"></a>
<a id="schema_PageResponseAppKnowledgeSearchResult"></a>
<a id="tocSpageresponseappknowledgesearchresult"></a>
<a id="tocspageresponseappknowledgesearchresult"></a>

```json
{
  "records": [
    {
      "id": 0,
      "title": "string",
      "summary": "string",
      "categoryId": 0,
      "categoryName": "string",
      "categoryCode": "string"
    }
  ],
  "total": 0,
  "page": 0,
  "size": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|records|[[AppKnowledgeSearchResult](#schemaappknowledgesearchresult)]|false|none||none|
|total|integer(int64)|false|none||none|
|page|integer(int64)|false|none||none|
|size|integer(int64)|false|none||none|

<h2 id="tocS_ApiResponsePageResponseAppKnowledgeSearchResult">ApiResponsePageResponseAppKnowledgeSearchResult</h2>

<a id="schemaapiresponsepageresponseappknowledgesearchresult"></a>
<a id="schema_ApiResponsePageResponseAppKnowledgeSearchResult"></a>
<a id="tocSapiresponsepageresponseappknowledgesearchresult"></a>
<a id="tocsapiresponsepageresponseappknowledgesearchresult"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "records": [
      {
        "id": 0,
        "title": "string",
        "summary": "string",
        "categoryId": 0,
        "categoryName": "string",
        "categoryCode": "string"
      }
    ],
    "total": 0,
    "page": 0,
    "size": 0
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[PageResponseAppKnowledgeSearchResult](#schemapageresponseappknowledgesearchresult)|false|none||none|

<h2 id="tocS_AppKnowledgeEntryResponse">AppKnowledgeEntryResponse</h2>

<a id="schemaappknowledgeentryresponse"></a>
<a id="schema_AppKnowledgeEntryResponse"></a>
<a id="tocSappknowledgeentryresponse"></a>
<a id="tocsappknowledgeentryresponse"></a>

```json
{
  "id": 0,
  "categoryId": 0,
  "title": "string",
  "summary": "string",
  "coverUrl": "string",
  "content": "string",
  "keywords": "string",
  "source": "string",
  "sortOrder": 0,
  "viewCount": 0,
  "publishedAt": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|categoryId|integer(int64)|false|none||none|
|title|string|false|none||none|
|summary|string|false|none||none|
|coverUrl|string|false|none||none|
|content|string|false|none||none|
|keywords|string|false|none||none|
|source|string|false|none||none|
|sortOrder|integer|false|none||none|
|viewCount|integer(int64)|false|none||none|
|publishedAt|string|false|none||none|

<h2 id="tocS_ApiResponseAppKnowledgeEntryResponse">ApiResponseAppKnowledgeEntryResponse</h2>

<a id="schemaapiresponseappknowledgeentryresponse"></a>
<a id="schema_ApiResponseAppKnowledgeEntryResponse"></a>
<a id="tocSapiresponseappknowledgeentryresponse"></a>
<a id="tocsapiresponseappknowledgeentryresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "categoryId": 0,
    "title": "string",
    "summary": "string",
    "coverUrl": "string",
    "content": "string",
    "keywords": "string",
    "source": "string",
    "sortOrder": 0,
    "viewCount": 0,
    "publishedAt": "string"
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[AppKnowledgeEntryResponse](#schemaappknowledgeentryresponse)|false|none||none|

<h2 id="tocS_LiveSessionVideoResponse">LiveSessionVideoResponse</h2>

<a id="schemalivesessionvideoresponse"></a>
<a id="schema_LiveSessionVideoResponse"></a>
<a id="tocSlivesessionvideoresponse"></a>
<a id="tocslivesessionvideoresponse"></a>

```json
{
  "id": 0,
  "liveSessionId": 0,
  "title": "string",
  "videoUrl": "string",
  "durationSeconds": 0,
  "sortOrder": 0,
  "status": "DISABLED"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|liveSessionId|integer(int64)|false|none||none|
|title|string|false|none||none|
|videoUrl|string|false|none||none|
|durationSeconds|integer|false|none||none|
|sortOrder|integer|false|none||none|
|status|string|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|status|DISABLED|
|status|ENABLED|

<h2 id="tocS_LiveSessionResponse">LiveSessionResponse</h2>

<a id="schemalivesessionresponse"></a>
<a id="schema_LiveSessionResponse"></a>
<a id="tocSlivesessionresponse"></a>
<a id="tocslivesessionresponse"></a>

```json
{
  "id": 0,
  "title": "string",
  "coverUrl": "string",
  "anchorName": "string",
  "speakerName": "string",
  "tags": [
    "string"
  ],
  "liveUrl": "string",
  "playbackUrl": "string",
  "startAt": "string",
  "endAt": "string",
  "reviewStatus": "DRAFT",
  "liveStatus": "NOT_STARTED",
  "videos": [
    {
      "id": 0,
      "liveSessionId": 0,
      "title": "string",
      "videoUrl": "string",
      "durationSeconds": 0,
      "sortOrder": 0,
      "status": "DISABLED"
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|title|string|false|none||none|
|coverUrl|string|false|none||none|
|anchorName|string|false|none||none|
|speakerName|string|false|none||none|
|tags|[string]|false|none||none|
|liveUrl|string|false|none||none|
|playbackUrl|string|false|none||none|
|startAt|string|false|none||none|
|endAt|string|false|none||none|
|reviewStatus|string|false|none||none|
|liveStatus|string|false|none||none|
|videos|[[LiveSessionVideoResponse](#schemalivesessionvideoresponse)]|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|reviewStatus|DRAFT|
|reviewStatus|PENDING|
|reviewStatus|APPROVED|
|reviewStatus|REJECTED|
|liveStatus|NOT_STARTED|
|liveStatus|LIVE|
|liveStatus|ENDED|
|liveStatus|CANCELED|

<h2 id="tocS_PageResponseLiveSessionResponse">PageResponseLiveSessionResponse</h2>

<a id="schemapageresponselivesessionresponse"></a>
<a id="schema_PageResponseLiveSessionResponse"></a>
<a id="tocSpageresponselivesessionresponse"></a>
<a id="tocspageresponselivesessionresponse"></a>

```json
{
  "records": [
    {
      "id": 0,
      "title": "string",
      "coverUrl": "string",
      "anchorName": "string",
      "speakerName": "string",
      "tags": [
        "string"
      ],
      "liveUrl": "string",
      "playbackUrl": "string",
      "startAt": "string",
      "endAt": "string",
      "reviewStatus": "DRAFT",
      "liveStatus": "NOT_STARTED",
      "videos": [
        {
          "id": 0,
          "liveSessionId": 0,
          "title": "string",
          "videoUrl": "string",
          "durationSeconds": 0,
          "sortOrder": 0,
          "status": "DISABLED"
        }
      ]
    }
  ],
  "total": 0,
  "page": 0,
  "size": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|records|[[LiveSessionResponse](#schemalivesessionresponse)]|false|none||none|
|total|integer(int64)|false|none||none|
|page|integer(int64)|false|none||none|
|size|integer(int64)|false|none||none|

<h2 id="tocS_ApiResponsePageResponseLiveSessionResponse">ApiResponsePageResponseLiveSessionResponse</h2>

<a id="schemaapiresponsepageresponselivesessionresponse"></a>
<a id="schema_ApiResponsePageResponseLiveSessionResponse"></a>
<a id="tocSapiresponsepageresponselivesessionresponse"></a>
<a id="tocsapiresponsepageresponselivesessionresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "records": [
      {
        "id": 0,
        "title": "string",
        "coverUrl": "string",
        "anchorName": "string",
        "speakerName": "string",
        "tags": [
          "string"
        ],
        "liveUrl": "string",
        "playbackUrl": "string",
        "startAt": "string",
        "endAt": "string",
        "reviewStatus": "DRAFT",
        "liveStatus": "NOT_STARTED",
        "videos": [
          {
            "id": null,
            "liveSessionId": null,
            "title": null,
            "videoUrl": null,
            "durationSeconds": null,
            "sortOrder": null,
            "status": null
          }
        ]
      }
    ],
    "total": 0,
    "page": 0,
    "size": 0
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[PageResponseLiveSessionResponse](#schemapageresponselivesessionresponse)|false|none||none|

<h2 id="tocS_ApiResponseLiveSessionResponse">ApiResponseLiveSessionResponse</h2>

<a id="schemaapiresponselivesessionresponse"></a>
<a id="schema_ApiResponseLiveSessionResponse"></a>
<a id="tocSapiresponselivesessionresponse"></a>
<a id="tocsapiresponselivesessionresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "title": "string",
    "coverUrl": "string",
    "anchorName": "string",
    "speakerName": "string",
    "tags": [
      "string"
    ],
    "liveUrl": "string",
    "playbackUrl": "string",
    "startAt": "string",
    "endAt": "string",
    "reviewStatus": "DRAFT",
    "liveStatus": "NOT_STARTED",
    "videos": [
      {
        "id": 0,
        "liveSessionId": 0,
        "title": "string",
        "videoUrl": "string",
        "durationSeconds": 0,
        "sortOrder": 0,
        "status": "DISABLED"
      }
    ]
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[LiveSessionResponse](#schemalivesessionresponse)|false|none||none|

<h2 id="tocS_AppCourseVideoResponse">AppCourseVideoResponse</h2>

<a id="schemaappcoursevideoresponse"></a>
<a id="schema_AppCourseVideoResponse"></a>
<a id="tocSappcoursevideoresponse"></a>
<a id="tocsappcoursevideoresponse"></a>

```json
{
  "id": 0,
  "courseId": 0,
  "title": "string",
  "videoUrl": "string",
  "durationSeconds": 0,
  "paperId": 0,
  "sortOrder": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|courseId|integer(int64)|false|none||none|
|title|string|false|none||none|
|videoUrl|string|false|none||none|
|durationSeconds|integer|false|none||none|
|paperId|integer(int64)|false|none||none|
|sortOrder|integer|false|none||none|

<h2 id="tocS_AppCourseResponse">AppCourseResponse</h2>

<a id="schemaappcourseresponse"></a>
<a id="schema_AppCourseResponse"></a>
<a id="tocSappcourseresponse"></a>
<a id="tocsappcourseresponse"></a>

```json
{
  "id": 0,
  "courseName": "string",
  "subtitle": "string",
  "coverUrl": "string",
  "lecturerName": "string",
  "introduction": "string",
  "paperId": 0,
  "publishedAt": "string",
  "progressPercent": 0,
  "studySeconds": 0,
  "videos": [
    {
      "id": 0,
      "courseId": 0,
      "title": "string",
      "videoUrl": "string",
      "durationSeconds": 0,
      "paperId": 0,
      "sortOrder": 0
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|courseName|string|false|none||none|
|subtitle|string|false|none||none|
|coverUrl|string|false|none||none|
|lecturerName|string|false|none||none|
|introduction|string|false|none||none|
|paperId|integer(int64)|false|none||none|
|publishedAt|string|false|none||none|
|progressPercent|number|false|none||none|
|studySeconds|integer|false|none||none|
|videos|[[AppCourseVideoResponse](#schemaappcoursevideoresponse)]|false|none||none|

<h2 id="tocS_PageResponseAppCourseResponse">PageResponseAppCourseResponse</h2>

<a id="schemapageresponseappcourseresponse"></a>
<a id="schema_PageResponseAppCourseResponse"></a>
<a id="tocSpageresponseappcourseresponse"></a>
<a id="tocspageresponseappcourseresponse"></a>

```json
{
  "records": [
    {
      "id": 0,
      "courseName": "string",
      "subtitle": "string",
      "coverUrl": "string",
      "lecturerName": "string",
      "introduction": "string",
      "paperId": 0,
      "publishedAt": "string",
      "progressPercent": 0,
      "studySeconds": 0,
      "videos": [
        {
          "id": 0,
          "courseId": 0,
          "title": "string",
          "videoUrl": "string",
          "durationSeconds": 0,
          "paperId": 0,
          "sortOrder": 0
        }
      ]
    }
  ],
  "total": 0,
  "page": 0,
  "size": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|records|[[AppCourseResponse](#schemaappcourseresponse)]|false|none||none|
|total|integer(int64)|false|none||none|
|page|integer(int64)|false|none||none|
|size|integer(int64)|false|none||none|

<h2 id="tocS_ApiResponsePageResponseAppCourseResponse">ApiResponsePageResponseAppCourseResponse</h2>

<a id="schemaapiresponsepageresponseappcourseresponse"></a>
<a id="schema_ApiResponsePageResponseAppCourseResponse"></a>
<a id="tocSapiresponsepageresponseappcourseresponse"></a>
<a id="tocsapiresponsepageresponseappcourseresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "records": [
      {
        "id": 0,
        "courseName": "string",
        "subtitle": "string",
        "coverUrl": "string",
        "lecturerName": "string",
        "introduction": "string",
        "paperId": 0,
        "publishedAt": "string",
        "progressPercent": 0,
        "studySeconds": 0,
        "videos": [
          {
            "id": null,
            "courseId": null,
            "title": null,
            "videoUrl": null,
            "durationSeconds": null,
            "paperId": null,
            "sortOrder": null
          }
        ]
      }
    ],
    "total": 0,
    "page": 0,
    "size": 0
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[PageResponseAppCourseResponse](#schemapageresponseappcourseresponse)|false|none||none|

<h2 id="tocS_ApiResponseAppCourseResponse">ApiResponseAppCourseResponse</h2>

<a id="schemaapiresponseappcourseresponse"></a>
<a id="schema_ApiResponseAppCourseResponse"></a>
<a id="tocSapiresponseappcourseresponse"></a>
<a id="tocsapiresponseappcourseresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "courseName": "string",
    "subtitle": "string",
    "coverUrl": "string",
    "lecturerName": "string",
    "introduction": "string",
    "paperId": 0,
    "publishedAt": "string",
    "progressPercent": 0,
    "studySeconds": 0,
    "videos": [
      {
        "id": 0,
        "courseId": 0,
        "title": "string",
        "videoUrl": "string",
        "durationSeconds": 0,
        "paperId": 0,
        "sortOrder": 0
      }
    ]
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[AppCourseResponse](#schemaappcourseresponse)|false|none||none|

<h2 id="tocS_ApiResponseAppCourseVideoResponse">ApiResponseAppCourseVideoResponse</h2>

<a id="schemaapiresponseappcoursevideoresponse"></a>
<a id="schema_ApiResponseAppCourseVideoResponse"></a>
<a id="tocSapiresponseappcoursevideoresponse"></a>
<a id="tocsapiresponseappcoursevideoresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "courseId": 0,
    "title": "string",
    "videoUrl": "string",
    "durationSeconds": 0,
    "paperId": 0,
    "sortOrder": 0
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[AppCourseVideoResponse](#schemaappcoursevideoresponse)|false|none||none|

<h2 id="tocS_AppBookCategoryResponse">AppBookCategoryResponse</h2>

<a id="schemaappbookcategoryresponse"></a>
<a id="schema_AppBookCategoryResponse"></a>
<a id="tocSappbookcategoryresponse"></a>
<a id="tocsappbookcategoryresponse"></a>

```json
{
  "id": 0,
  "parentId": 0,
  "categoryName": "string",
  "sortOrder": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|parentId|integer(int64)|false|none||none|
|categoryName|string|false|none||none|
|sortOrder|integer|false|none||none|

<h2 id="tocS_PageResponseAppBookCategoryResponse">PageResponseAppBookCategoryResponse</h2>

<a id="schemapageresponseappbookcategoryresponse"></a>
<a id="schema_PageResponseAppBookCategoryResponse"></a>
<a id="tocSpageresponseappbookcategoryresponse"></a>
<a id="tocspageresponseappbookcategoryresponse"></a>

```json
{
  "records": [
    {
      "id": 0,
      "parentId": 0,
      "categoryName": "string",
      "sortOrder": 0
    }
  ],
  "total": 0,
  "page": 0,
  "size": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|records|[[AppBookCategoryResponse](#schemaappbookcategoryresponse)]|false|none||none|
|total|integer(int64)|false|none||none|
|page|integer(int64)|false|none||none|
|size|integer(int64)|false|none||none|

<h2 id="tocS_ApiResponsePageResponseAppBookCategoryResponse">ApiResponsePageResponseAppBookCategoryResponse</h2>

<a id="schemaapiresponsepageresponseappbookcategoryresponse"></a>
<a id="schema_ApiResponsePageResponseAppBookCategoryResponse"></a>
<a id="tocSapiresponsepageresponseappbookcategoryresponse"></a>
<a id="tocsapiresponsepageresponseappbookcategoryresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "records": [
      {
        "id": 0,
        "parentId": 0,
        "categoryName": "string",
        "sortOrder": 0
      }
    ],
    "total": 0,
    "page": 0,
    "size": 0
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[PageResponseAppBookCategoryResponse](#schemapageresponseappbookcategoryresponse)|false|none||none|

<h2 id="tocS_AppBookChapterResponse">AppBookChapterResponse</h2>

<a id="schemaappbookchapterresponse"></a>
<a id="schema_AppBookChapterResponse"></a>
<a id="tocSappbookchapterresponse"></a>
<a id="tocsappbookchapterresponse"></a>

```json
{
  "id": 0,
  "bookId": 0,
  "parentId": 0,
  "chapterTitle": "string",
  "content": "string",
  "startPage": 0,
  "pageCount": 0,
  "paperId": 0,
  "sortOrder": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|bookId|integer(int64)|false|none||none|
|parentId|integer(int64)|false|none||none|
|chapterTitle|string|false|none||none|
|content|string|false|none||none|
|startPage|integer|false|none||none|
|pageCount|integer|false|none||none|
|paperId|integer(int64)|false|none||none|
|sortOrder|integer|false|none||none|

<h2 id="tocS_AppBookResponse">AppBookResponse</h2>

<a id="schemaappbookresponse"></a>
<a id="schema_AppBookResponse"></a>
<a id="tocSappbookresponse"></a>
<a id="tocsappbookresponse"></a>

```json
{
  "id": 0,
  "categoryId": 0,
  "bookName": "string",
  "author": "string",
  "publisher": "string",
  "coverUrl": "string",
  "introduction": "string",
  "totalPages": 0,
  "paperId": 0,
  "publishedAt": "string",
  "progressPercent": 0,
  "studySeconds": 0,
  "chapters": [
    {
      "id": 0,
      "bookId": 0,
      "parentId": 0,
      "chapterTitle": "string",
      "content": "string",
      "startPage": 0,
      "pageCount": 0,
      "paperId": 0,
      "sortOrder": 0
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|categoryId|integer(int64)|false|none||none|
|bookName|string|false|none||none|
|author|string|false|none||none|
|publisher|string|false|none||none|
|coverUrl|string|false|none||none|
|introduction|string|false|none||none|
|totalPages|integer|false|none||none|
|paperId|integer(int64)|false|none||none|
|publishedAt|string|false|none||none|
|progressPercent|number|false|none||none|
|studySeconds|integer|false|none||none|
|chapters|[[AppBookChapterResponse](#schemaappbookchapterresponse)]|false|none||none|

<h2 id="tocS_PageResponseAppBookResponse">PageResponseAppBookResponse</h2>

<a id="schemapageresponseappbookresponse"></a>
<a id="schema_PageResponseAppBookResponse"></a>
<a id="tocSpageresponseappbookresponse"></a>
<a id="tocspageresponseappbookresponse"></a>

```json
{
  "records": [
    {
      "id": 0,
      "categoryId": 0,
      "bookName": "string",
      "author": "string",
      "publisher": "string",
      "coverUrl": "string",
      "introduction": "string",
      "totalPages": 0,
      "paperId": 0,
      "publishedAt": "string",
      "progressPercent": 0,
      "studySeconds": 0,
      "chapters": [
        {
          "id": 0,
          "bookId": 0,
          "parentId": 0,
          "chapterTitle": "string",
          "content": "string",
          "startPage": 0,
          "pageCount": 0,
          "paperId": 0,
          "sortOrder": 0
        }
      ]
    }
  ],
  "total": 0,
  "page": 0,
  "size": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|records|[[AppBookResponse](#schemaappbookresponse)]|false|none||none|
|total|integer(int64)|false|none||none|
|page|integer(int64)|false|none||none|
|size|integer(int64)|false|none||none|

<h2 id="tocS_ApiResponsePageResponseAppBookResponse">ApiResponsePageResponseAppBookResponse</h2>

<a id="schemaapiresponsepageresponseappbookresponse"></a>
<a id="schema_ApiResponsePageResponseAppBookResponse"></a>
<a id="tocSapiresponsepageresponseappbookresponse"></a>
<a id="tocsapiresponsepageresponseappbookresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "records": [
      {
        "id": 0,
        "categoryId": 0,
        "bookName": "string",
        "author": "string",
        "publisher": "string",
        "coverUrl": "string",
        "introduction": "string",
        "totalPages": 0,
        "paperId": 0,
        "publishedAt": "string",
        "progressPercent": 0,
        "studySeconds": 0,
        "chapters": [
          {
            "id": null,
            "bookId": null,
            "parentId": null,
            "chapterTitle": null,
            "content": null,
            "startPage": null,
            "pageCount": null,
            "paperId": null,
            "sortOrder": null
          }
        ]
      }
    ],
    "total": 0,
    "page": 0,
    "size": 0
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[PageResponseAppBookResponse](#schemapageresponseappbookresponse)|false|none||none|

<h2 id="tocS_ApiResponseAppBookResponse">ApiResponseAppBookResponse</h2>

<a id="schemaapiresponseappbookresponse"></a>
<a id="schema_ApiResponseAppBookResponse"></a>
<a id="tocSapiresponseappbookresponse"></a>
<a id="tocsapiresponseappbookresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "categoryId": 0,
    "bookName": "string",
    "author": "string",
    "publisher": "string",
    "coverUrl": "string",
    "introduction": "string",
    "totalPages": 0,
    "paperId": 0,
    "publishedAt": "string",
    "progressPercent": 0,
    "studySeconds": 0,
    "chapters": [
      {
        "id": 0,
        "bookId": 0,
        "parentId": 0,
        "chapterTitle": "string",
        "content": "string",
        "startPage": 0,
        "pageCount": 0,
        "paperId": 0,
        "sortOrder": 0
      }
    ]
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[AppBookResponse](#schemaappbookresponse)|false|none||none|

<h2 id="tocS_ApiResponseAppBookChapterResponse">ApiResponseAppBookChapterResponse</h2>

<a id="schemaapiresponseappbookchapterresponse"></a>
<a id="schema_ApiResponseAppBookChapterResponse"></a>
<a id="tocSapiresponseappbookchapterresponse"></a>
<a id="tocsapiresponseappbookchapterresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "bookId": 0,
    "parentId": 0,
    "chapterTitle": "string",
    "content": "string",
    "startPage": 0,
    "pageCount": 0,
    "paperId": 0,
    "sortOrder": 0
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[AppBookChapterResponse](#schemaappbookchapterresponse)|false|none||none|

<h2 id="tocS_AppPodcastAudioResponse">AppPodcastAudioResponse</h2>

<a id="schemaapppodcastaudioresponse"></a>
<a id="schema_AppPodcastAudioResponse"></a>
<a id="tocSapppodcastaudioresponse"></a>
<a id="tocsapppodcastaudioresponse"></a>

```json
{
  "id": 0,
  "podcastId": 0,
  "title": "string",
  "audioUrl": "string",
  "durationSeconds": 0,
  "paperId": 0,
  "sortOrder": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|podcastId|integer(int64)|false|none||none|
|title|string|false|none||none|
|audioUrl|string|false|none||none|
|durationSeconds|integer|false|none||none|
|paperId|integer(int64)|false|none||none|
|sortOrder|integer|false|none||none|

<h2 id="tocS_AppPodcastResponse">AppPodcastResponse</h2>

<a id="schemaapppodcastresponse"></a>
<a id="schema_AppPodcastResponse"></a>
<a id="tocSapppodcastresponse"></a>
<a id="tocsapppodcastresponse"></a>

```json
{
  "id": 0,
  "title": "string",
  "summary": "string",
  "coverUrl": "string",
  "speakerName": "string",
  "tags": [
    "string"
  ],
  "publishedAt": "string",
  "progressPercent": 0,
  "studySeconds": 0,
  "audios": [
    {
      "id": 0,
      "podcastId": 0,
      "title": "string",
      "audioUrl": "string",
      "durationSeconds": 0,
      "paperId": 0,
      "sortOrder": 0
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|title|string|false|none||none|
|summary|string|false|none||none|
|coverUrl|string|false|none||none|
|speakerName|string|false|none||none|
|tags|[string]|false|none||none|
|publishedAt|string|false|none||none|
|progressPercent|number|false|none||none|
|studySeconds|integer|false|none||none|
|audios|[[AppPodcastAudioResponse](#schemaapppodcastaudioresponse)]|false|none||none|

<h2 id="tocS_PageResponseAppPodcastResponse">PageResponseAppPodcastResponse</h2>

<a id="schemapageresponseapppodcastresponse"></a>
<a id="schema_PageResponseAppPodcastResponse"></a>
<a id="tocSpageresponseapppodcastresponse"></a>
<a id="tocspageresponseapppodcastresponse"></a>

```json
{
  "records": [
    {
      "id": 0,
      "title": "string",
      "summary": "string",
      "coverUrl": "string",
      "speakerName": "string",
      "tags": [
        "string"
      ],
      "publishedAt": "string",
      "progressPercent": 0,
      "studySeconds": 0,
      "audios": [
        {
          "id": 0,
          "podcastId": 0,
          "title": "string",
          "audioUrl": "string",
          "durationSeconds": 0,
          "paperId": 0,
          "sortOrder": 0
        }
      ]
    }
  ],
  "total": 0,
  "page": 0,
  "size": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|records|[[AppPodcastResponse](#schemaapppodcastresponse)]|false|none||none|
|total|integer(int64)|false|none||none|
|page|integer(int64)|false|none||none|
|size|integer(int64)|false|none||none|

<h2 id="tocS_ApiResponsePageResponseAppPodcastResponse">ApiResponsePageResponseAppPodcastResponse</h2>

<a id="schemaapiresponsepageresponseapppodcastresponse"></a>
<a id="schema_ApiResponsePageResponseAppPodcastResponse"></a>
<a id="tocSapiresponsepageresponseapppodcastresponse"></a>
<a id="tocsapiresponsepageresponseapppodcastresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "records": [
      {
        "id": 0,
        "title": "string",
        "summary": "string",
        "coverUrl": "string",
        "speakerName": "string",
        "tags": [
          "string"
        ],
        "publishedAt": "string",
        "progressPercent": 0,
        "studySeconds": 0,
        "audios": [
          {
            "id": null,
            "podcastId": null,
            "title": null,
            "audioUrl": null,
            "durationSeconds": null,
            "paperId": null,
            "sortOrder": null
          }
        ]
      }
    ],
    "total": 0,
    "page": 0,
    "size": 0
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[PageResponseAppPodcastResponse](#schemapageresponseapppodcastresponse)|false|none||none|

<h2 id="tocS_ApiResponseAppPodcastResponse">ApiResponseAppPodcastResponse</h2>

<a id="schemaapiresponseapppodcastresponse"></a>
<a id="schema_ApiResponseAppPodcastResponse"></a>
<a id="tocSapiresponseapppodcastresponse"></a>
<a id="tocsapiresponseapppodcastresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "title": "string",
    "summary": "string",
    "coverUrl": "string",
    "speakerName": "string",
    "tags": [
      "string"
    ],
    "publishedAt": "string",
    "progressPercent": 0,
    "studySeconds": 0,
    "audios": [
      {
        "id": 0,
        "podcastId": 0,
        "title": "string",
        "audioUrl": "string",
        "durationSeconds": 0,
        "paperId": 0,
        "sortOrder": 0
      }
    ]
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[AppPodcastResponse](#schemaapppodcastresponse)|false|none||none|

<h2 id="tocS_AppExamQuestionOptionResponse">AppExamQuestionOptionResponse</h2>

<a id="schemaappexamquestionoptionresponse"></a>
<a id="schema_AppExamQuestionOptionResponse"></a>
<a id="tocSappexamquestionoptionresponse"></a>
<a id="tocsappexamquestionoptionresponse"></a>

```json
{
  "id": 0,
  "optionKey": "string",
  "optionContent": "string",
  "sortOrder": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|optionKey|string|false|none||none|
|optionContent|string|false|none||none|
|sortOrder|integer|false|none||none|

<h2 id="tocS_AppExamQuestionResponse">AppExamQuestionResponse</h2>

<a id="schemaappexamquestionresponse"></a>
<a id="schema_AppExamQuestionResponse"></a>
<a id="tocSappexamquestionresponse"></a>
<a id="tocsappexamquestionresponse"></a>

```json
{
  "questionId": 0,
  "questionType": "SINGLE_CHOICE",
  "title": "string",
  "difficulty": "EASY",
  "score": 0,
  "sortOrder": 0,
  "options": [
    {
      "id": 0,
      "optionKey": "string",
      "optionContent": "string",
      "sortOrder": 0
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|questionId|integer(int64)|false|none||none|
|questionType|string|false|none||none|
|title|string|false|none||none|
|difficulty|string|false|none||none|
|score|number|false|none||none|
|sortOrder|integer|false|none||none|
|options|[[AppExamQuestionOptionResponse](#schemaappexamquestionoptionresponse)]|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|questionType|SINGLE_CHOICE|
|questionType|MULTIPLE_CHOICE|
|questionType|TRUE_FALSE|
|questionType|SHORT_ANSWER|
|difficulty|EASY|
|difficulty|MEDIUM|
|difficulty|HARD|

<h2 id="tocS_AppExamPaperResponse">AppExamPaperResponse</h2>

<a id="schemaappexampaperresponse"></a>
<a id="schema_AppExamPaperResponse"></a>
<a id="tocSappexampaperresponse"></a>
<a id="tocsappexampaperresponse"></a>

```json
{
  "id": 0,
  "paperName": "string",
  "description": "string",
  "totalScore": 0,
  "passScore": 0,
  "durationMinutes": 0,
  "status": "DISABLED",
  "questions": [
    {
      "questionId": 0,
      "questionType": "SINGLE_CHOICE",
      "title": "string",
      "difficulty": "EASY",
      "score": 0,
      "sortOrder": 0,
      "options": [
        {
          "id": 0,
          "optionKey": "string",
          "optionContent": "string",
          "sortOrder": 0
        }
      ]
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|paperName|string|false|none||none|
|description|string|false|none||none|
|totalScore|number|false|none||none|
|passScore|number|false|none||none|
|durationMinutes|integer|false|none||none|
|status|string|false|none||none|
|questions|[[AppExamQuestionResponse](#schemaappexamquestionresponse)]|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|status|DISABLED|
|status|ENABLED|

<h2 id="tocS_PageResponseAppExamPaperResponse">PageResponseAppExamPaperResponse</h2>

<a id="schemapageresponseappexampaperresponse"></a>
<a id="schema_PageResponseAppExamPaperResponse"></a>
<a id="tocSpageresponseappexampaperresponse"></a>
<a id="tocspageresponseappexampaperresponse"></a>

```json
{
  "records": [
    {
      "id": 0,
      "paperName": "string",
      "description": "string",
      "totalScore": 0,
      "passScore": 0,
      "durationMinutes": 0,
      "status": "DISABLED",
      "questions": [
        {
          "questionId": 0,
          "questionType": "SINGLE_CHOICE",
          "title": "string",
          "difficulty": "EASY",
          "score": 0,
          "sortOrder": 0,
          "options": [
            {}
          ]
        }
      ]
    }
  ],
  "total": 0,
  "page": 0,
  "size": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|records|[[AppExamPaperResponse](#schemaappexampaperresponse)]|false|none||none|
|total|integer(int64)|false|none||none|
|page|integer(int64)|false|none||none|
|size|integer(int64)|false|none||none|

<h2 id="tocS_ApiResponsePageResponseAppExamPaperResponse">ApiResponsePageResponseAppExamPaperResponse</h2>

<a id="schemaapiresponsepageresponseappexampaperresponse"></a>
<a id="schema_ApiResponsePageResponseAppExamPaperResponse"></a>
<a id="tocSapiresponsepageresponseappexampaperresponse"></a>
<a id="tocsapiresponsepageresponseappexampaperresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "records": [
      {
        "id": 0,
        "paperName": "string",
        "description": "string",
        "totalScore": 0,
        "passScore": 0,
        "durationMinutes": 0,
        "status": "DISABLED",
        "questions": [
          {
            "questionId": null,
            "questionType": null,
            "title": null,
            "difficulty": null,
            "score": null,
            "sortOrder": null,
            "options": null
          }
        ]
      }
    ],
    "total": 0,
    "page": 0,
    "size": 0
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[PageResponseAppExamPaperResponse](#schemapageresponseappexampaperresponse)|false|none||none|

<h2 id="tocS_ApiResponseAppExamPaperResponse">ApiResponseAppExamPaperResponse</h2>

<a id="schemaapiresponseappexampaperresponse"></a>
<a id="schema_ApiResponseAppExamPaperResponse"></a>
<a id="tocSapiresponseappexampaperresponse"></a>
<a id="tocsapiresponseappexampaperresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "paperName": "string",
    "description": "string",
    "totalScore": 0,
    "passScore": 0,
    "durationMinutes": 0,
    "status": "DISABLED",
    "questions": [
      {
        "questionId": 0,
        "questionType": "SINGLE_CHOICE",
        "title": "string",
        "difficulty": "EASY",
        "score": 0,
        "sortOrder": 0,
        "options": [
          {
            "id": null,
            "optionKey": null,
            "optionContent": null,
            "sortOrder": null
          }
        ]
      }
    ]
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[AppExamPaperResponse](#schemaappexampaperresponse)|false|none||none|

<h2 id="tocS_AppExamAnswerResultResponse">AppExamAnswerResultResponse</h2>

<a id="schemaappexamanswerresultresponse"></a>
<a id="schema_AppExamAnswerResultResponse"></a>
<a id="tocSappexamanswerresultresponse"></a>
<a id="tocsappexamanswerresultresponse"></a>

```json
{
  "questionId": 0,
  "questionType": "SINGLE_CHOICE",
  "title": "string",
  "answerContent": "string",
  "correctAnswer": "string",
  "analysis": "string",
  "score": 0,
  "correct": 0,
  "options": [
    {
      "id": 0,
      "optionKey": "string",
      "optionContent": "string",
      "sortOrder": 0
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|questionId|integer(int64)|false|none||none|
|questionType|string|false|none||none|
|title|string|false|none||none|
|answerContent|string|false|none||none|
|correctAnswer|string|false|none||none|
|analysis|string|false|none||none|
|score|number|false|none||none|
|correct|integer|false|none||none|
|options|[[AppExamQuestionOptionResponse](#schemaappexamquestionoptionresponse)]|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|questionType|SINGLE_CHOICE|
|questionType|MULTIPLE_CHOICE|
|questionType|TRUE_FALSE|
|questionType|SHORT_ANSWER|

<h2 id="tocS_AppExamRecordResponse">AppExamRecordResponse</h2>

<a id="schemaappexamrecordresponse"></a>
<a id="schema_AppExamRecordResponse"></a>
<a id="tocSappexamrecordresponse"></a>
<a id="tocsappexamrecordresponse"></a>

```json
{
  "id": 0,
  "studentId": 0,
  "paperId": 0,
  "paperName": "string",
  "sourceType": "string",
  "sourceId": 0,
  "score": 0,
  "passed": 0,
  "startedAt": "string",
  "submittedAt": "string",
  "answers": [
    {
      "questionId": 0,
      "questionType": "SINGLE_CHOICE",
      "title": "string",
      "answerContent": "string",
      "correctAnswer": "string",
      "analysis": "string",
      "score": 0,
      "correct": 0,
      "options": [
        {
          "id": 0,
          "optionKey": "string",
          "optionContent": "string",
          "sortOrder": 0
        }
      ]
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|studentId|integer(int64)|false|none||none|
|paperId|integer(int64)|false|none||none|
|paperName|string|false|none||none|
|sourceType|string|false|none||none|
|sourceId|integer(int64)|false|none||none|
|score|number|false|none||none|
|passed|integer|false|none||none|
|startedAt|string|false|none||none|
|submittedAt|string|false|none||none|
|answers|[[AppExamAnswerResultResponse](#schemaappexamanswerresultresponse)]|false|none||none|

<h2 id="tocS_ApiResponseAppExamRecordResponse">ApiResponseAppExamRecordResponse</h2>

<a id="schemaapiresponseappexamrecordresponse"></a>
<a id="schema_ApiResponseAppExamRecordResponse"></a>
<a id="tocSapiresponseappexamrecordresponse"></a>
<a id="tocsapiresponseappexamrecordresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "studentId": 0,
    "paperId": 0,
    "paperName": "string",
    "sourceType": "string",
    "sourceId": 0,
    "score": 0,
    "passed": 0,
    "startedAt": "string",
    "submittedAt": "string",
    "answers": [
      {
        "questionId": 0,
        "questionType": "SINGLE_CHOICE",
        "title": "string",
        "answerContent": "string",
        "correctAnswer": "string",
        "analysis": "string",
        "score": 0,
        "correct": 0,
        "options": [
          {
            "id": null,
            "optionKey": null,
            "optionContent": null,
            "sortOrder": null
          }
        ]
      }
    ]
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[AppExamRecordResponse](#schemaappexamrecordresponse)|false|none||none|

<h2 id="tocS_Answer">Answer</h2>

<a id="schemaanswer"></a>
<a id="schema_Answer"></a>
<a id="tocSanswer"></a>
<a id="tocsanswer"></a>

```json
{
  "questionId": 0,
  "answerContent": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|questionId|integer(int64)|true|none||none|
|answerContent|string|false|none||none|

<h2 id="tocS_AppExamSubmitRequest">AppExamSubmitRequest</h2>

<a id="schemaappexamsubmitrequest"></a>
<a id="schema_AppExamSubmitRequest"></a>
<a id="tocSappexamsubmitrequest"></a>
<a id="tocsappexamsubmitrequest"></a>

```json
{
  "sourceType": "string",
  "sourceId": 0,
  "answers": [
    {
      "questionId": 0,
      "answerContent": "string"
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|sourceType|string|false|none||none|
|sourceId|integer(int64)|false|none||none|
|answers|[[Answer](#schemaanswer)]|true|none||none|

<h2 id="tocS_PageResponseAppExamRecordResponse">PageResponseAppExamRecordResponse</h2>

<a id="schemapageresponseappexamrecordresponse"></a>
<a id="schema_PageResponseAppExamRecordResponse"></a>
<a id="tocSpageresponseappexamrecordresponse"></a>
<a id="tocspageresponseappexamrecordresponse"></a>

```json
{
  "records": [
    {
      "id": 0,
      "studentId": 0,
      "paperId": 0,
      "paperName": "string",
      "sourceType": "string",
      "sourceId": 0,
      "score": 0,
      "passed": 0,
      "startedAt": "string",
      "submittedAt": "string",
      "answers": [
        {
          "questionId": 0,
          "questionType": "SINGLE_CHOICE",
          "title": "string",
          "answerContent": "string",
          "correctAnswer": "string",
          "analysis": "string",
          "score": 0,
          "correct": 0,
          "options": [
            {}
          ]
        }
      ]
    }
  ],
  "total": 0,
  "page": 0,
  "size": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|records|[[AppExamRecordResponse](#schemaappexamrecordresponse)]|false|none||none|
|total|integer(int64)|false|none||none|
|page|integer(int64)|false|none||none|
|size|integer(int64)|false|none||none|

<h2 id="tocS_ApiResponsePageResponseAppExamRecordResponse">ApiResponsePageResponseAppExamRecordResponse</h2>

<a id="schemaapiresponsepageresponseappexamrecordresponse"></a>
<a id="schema_ApiResponsePageResponseAppExamRecordResponse"></a>
<a id="tocSapiresponsepageresponseappexamrecordresponse"></a>
<a id="tocsapiresponsepageresponseappexamrecordresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "records": [
      {
        "id": 0,
        "studentId": 0,
        "paperId": 0,
        "paperName": "string",
        "sourceType": "string",
        "sourceId": 0,
        "score": 0,
        "passed": 0,
        "startedAt": "string",
        "submittedAt": "string",
        "answers": [
          {
            "questionId": null,
            "questionType": null,
            "title": null,
            "answerContent": null,
            "correctAnswer": null,
            "analysis": null,
            "score": null,
            "correct": null,
            "options": null
          }
        ]
      }
    ],
    "total": 0,
    "page": 0,
    "size": 0
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[PageResponseAppExamRecordResponse](#schemapageresponseappexamrecordresponse)|false|none||none|

<h2 id="tocS_AppTopicItemResponse">AppTopicItemResponse</h2>

<a id="schemaapptopicitemresponse"></a>
<a id="schema_AppTopicItemResponse"></a>
<a id="tocSapptopicitemresponse"></a>
<a id="tocsapptopicitemresponse"></a>

```json
{
  "id": 0,
  "topicId": 0,
  "itemType": "string",
  "itemId": 0,
  "sortOrder": 0,
  "resource": {}
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|topicId|integer(int64)|false|none||none|
|itemType|string|false|none||none|
|itemId|integer(int64)|false|none||none|
|sortOrder|integer|false|none||none|
|resource|object|false|none||none|

<h2 id="tocS_AppTopicResponse">AppTopicResponse</h2>

<a id="schemaapptopicresponse"></a>
<a id="schema_AppTopicResponse"></a>
<a id="tocSapptopicresponse"></a>
<a id="tocsapptopicresponse"></a>

```json
{
  "id": 0,
  "title": "string",
  "summary": "string",
  "learningRequirements": "string",
  "coverUrl": "string",
  "viewCount": 0,
  "publishedAt": "string",
  "items": [
    {
      "id": 0,
      "topicId": 0,
      "itemType": "string",
      "itemId": 0,
      "sortOrder": 0,
      "resource": {}
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|title|string|false|none||none|
|summary|string|false|none||none|
|learningRequirements|string|false|none||none|
|coverUrl|string|false|none||none|
|viewCount|integer(int64)|false|none||none|
|publishedAt|string|false|none||none|
|items|[[AppTopicItemResponse](#schemaapptopicitemresponse)]|false|none||none|

<h2 id="tocS_PageResponseAppTopicResponse">PageResponseAppTopicResponse</h2>

<a id="schemapageresponseapptopicresponse"></a>
<a id="schema_PageResponseAppTopicResponse"></a>
<a id="tocSpageresponseapptopicresponse"></a>
<a id="tocspageresponseapptopicresponse"></a>

```json
{
  "records": [
    {
      "id": 0,
      "title": "string",
      "summary": "string",
      "learningRequirements": "string",
      "coverUrl": "string",
      "viewCount": 0,
      "publishedAt": "string",
      "items": [
        {
          "id": 0,
          "topicId": 0,
          "itemType": "string",
          "itemId": 0,
          "sortOrder": 0,
          "resource": {}
        }
      ]
    }
  ],
  "total": 0,
  "page": 0,
  "size": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|records|[[AppTopicResponse](#schemaapptopicresponse)]|false|none||none|
|total|integer(int64)|false|none||none|
|page|integer(int64)|false|none||none|
|size|integer(int64)|false|none||none|

<h2 id="tocS_ApiResponsePageResponseAppTopicResponse">ApiResponsePageResponseAppTopicResponse</h2>

<a id="schemaapiresponsepageresponseapptopicresponse"></a>
<a id="schema_ApiResponsePageResponseAppTopicResponse"></a>
<a id="tocSapiresponsepageresponseapptopicresponse"></a>
<a id="tocsapiresponsepageresponseapptopicresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "records": [
      {
        "id": 0,
        "title": "string",
        "summary": "string",
        "learningRequirements": "string",
        "coverUrl": "string",
        "viewCount": 0,
        "publishedAt": "string",
        "items": [
          {
            "id": null,
            "topicId": null,
            "itemType": null,
            "itemId": null,
            "sortOrder": null,
            "resource": null
          }
        ]
      }
    ],
    "total": 0,
    "page": 0,
    "size": 0
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[PageResponseAppTopicResponse](#schemapageresponseapptopicresponse)|false|none||none|

<h2 id="tocS_ApiResponseAppTopicResponse">ApiResponseAppTopicResponse</h2>

<a id="schemaapiresponseapptopicresponse"></a>
<a id="schema_ApiResponseAppTopicResponse"></a>
<a id="tocSapiresponseapptopicresponse"></a>
<a id="tocsapiresponseapptopicresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "title": "string",
    "summary": "string",
    "learningRequirements": "string",
    "coverUrl": "string",
    "viewCount": 0,
    "publishedAt": "string",
    "items": [
      {
        "id": 0,
        "topicId": 0,
        "itemType": "string",
        "itemId": 0,
        "sortOrder": 0,
        "resource": {}
      }
    ]
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[AppTopicResponse](#schemaapptopicresponse)|false|none||none|

<h2 id="tocS_AppLearningRecordResponse">AppLearningRecordResponse</h2>

<a id="schemaapplearningrecordresponse"></a>
<a id="schema_AppLearningRecordResponse"></a>
<a id="tocSapplearningrecordresponse"></a>
<a id="tocsapplearningrecordresponse"></a>

```json
{
  "id": 0,
  "studentId": 0,
  "resourceType": "string",
  "resourceId": 0,
  "studySeconds": 0,
  "progressPercent": 0,
  "completed": 0,
  "completedAt": "string",
  "lastStudiedAt": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|studentId|integer(int64)|false|none||none|
|resourceType|string|false|none||none|
|resourceId|integer(int64)|false|none||none|
|studySeconds|integer|false|none||none|
|progressPercent|number|false|none||none|
|completed|integer|false|none||none|
|completedAt|string|false|none||none|
|lastStudiedAt|string|false|none||none|

<h2 id="tocS_ApiResponseAppLearningRecordResponse">ApiResponseAppLearningRecordResponse</h2>

<a id="schemaapiresponseapplearningrecordresponse"></a>
<a id="schema_ApiResponseAppLearningRecordResponse"></a>
<a id="tocSapiresponseapplearningrecordresponse"></a>
<a id="tocsapiresponseapplearningrecordresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "studentId": 0,
    "resourceType": "string",
    "resourceId": 0,
    "studySeconds": 0,
    "progressPercent": 0,
    "completed": 0,
    "completedAt": "string",
    "lastStudiedAt": "string"
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[AppLearningRecordResponse](#schemaapplearningrecordresponse)|false|none||none|

<h2 id="tocS_AppLearningRecordRequest">AppLearningRecordRequest</h2>

<a id="schemaapplearningrecordrequest"></a>
<a id="schema_AppLearningRecordRequest"></a>
<a id="tocSapplearningrecordrequest"></a>
<a id="tocsapplearningrecordrequest"></a>

```json
{
  "resourceType": "string",
  "resourceId": 0,
  "studySeconds": 0,
  "progressPercent": 100,
  "completed": true
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|resourceType|string|true|none||none|
|resourceId|integer(int64)|true|none||none|
|studySeconds|integer|false|none||none|
|progressPercent|number|false|none||none|
|completed|boolean|false|none||none|

<h2 id="tocS_ExpertExperienceResponse">ExpertExperienceResponse</h2>

<a id="schemaexpertexperienceresponse"></a>
<a id="schema_ExpertExperienceResponse"></a>
<a id="tocSexpertexperienceresponse"></a>
<a id="tocsexpertexperienceresponse"></a>

```json
{
  "id": 0,
  "expertId": 0,
  "experienceType": "EDUCATION",
  "title": "string",
  "description": "string",
  "startDate": "string",
  "endDate": "string",
  "sortOrder": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|expertId|integer(int64)|false|none||none|
|experienceType|string|false|none||none|
|title|string|false|none||none|
|description|string|false|none||none|
|startDate|string|false|none||none|
|endDate|string|false|none||none|
|sortOrder|integer|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|experienceType|EDUCATION|
|experienceType|WORK|
|experienceType|ACHIEVEMENT|

<h2 id="tocS_AppExpertCategoryResponse">AppExpertCategoryResponse</h2>

<a id="schemaappexpertcategoryresponse"></a>
<a id="schema_AppExpertCategoryResponse"></a>
<a id="tocSappexpertcategoryresponse"></a>
<a id="tocsappexpertcategoryresponse"></a>

```json
{
  "id": 0,
  "parentId": 0,
  "categoryName": "string",
  "sortOrder": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|parentId|integer(int64)|false|none||none|
|categoryName|string|false|none||none|
|sortOrder|integer|false|none||none|

<h2 id="tocS_PageResponseAppExpertCategoryResponse">PageResponseAppExpertCategoryResponse</h2>

<a id="schemapageresponseappexpertcategoryresponse"></a>
<a id="schema_PageResponseAppExpertCategoryResponse"></a>
<a id="tocSpageresponseappexpertcategoryresponse"></a>
<a id="tocspageresponseappexpertcategoryresponse"></a>

```json
{
  "records": [
    {
      "id": 0,
      "parentId": 0,
      "categoryName": "string",
      "sortOrder": 0
    }
  ],
  "total": 0,
  "page": 0,
  "size": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|records|[[AppExpertCategoryResponse](#schemaappexpertcategoryresponse)]|false|none||none|
|total|integer(int64)|false|none||none|
|page|integer(int64)|false|none||none|
|size|integer(int64)|false|none||none|

<h2 id="tocS_ApiResponsePageResponseAppExpertCategoryResponse">ApiResponsePageResponseAppExpertCategoryResponse</h2>

<a id="schemaapiresponsepageresponseappexpertcategoryresponse"></a>
<a id="schema_ApiResponsePageResponseAppExpertCategoryResponse"></a>
<a id="tocSapiresponsepageresponseappexpertcategoryresponse"></a>
<a id="tocsapiresponsepageresponseappexpertcategoryresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "records": [
      {
        "id": 0,
        "parentId": 0,
        "categoryName": "string",
        "sortOrder": 0
      }
    ],
    "total": 0,
    "page": 0,
    "size": 0
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[PageResponseAppExpertCategoryResponse](#schemapageresponseappexpertcategoryresponse)|false|none||none|

<h2 id="tocS_AppExpertResponse">AppExpertResponse</h2>

<a id="schemaappexpertresponse"></a>
<a id="schema_AppExpertResponse"></a>
<a id="tocSappexpertresponse"></a>
<a id="tocsappexpertresponse"></a>

```json
{
  "id": 0,
  "realName": "string",
  "gender": "UNKNOWN",
  "birthDate": "string",
  "mobile": "string",
  "avatarUrl": "string",
  "coverUrl": "string",
  "title": "string",
  "organization": "string",
  "specialty": "string",
  "introduction": "string",
  "consultationNotice": "string",
  "sortOrder": 0,
  "categoryIds": [
    0
  ],
  "experiences": [
    {
      "id": 0,
      "expertId": 0,
      "experienceType": "EDUCATION",
      "title": "string",
      "description": "string",
      "startDate": "string",
      "endDate": "string",
      "sortOrder": 0
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|realName|string|false|none||none|
|gender|string|false|none||none|
|birthDate|string|false|none||none|
|mobile|string|false|none||none|
|avatarUrl|string|false|none||none|
|coverUrl|string|false|none||none|
|title|string|false|none||none|
|organization|string|false|none||none|
|specialty|string|false|none||none|
|introduction|string|false|none||none|
|consultationNotice|string|false|none||none|
|sortOrder|integer|false|none||none|
|categoryIds|[integer]|false|none||none|
|experiences|[[ExpertExperienceResponse](#schemaexpertexperienceresponse)]|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|gender|UNKNOWN|
|gender|MALE|
|gender|FEMALE|

<h2 id="tocS_PageResponseAppExpertResponse">PageResponseAppExpertResponse</h2>

<a id="schemapageresponseappexpertresponse"></a>
<a id="schema_PageResponseAppExpertResponse"></a>
<a id="tocSpageresponseappexpertresponse"></a>
<a id="tocspageresponseappexpertresponse"></a>

```json
{
  "records": [
    {
      "id": 0,
      "realName": "string",
      "gender": "UNKNOWN",
      "birthDate": "string",
      "mobile": "string",
      "avatarUrl": "string",
      "coverUrl": "string",
      "title": "string",
      "organization": "string",
      "specialty": "string",
      "introduction": "string",
      "consultationNotice": "string",
      "sortOrder": 0,
      "categoryIds": [
        0
      ],
      "experiences": [
        {
          "id": 0,
          "expertId": 0,
          "experienceType": "EDUCATION",
          "title": "string",
          "description": "string",
          "startDate": "string",
          "endDate": "string",
          "sortOrder": 0
        }
      ]
    }
  ],
  "total": 0,
  "page": 0,
  "size": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|records|[[AppExpertResponse](#schemaappexpertresponse)]|false|none||none|
|total|integer(int64)|false|none||none|
|page|integer(int64)|false|none||none|
|size|integer(int64)|false|none||none|

<h2 id="tocS_ApiResponsePageResponseAppExpertResponse">ApiResponsePageResponseAppExpertResponse</h2>

<a id="schemaapiresponsepageresponseappexpertresponse"></a>
<a id="schema_ApiResponsePageResponseAppExpertResponse"></a>
<a id="tocSapiresponsepageresponseappexpertresponse"></a>
<a id="tocsapiresponsepageresponseappexpertresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "records": [
      {
        "id": 0,
        "realName": "string",
        "gender": "UNKNOWN",
        "birthDate": "string",
        "mobile": "string",
        "avatarUrl": "string",
        "coverUrl": "string",
        "title": "string",
        "organization": "string",
        "specialty": "string",
        "introduction": "string",
        "consultationNotice": "string",
        "sortOrder": 0,
        "categoryIds": [
          0
        ],
        "experiences": [
          {
            "id": null,
            "expertId": null,
            "experienceType": null,
            "title": null,
            "description": null,
            "startDate": null,
            "endDate": null,
            "sortOrder": null
          }
        ]
      }
    ],
    "total": 0,
    "page": 0,
    "size": 0
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[PageResponseAppExpertResponse](#schemapageresponseappexpertresponse)|false|none||none|

<h2 id="tocS_ApiResponseAppExpertResponse">ApiResponseAppExpertResponse</h2>

<a id="schemaapiresponseappexpertresponse"></a>
<a id="schema_ApiResponseAppExpertResponse"></a>
<a id="tocSapiresponseappexpertresponse"></a>
<a id="tocsapiresponseappexpertresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "realName": "string",
    "gender": "UNKNOWN",
    "birthDate": "string",
    "mobile": "string",
    "avatarUrl": "string",
    "coverUrl": "string",
    "title": "string",
    "organization": "string",
    "specialty": "string",
    "introduction": "string",
    "consultationNotice": "string",
    "sortOrder": 0,
    "categoryIds": [
      0
    ],
    "experiences": [
      {
        "id": 0,
        "expertId": 0,
        "experienceType": "EDUCATION",
        "title": "string",
        "description": "string",
        "startDate": "string",
        "endDate": "string",
        "sortOrder": 0
      }
    ]
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[AppExpertResponse](#schemaappexpertresponse)|false|none||none|

<h2 id="tocS_AppProfileResponse">AppProfileResponse</h2>

<a id="schemaappprofileresponse"></a>
<a id="schema_AppProfileResponse"></a>
<a id="tocSappprofileresponse"></a>
<a id="tocsappprofileresponse"></a>

```json
{
  "id": 0,
  "username": "string",
  "mobile": "string",
  "email": "string",
  "nickname": "string",
  "profileSignature": "string",
  "avatarUrl": "string",
  "authProvider": "WECHAT_MINIAPP",
  "gender": "UNKNOWN",
  "status": "DISABLED",
  "profileCompleted": true,
  "studentId": 0,
  "certificationStatus": "UNSUBMITTED"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|username|string|false|none||none|
|mobile|string|false|none||none|
|email|string|false|none||none|
|nickname|string|false|none||none|
|profileSignature|string|false|none||none|
|avatarUrl|string|false|none||none|
|authProvider|string|false|none||none|
|gender|string|false|none||none|
|status|string|false|none||none|
|profileCompleted|boolean|false|none||none|
|studentId|integer(int64)|false|none||none|
|certificationStatus|string|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|authProvider|WECHAT_MINIAPP|
|authProvider|MOBILE_SMS|
|gender|UNKNOWN|
|gender|MALE|
|gender|FEMALE|
|status|DISABLED|
|status|ENABLED|
|certificationStatus|UNSUBMITTED|
|certificationStatus|PENDING|
|certificationStatus|APPROVED|
|certificationStatus|REJECTED|

<h2 id="tocS_ApiResponseAppProfileResponse">ApiResponseAppProfileResponse</h2>

<a id="schemaapiresponseappprofileresponse"></a>
<a id="schema_ApiResponseAppProfileResponse"></a>
<a id="tocSapiresponseappprofileresponse"></a>
<a id="tocsapiresponseappprofileresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "username": "string",
    "mobile": "string",
    "email": "string",
    "nickname": "string",
    "profileSignature": "string",
    "avatarUrl": "string",
    "authProvider": "WECHAT_MINIAPP",
    "gender": "UNKNOWN",
    "status": "DISABLED",
    "profileCompleted": true,
    "studentId": 0,
    "certificationStatus": "UNSUBMITTED"
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[AppProfileResponse](#schemaappprofileresponse)|false|none||none|

<h2 id="tocS_AppProfileUpdateRequest">AppProfileUpdateRequest</h2>

<a id="schemaappprofileupdaterequest"></a>
<a id="schema_AppProfileUpdateRequest"></a>
<a id="tocSappprofileupdaterequest"></a>
<a id="tocsappprofileupdaterequest"></a>

```json
{
  "nickname": "string",
  "profileSignature": "string",
  "avatarUrl": "string",
  "email": "user@example.com",
  "gender": "UNKNOWN"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|nickname|string|false|none||none|
|profileSignature|string|false|none||none|
|avatarUrl|string|false|none||none|
|email|string(email)|false|none||none|
|gender|string|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|gender|UNKNOWN|
|gender|MALE|
|gender|FEMALE|

<h2 id="tocS_AppAvatarUploadResponse">AppAvatarUploadResponse</h2>

<a id="schemaappavataruploadresponse"></a>
<a id="schema_AppAvatarUploadResponse"></a>
<a id="tocSappavataruploadresponse"></a>
<a id="tocsappavataruploadresponse"></a>

```json
{
  "method": "string",
  "uploadUrl": "string",
  "bucketName": "string",
  "objectKey": "string",
  "contentType": "string",
  "fileSize": 0,
  "expiresAt": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|method|string|false|none||none|
|uploadUrl|string|false|none||none|
|bucketName|string|false|none||none|
|objectKey|string|false|none||none|
|contentType|string|false|none||none|
|fileSize|integer(int64)|false|none||none|
|expiresAt|string|false|none||none|

<h2 id="tocS_ApiResponseAppAvatarUploadResponse">ApiResponseAppAvatarUploadResponse</h2>

<a id="schemaapiresponseappavataruploadresponse"></a>
<a id="schema_ApiResponseAppAvatarUploadResponse"></a>
<a id="tocSapiresponseappavataruploadresponse"></a>
<a id="tocsapiresponseappavataruploadresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "method": "string",
    "uploadUrl": "string",
    "bucketName": "string",
    "objectKey": "string",
    "contentType": "string",
    "fileSize": 0,
    "expiresAt": "string"
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[AppAvatarUploadResponse](#schemaappavataruploadresponse)|false|none||none|

<h2 id="tocS_AppAvatarUploadRequest">AppAvatarUploadRequest</h2>

<a id="schemaappavataruploadrequest"></a>
<a id="schema_AppAvatarUploadRequest"></a>
<a id="tocSappavataruploadrequest"></a>
<a id="tocsappavataruploadrequest"></a>

```json
{
  "originalName": "string",
  "contentType": "string",
  "fileSize": 1
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|originalName|string|true|none||none|
|contentType|string|true|none||none|
|fileSize|integer(int64)|true|none||none|

<h2 id="tocS_AppAvatarConfirmRequest">AppAvatarConfirmRequest</h2>

<a id="schemaappavatarconfirmrequest"></a>
<a id="schema_AppAvatarConfirmRequest"></a>
<a id="tocSappavatarconfirmrequest"></a>
<a id="tocsappavatarconfirmrequest"></a>

```json
{
  "objectKey": "string",
  "originalName": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|objectKey|string|true|none||none|
|originalName|string|false|none||none|

<h2 id="tocS_AppStudentCertificationFileResponse">AppStudentCertificationFileResponse</h2>

<a id="schemaappstudentcertificationfileresponse"></a>
<a id="schema_AppStudentCertificationFileResponse"></a>
<a id="tocSappstudentcertificationfileresponse"></a>
<a id="tocsappstudentcertificationfileresponse"></a>

```json
{
  "id": 0,
  "fileAssetId": 0,
  "sourceUrl": "string",
  "materialType": "string",
  "sortOrder": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|fileAssetId|integer(int64)|false|none||none|
|sourceUrl|string|false|none||none|
|materialType|string|false|none||none|
|sortOrder|integer|false|none||none|

<h2 id="tocS_AppStudentCertificationResponse">AppStudentCertificationResponse</h2>

<a id="schemaappstudentcertificationresponse"></a>
<a id="schema_AppStudentCertificationResponse"></a>
<a id="tocSappstudentcertificationresponse"></a>
<a id="tocsappstudentcertificationresponse"></a>

```json
{
  "studentId": 0,
  "studentNo": "string",
  "realName": "string",
  "mobile": "string",
  "province": "string",
  "provinceCode": "string",
  "city": "string",
  "cityCode": "string",
  "district": "string",
  "districtCode": "string",
  "organization": "string",
  "organizationId": 0,
  "positionTitle": "string",
  "practiceTypeId": 0,
  "status": "DISABLED",
  "certificationStatus": "UNSUBMITTED",
  "certificationSubmittedAt": "string",
  "certificationReviewedAt": "string",
  "rejectReason": "string",
  "certificationMaterials": "string",
  "certificationFiles": [
    {
      "id": 0,
      "fileAssetId": 0,
      "sourceUrl": "string",
      "materialType": "string",
      "sortOrder": 0
    }
  ],
  "enrolledAt": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|studentId|integer(int64)|false|none||none|
|studentNo|string|false|none||none|
|realName|string|false|none||none|
|mobile|string|false|none||none|
|province|string|false|none||none|
|provinceCode|string|false|none||none|
|city|string|false|none||none|
|cityCode|string|false|none||none|
|district|string|false|none||none|
|districtCode|string|false|none||none|
|organization|string|false|none||none|
|organizationId|integer(int64)|false|none||none|
|positionTitle|string|false|none||none|
|practiceTypeId|integer(int64)|false|none||none|
|status|string|false|none||none|
|certificationStatus|string|false|none||none|
|certificationSubmittedAt|string|false|none||none|
|certificationReviewedAt|string|false|none||none|
|rejectReason|string|false|none||none|
|certificationMaterials|string|false|none||none|
|certificationFiles|[[AppStudentCertificationFileResponse](#schemaappstudentcertificationfileresponse)]|false|none||none|
|enrolledAt|string|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|status|DISABLED|
|status|ENABLED|
|certificationStatus|UNSUBMITTED|
|certificationStatus|PENDING|
|certificationStatus|APPROVED|
|certificationStatus|REJECTED|

<h2 id="tocS_ApiResponseAppStudentCertificationResponse">ApiResponseAppStudentCertificationResponse</h2>

<a id="schemaapiresponseappstudentcertificationresponse"></a>
<a id="schema_ApiResponseAppStudentCertificationResponse"></a>
<a id="tocSapiresponseappstudentcertificationresponse"></a>
<a id="tocsapiresponseappstudentcertificationresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "studentId": 0,
    "studentNo": "string",
    "realName": "string",
    "mobile": "string",
    "province": "string",
    "provinceCode": "string",
    "city": "string",
    "cityCode": "string",
    "district": "string",
    "districtCode": "string",
    "organization": "string",
    "organizationId": 0,
    "positionTitle": "string",
    "practiceTypeId": 0,
    "status": "DISABLED",
    "certificationStatus": "UNSUBMITTED",
    "certificationSubmittedAt": "string",
    "certificationReviewedAt": "string",
    "rejectReason": "string",
    "certificationMaterials": "string",
    "certificationFiles": [
      {
        "id": 0,
        "fileAssetId": 0,
        "sourceUrl": "string",
        "materialType": "string",
        "sortOrder": 0
      }
    ],
    "enrolledAt": "string"
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[AppStudentCertificationResponse](#schemaappstudentcertificationresponse)|false|none||none|

<h2 id="tocS_AppStudentCertificationFileRequest">AppStudentCertificationFileRequest</h2>

<a id="schemaappstudentcertificationfilerequest"></a>
<a id="schema_AppStudentCertificationFileRequest"></a>
<a id="tocSappstudentcertificationfilerequest"></a>
<a id="tocsappstudentcertificationfilerequest"></a>

```json
{
  "fileAssetId": 0,
  "sourceUrl": "string",
  "materialType": "string",
  "sortOrder": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|fileAssetId|integer(int64)|false|none||none|
|sourceUrl|string|false|none||none|
|materialType|string|false|none||none|
|sortOrder|integer|false|none||none|

<h2 id="tocS_AppStudentCertificationRequest">AppStudentCertificationRequest</h2>

<a id="schemaappstudentcertificationrequest"></a>
<a id="schema_AppStudentCertificationRequest"></a>
<a id="tocSappstudentcertificationrequest"></a>
<a id="tocsappstudentcertificationrequest"></a>

```json
{
  "realName": "string",
  "mobile": "string",
  "idCardNo": "string",
  "province": "string",
  "provinceCode": "string",
  "city": "string",
  "cityCode": "string",
  "district": "string",
  "districtCode": "string",
  "organization": "string",
  "organizationId": 0,
  "positionTitle": "string",
  "practiceTypeId": 0,
  "certificationMaterials": "string",
  "certificationFiles": [
    {
      "fileAssetId": 0,
      "sourceUrl": "string",
      "materialType": "string",
      "sortOrder": 0
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|realName|string|true|none||none|
|mobile|string|false|none||none|
|idCardNo|string|false|none||none|
|province|string|false|none||none|
|provinceCode|string|false|none||none|
|city|string|false|none||none|
|cityCode|string|false|none||none|
|district|string|false|none||none|
|districtCode|string|false|none||none|
|organization|string|false|none||none|
|organizationId|integer(int64)|false|none||none|
|positionTitle|string|false|none||none|
|practiceTypeId|integer(int64)|false|none||none|
|certificationMaterials|string|false|none||none|
|certificationFiles|[[AppStudentCertificationFileRequest](#schemaappstudentcertificationfilerequest)]|false|none||none|

<h2 id="tocS_AppResourceRecordResponse">AppResourceRecordResponse</h2>

<a id="schemaappresourcerecordresponse"></a>
<a id="schema_AppResourceRecordResponse"></a>
<a id="tocSappresourcerecordresponse"></a>
<a id="tocsappresourcerecordresponse"></a>

```json
{
  "id": 0,
  "resourceType": "string",
  "resourceId": 0,
  "source": "string",
  "viewCount": 0,
  "occurredAt": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|resourceType|string|false|none||none|
|resourceId|integer(int64)|false|none||none|
|source|string|false|none||none|
|viewCount|integer|false|none||none|
|occurredAt|string|false|none||none|

<h2 id="tocS_PageResponseAppResourceRecordResponse">PageResponseAppResourceRecordResponse</h2>

<a id="schemapageresponseappresourcerecordresponse"></a>
<a id="schema_PageResponseAppResourceRecordResponse"></a>
<a id="tocSpageresponseappresourcerecordresponse"></a>
<a id="tocspageresponseappresourcerecordresponse"></a>

```json
{
  "records": [
    {
      "id": 0,
      "resourceType": "string",
      "resourceId": 0,
      "source": "string",
      "viewCount": 0,
      "occurredAt": "string"
    }
  ],
  "total": 0,
  "page": 0,
  "size": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|records|[[AppResourceRecordResponse](#schemaappresourcerecordresponse)]|false|none||none|
|total|integer(int64)|false|none||none|
|page|integer(int64)|false|none||none|
|size|integer(int64)|false|none||none|

<h2 id="tocS_ApiResponsePageResponseAppResourceRecordResponse">ApiResponsePageResponseAppResourceRecordResponse</h2>

<a id="schemaapiresponsepageresponseappresourcerecordresponse"></a>
<a id="schema_ApiResponsePageResponseAppResourceRecordResponse"></a>
<a id="tocSapiresponsepageresponseappresourcerecordresponse"></a>
<a id="tocsapiresponsepageresponseappresourcerecordresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "records": [
      {
        "id": 0,
        "resourceType": "string",
        "resourceId": 0,
        "source": "string",
        "viewCount": 0,
        "occurredAt": "string"
      }
    ],
    "total": 0,
    "page": 0,
    "size": 0
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[PageResponseAppResourceRecordResponse](#schemapageresponseappresourcerecordresponse)|false|none||none|

<h2 id="tocS_AppProfileSummaryResponse">AppProfileSummaryResponse</h2>

<a id="schemaappprofilesummaryresponse"></a>
<a id="schema_AppProfileSummaryResponse"></a>
<a id="tocSappprofilesummaryresponse"></a>
<a id="tocsappprofilesummaryresponse"></a>

```json
{
  "profile": {
    "id": 0,
    "username": "string",
    "mobile": "string",
    "email": "string",
    "nickname": "string",
    "profileSignature": "string",
    "avatarUrl": "string",
    "authProvider": "WECHAT_MINIAPP",
    "gender": "UNKNOWN",
    "status": "DISABLED",
    "profileCompleted": true,
    "studentId": 0,
    "certificationStatus": "UNSUBMITTED"
  },
  "certificationStatus": "UNSUBMITTED",
  "favoriteCount": 0,
  "browseHistoryCount": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|profile|[AppProfileResponse](#schemaappprofileresponse)|false|none||none|
|certificationStatus|string|false|none||none|
|favoriteCount|integer(int64)|false|none||none|
|browseHistoryCount|integer(int64)|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|certificationStatus|UNSUBMITTED|
|certificationStatus|PENDING|
|certificationStatus|APPROVED|
|certificationStatus|REJECTED|

<h2 id="tocS_ApiResponseAppProfileSummaryResponse">ApiResponseAppProfileSummaryResponse</h2>

<a id="schemaapiresponseappprofilesummaryresponse"></a>
<a id="schema_ApiResponseAppProfileSummaryResponse"></a>
<a id="tocSapiresponseappprofilesummaryresponse"></a>
<a id="tocsapiresponseappprofilesummaryresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "profile": {
      "id": 0,
      "username": "string",
      "mobile": "string",
      "email": "string",
      "nickname": "string",
      "profileSignature": "string",
      "avatarUrl": "string",
      "authProvider": "WECHAT_MINIAPP",
      "gender": "UNKNOWN",
      "status": "DISABLED",
      "profileCompleted": true,
      "studentId": 0,
      "certificationStatus": "UNSUBMITTED"
    },
    "certificationStatus": "UNSUBMITTED",
    "favoriteCount": 0,
    "browseHistoryCount": 0
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[AppProfileSummaryResponse](#schemaappprofilesummaryresponse)|false|none||none|

<h2 id="tocS_ApiResponseBoolean">ApiResponseBoolean</h2>

<a id="schemaapiresponseboolean"></a>
<a id="schema_ApiResponseBoolean"></a>
<a id="tocSapiresponseboolean"></a>
<a id="tocsapiresponseboolean"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": true
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|boolean|false|none||none|

<h2 id="tocS_UserProfile">UserProfile</h2>

<a id="schemauserprofile"></a>
<a id="schema_UserProfile"></a>
<a id="tocSuserprofile"></a>
<a id="tocsuserprofile"></a>

```json
{
  "id": 0,
  "username": "string",
  "nickname": "string",
  "avatarUrl": "string",
  "lastLoginAt": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|username|string|false|none||none|
|nickname|string|false|none||none|
|avatarUrl|string|false|none||none|
|lastLoginAt|string|false|none||none|

<h2 id="tocS_AppLoginResponse">AppLoginResponse</h2>

<a id="schemaapploginresponse"></a>
<a id="schema_AppLoginResponse"></a>
<a id="tocSapploginresponse"></a>
<a id="tocsapploginresponse"></a>

```json
{
  "tokenType": "string",
  "accessToken": "string",
  "expiresIn": 0,
  "user": {
    "id": 0,
    "username": "string",
    "nickname": "string",
    "avatarUrl": "string",
    "lastLoginAt": "string"
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|tokenType|string|false|none||none|
|accessToken|string|false|none||none|
|expiresIn|integer(int64)|false|none||none|
|user|[UserProfile](#schemauserprofile)|false|none||none|

<h2 id="tocS_ApiResponseAppLoginResponse">ApiResponseAppLoginResponse</h2>

<a id="schemaapiresponseapploginresponse"></a>
<a id="schema_ApiResponseAppLoginResponse"></a>
<a id="tocSapiresponseapploginresponse"></a>
<a id="tocsapiresponseapploginresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "tokenType": "string",
    "accessToken": "string",
    "expiresIn": 0,
    "user": {
      "id": 0,
      "username": "string",
      "nickname": "string",
      "avatarUrl": "string",
      "lastLoginAt": "string"
    }
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[AppLoginResponse](#schemaapploginresponse)|false|none||none|

<h2 id="tocS_AppLoginRequest">AppLoginRequest</h2>

<a id="schemaapploginrequest"></a>
<a id="schema_AppLoginRequest"></a>
<a id="tocSapploginrequest"></a>
<a id="tocsapploginrequest"></a>

```json
{
  "username": "string",
  "password": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|username|string|true|none||none|
|password|string|true|none||none|

<h2 id="tocS_AppSmsCodeRequest">AppSmsCodeRequest</h2>

<a id="schemaappsmscoderequest"></a>
<a id="schema_AppSmsCodeRequest"></a>
<a id="tocSappsmscoderequest"></a>
<a id="tocsappsmscoderequest"></a>

```json
{
  "mobile": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|mobile|string|true|none||none|

<h2 id="tocS_AppSmsLoginRequest">AppSmsLoginRequest</h2>

<a id="schemaappsmsloginrequest"></a>
<a id="schema_AppSmsLoginRequest"></a>
<a id="tocSappsmsloginrequest"></a>
<a id="tocsappsmsloginrequest"></a>

```json
{
  "mobile": "string",
  "code": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|mobile|string|true|none||none|
|code|string|true|none||none|

<h2 id="tocS_AppWechatLoginResponse">AppWechatLoginResponse</h2>

<a id="schemaappwechatloginresponse"></a>
<a id="schema_AppWechatLoginResponse"></a>
<a id="tocSappwechatloginresponse"></a>
<a id="tocsappwechatloginresponse"></a>

```json
{
  "registered": true,
  "needBindMobile": true,
  "bindToken": "string",
  "tokenType": "string",
  "accessToken": "string",
  "expiresIn": 0,
  "user": {
    "id": 0,
    "username": "string",
    "nickname": "string",
    "avatarUrl": "string",
    "lastLoginAt": "string"
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|registered|boolean|false|none||none|
|needBindMobile|boolean|false|none||none|
|bindToken|string|false|none||none|
|tokenType|string|false|none||none|
|accessToken|string|false|none||none|
|expiresIn|integer(int64)|false|none||none|
|user|[UserProfile](#schemauserprofile)|false|none||none|

<h2 id="tocS_ApiResponseAppWechatLoginResponse">ApiResponseAppWechatLoginResponse</h2>

<a id="schemaapiresponseappwechatloginresponse"></a>
<a id="schema_ApiResponseAppWechatLoginResponse"></a>
<a id="tocSapiresponseappwechatloginresponse"></a>
<a id="tocsapiresponseappwechatloginresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "registered": true,
    "needBindMobile": true,
    "bindToken": "string",
    "tokenType": "string",
    "accessToken": "string",
    "expiresIn": 0,
    "user": {
      "id": 0,
      "username": "string",
      "nickname": "string",
      "avatarUrl": "string",
      "lastLoginAt": "string"
    }
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[AppWechatLoginResponse](#schemaappwechatloginresponse)|false|none||none|

<h2 id="tocS_AppWechatLoginRequest">AppWechatLoginRequest</h2>

<a id="schemaappwechatloginrequest"></a>
<a id="schema_AppWechatLoginRequest"></a>
<a id="tocSappwechatloginrequest"></a>
<a id="tocsappwechatloginrequest"></a>

```json
{
  "code": "string",
  "nickname": "string",
  "avatarUrl": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|string|true|none||none|
|nickname|string|false|none||none|
|avatarUrl|string|false|none||none|

<h2 id="tocS_AppWechatBindMobileRequest">AppWechatBindMobileRequest</h2>

<a id="schemaappwechatbindmobilerequest"></a>
<a id="schema_AppWechatBindMobileRequest"></a>
<a id="tocSappwechatbindmobilerequest"></a>
<a id="tocsappwechatbindmobilerequest"></a>

```json
{
  "bindToken": "string",
  "mobile": "string",
  "code": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|bindToken|string|true|none||none|
|mobile|string|true|none||none|
|code|string|true|none||none|

<h2 id="tocS_CurrentAppUserResponse">CurrentAppUserResponse</h2>

<a id="schemacurrentappuserresponse"></a>
<a id="schema_CurrentAppUserResponse"></a>
<a id="tocScurrentappuserresponse"></a>
<a id="tocscurrentappuserresponse"></a>

```json
{
  "id": 0,
  "username": "string",
  "nickname": "string",
  "avatarUrl": "string",
  "mobile": "string",
  "email": "string",
  "profileCompleted": true,
  "studentId": 0,
  "certificationStatus": "UNSUBMITTED"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||none|
|username|string|false|none||none|
|nickname|string|false|none||none|
|avatarUrl|string|false|none||none|
|mobile|string|false|none||none|
|email|string|false|none||none|
|profileCompleted|boolean|false|none||none|
|studentId|integer(int64)|false|none||none|
|certificationStatus|string|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|certificationStatus|UNSUBMITTED|
|certificationStatus|PENDING|
|certificationStatus|APPROVED|
|certificationStatus|REJECTED|

<h2 id="tocS_ApiResponseCurrentAppUserResponse">ApiResponseCurrentAppUserResponse</h2>

<a id="schemaapiresponsecurrentappuserresponse"></a>
<a id="schema_ApiResponseCurrentAppUserResponse"></a>
<a id="tocSapiresponsecurrentappuserresponse"></a>
<a id="tocsapiresponsecurrentappuserresponse"></a>

```json
{
  "success": true,
  "code": "string",
  "message": "string",
  "data": {
    "id": 0,
    "username": "string",
    "nickname": "string",
    "avatarUrl": "string",
    "mobile": "string",
    "email": "string",
    "profileCompleted": true,
    "studentId": 0,
    "certificationStatus": "UNSUBMITTED"
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|success|boolean|false|none||none|
|code|string|false|none||none|
|message|string|false|none||none|
|data|[CurrentAppUserResponse](#schemacurrentappuserresponse)|false|none||none|

