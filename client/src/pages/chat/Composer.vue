<template>
  <form class="flex flex-row flex-space-between" id="send-message" v-on:submit.prevent>
    <q-input class="full-width" square standout v-model="newMessage" label="Your message" name="text">
      <template v-slot:before>
        <q-avatar>
          <img :src="avatar" >
        </q-avatar>
      </template>

    <!-- <button class="button-primary" type="submit" @click="addMessage">Send</button> -->
      <template v-slot:after>
        <q-btn round dense flat icon="send" type="submit" @click="addMessage" />
      </template>
    </q-input>
  </form>
</template>

<script>
export default {
  name: 'CreateMessage',
  data () {
    return {
      newMessage: '',
      avatar: this.$store.state.auth.user.avatar
    }
  },
  props: {
    createMessage: Function,
  },
  methods: {
    addMessage () {
      // Create a new message and then clear the input field
      this.createMessage({ text: this.newMessage }).then(this.clearMessage)
    },
    clearMessage () {
      this.newMessage = ''
    }
  }
}
</script>