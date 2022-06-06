<template>
  <q-page padding>
    <q-table
      title="Crud"
      :rows="posts"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            icon="delete"
            color="negative"
            size="sm"
            @click="deletePosts(props.row.id)"
            dense />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import postsService from 'src/services/posts'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const posts = ref([])
    const { list, remove } = postsService()
    const columns = [
      { name: 'id', field: 'id', label: 'ID', sortable: true, align: 'left' },
      { name: 'title', field: 'title', label: 'Título', sortable: true, align: 'left' },
      { name: 'author', field: 'author', label: 'Autor', sortable: true, align: 'left' },
      { name: 'actions', field: 'actions', label: 'Ações', align: 'right' }
    ]

    onMounted(() => {
      getPosts()
    })

    const getPosts = async () => {
      try {
        posts.value = await list()
      } catch (e) {
        throw new Error(e)
      }
    }

    const deletePosts = async (id) => {
      try {
        await remove(id)
        await getPosts()
      } catch (e) {
        throw new Error(e)
      }
    }

    return {
      posts,
      columns,
      deletePosts
    }
  }
})
</script>
