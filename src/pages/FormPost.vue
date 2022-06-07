<template>
  <q-page padding>
    <q-form
      @submit="onSubmit"
      class="row q-col-gutter-sm"
    >
      <q-input
        outlined
        label="Título"
        v-model="form.title"
        lazy-rules
        :rules="[val => val && val.length > 0 || 'Campo obrigatório!']"
        class="col-lg-6 col-xs-12"
      />

      <q-input
        outlined
        label="Autor"
        v-model="form.author"
        lazy-rules
        :rules="[val => val && val.length > 0 || 'Campo obrigatório!']"
        class="col-lg-6 col-xs-12"
      />

      <div class="col-lg-12 col-xs-12">
        <q-editor
          v-model="form.content"
          min-height="Screm"
        />
      </div>

      <div class="col-12 q-gutter-sm">
        <q-btn
          label="Salvar"
          icon="save"
          class="float-right"
          color="primary"
          type="submit"
        />
        <q-btn
          label="Cancelar"
          icon="cancel"
          class="float-right"
          color="white"
          text-color="primary"
          :to="{ name: 'home' }"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import postsService from 'src/services/posts'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'FormPost',
  setup () {
    const { post, listById, update } = postsService()
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const form = ref({
      title: '',
      content: '',
      author: ''
    })

    onMounted(async () => {
      if (route.params.id) {
        try {
          const data = await listById(route.params.id)
          if (data) {
            form.value = data
          }
        } catch (e) {
          $q.notify({ message: `Erro ao buscar post de ID: ${route.params.id}`, icon: 'error', color: 'negative' })
        }
      }
    })

    const onSubmit = async () => {
      try {
        if (form.value.id) {
          await update(form.value)
        } else {
          await post(form.value)
        }
        $q.notify({ message: 'Post salvo com sucesso', icon: 'check', color: 'positive' })
        router.push({ name: 'home' })
      } catch (e) {
        $q.notify({ message: 'Erro ao salvar posts', icon: 'error', color: 'negative' })
        console.log(e)
      }
    }

    return {
      form,
      onSubmit
    }
  }
})
</script>

<style>

</style>
