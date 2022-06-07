import { api } from 'boot/axios'

export default function useApi (url) {
  const list = async () => {
    try {
      const { data } = await api.get(url)
      return data
    } catch (e) {
      throw new Error(e)
    }
  }

  const post = async (param) => {
    try {
      const { data } = await api.post(url, param)
      return data
    } catch (e) {
      throw new Error(e)
    }
  }

  const update = async (param) => {
    try {
      const { data } = await api.put(`${url}/${param.id}`, param)
      return data
    } catch (e) {
      throw new Error(e)
    }
  }

  const remove = async (id) => {
    try {
      const { data } = await api.delete(`${url}/${id}`)
      return data
    } catch (e) {
      throw new Error(e)
    }
  }

  return {
    list,
    post,
    update,
    remove
  }
}
