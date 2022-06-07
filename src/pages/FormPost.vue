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
import { defineComponent, ref } from 'vue'
import postsService from 'src/services/posts'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'FormPost',
  setup () {
    const { post } = postsService()
    const $q = useQuasar()
    const router = useRouter()
    const form = ref({
      title: '',
      content: '',
      author: ''
    })

    const onSubmit = async () => {
      try {
        await post(form.value)
        $q.notify({ message: 'Cadastrado com sucesso', icon: 'check', color: 'positive' })
        router.push({ name: 'home' })
      } catch (e) {
        $q.notify({ message: 'Erro ao apagar posts', icon: 'times', color: 'negative' })
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
