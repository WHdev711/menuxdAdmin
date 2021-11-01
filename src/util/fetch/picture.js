import axios from 'axios'

import { basePathAPI as basePath } from '../../constants/defaultValues'

export const uploadPicture = (id, name, file, token, path=basePath) => {
  const formData = new FormData()
  formData.append(name, file)
  return axios.post(`${path}/api/v1/pictures/${id}/${name}`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })
}
