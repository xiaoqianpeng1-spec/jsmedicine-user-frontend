export interface InputStreamSource {
}

export interface ResponseEntityInputStreamResource {
  inputStreamSource: InputStreamSource
  description: string
  equality: object
  read: boolean
}

export interface ApiResponseResponseEntityInputStreamResource {
  success: boolean
  code: string
  message: string
  data: ResponseEntityInputStreamResource
}

export const filesApi = {
  // 读取公开图片资源内容（返回二进制流）
  async getFileContent(id: number): Promise<Blob> {
    const config = useRuntimeConfig()
    const baseUrl = config.public.apiBase || ''
    
    const response = await fetch(`${baseUrl}/api/v1/files/${id}/content`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    
    if (!response.ok) {
      throw new Error('获取图片资源失败')
    }
    
    return response.blob()
  }
}
