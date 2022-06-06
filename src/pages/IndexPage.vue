<template>
  <q-page padding>
    <q-table
      title="Crud"
      :rows="posts"
      :columns="columns"
      row-key="name"
    />
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { api } from 'boot/axios'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const posts = ref([])
    const columns = [
      { name: 'id', field: 'id', label: 'ID', align: 'center', sortable: true },
      { name: 'title', field: 'title', label: 'Título', align: 'center', sortable: true },
      { name: 'author', field: 'author', label: 'Autor', align: 'center', sortable: true }
    ]

    onMounted(() => {
      getPosts()
    })

    const getPosts = async () => {
      try {
        const { data } = await api.get('posts')
        posts.value = data
      } catch (e) {
        throw new Error(e)
      }
    }

    return {
      posts,
      columns
    }
  }
})
</script>
