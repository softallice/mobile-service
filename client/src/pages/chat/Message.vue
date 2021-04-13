<template>
<div class="q-pa-md row justify-center">
    <div v-if="message.user" style="width: 100%">
      <q-chat-message v-if="message.user.email === $store.state.auth.user.email"
        sent
        :avatar="message.user.avatar ? message.user.avatar : `https://cdn.quasar.dev/img/avatar5.jpg`"
        :name="message.user.lastname"
        bg-color="primary"
        :text="[message.text]"
        :stamp="DateMessage"
        text-color="white"
      >
      <!-- <span>{{ message.user.email }}</span>
      <p>{{ DateMessage }}</p>
      <p>{{ message.text }}</p> -->
      </q-chat-message>
      <q-chat-message v-else
      :avatar="message.user.avatar ? message.user.avatar : `https://cdn.quasar.dev/img/avatar5.jpg`"
      :name="message.user.lastname"
      :text="[message.text]"
      :stamp="DateMessage"
      bg-color="amber-7"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['message', 'index'],
  computed: {
    DateMessage () {
      return this.message.createdAt
    }
  }
}
</script>