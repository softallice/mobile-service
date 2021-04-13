<template>
  <q-page class="flex column">
    <q-scroll-area
      style="height: 600px;"
      ref="chatArea" 
      @scroll="scrollinfo" 
    >
    <div class="q-pa-md column col justify-end">
       <main class="chat flex flex-column flex-1 clear" style="max-width:300px">
        <single-message v-for="message in messages" v-bind:key="message._id" :message="message" v-cloak />
       </main> 
    </div>
    </q-scroll-area>
    <q-footer bordered class="bg-white text-primary">
      <ComposeMessage :createMessage="createMessage" />
    </q-footer>
  </q-page>
  
</template>

<script>
import ComposeMessage from './Composer.vue'
import SingleMessage from './Message.vue'
export default {
  name: 'message-list',
  data () {
    return {
      scrollsize: 0
    }
  },
  props: {
    messages: Array,
    findMessages: Function,
    createMessage: Function
  },
  methods: {
    // scrollToBottom () {
    //   this.$nextTick(() => {
    //     const node = this.$el.getElementsByClassName('chatArea')[0]
    //     node.scrollTop = node.scrollHeight
    //   })
    // },
    scrollinfo(info){ 
      const size = info.verticalSize;
      this.scrollsize = size;
    }
  },
  watch: {
    // messages () {
    //   this.messages.length && this.scrollToBottom('chat')
    // },
    scrollsize: function(val){
  		this.$refs.chatArea.setScrollPosition(val-600,100);
	  }
  },
  components: {
    ComposeMessage,
    SingleMessage
  }
}
</script>