import useApi from 'src/composables/UseApi'

export default function postsService () {
  const { list, listById, post, update, remove } = useApi('posts')

  return {
    list,
    listById,
    post,
    update,
    remove
  }
}
