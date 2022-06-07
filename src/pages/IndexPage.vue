<template>
  <q-page padding>
    <q-table
      title="Crud"
      :rows="posts"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:top>
        <span class="text-h5">Artigos</span>
        <q-space />
        <q-btn color="primary" label="Novo" :to="{ name: 'formPost'}" />
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn
            icon="edit"
            color="info"
            size="sm"
            @click="updatePost(props.row.id)"
            dense />
          <q-btn
            icon="delete"
            color="negative"
            size="sm"
            @click="deletePost(props.row.id)"
            dense />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import postsService from 'src/services/posts'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

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
    const $q = useQuasar()
    const router = useRouter()

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

    const deletePost = async (id) => {
      try {
        $q.dialog({
          title: 'Remover',
          message: `Deseja realmente remover o registro com ID: ${id}?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(id)
          $q.notify({ message: 'Apagado com sucesso', icon: 'check', color: 'positive' })
          await getPosts()
        })
      } catch (e) {
        $q.notify({ message: 'Erro ao apagar posts', icon: 'error', color: 'negative' })
      }
    }

    const updatePost = (id) => {
      router.push({ name: 'formPost', params: { id } })
    }

    return {
      posts,
      columns,
      deletePost,
      updatePost
    }
  }
})
</script>
