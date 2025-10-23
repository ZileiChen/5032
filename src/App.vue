<script>
import Header from './components/Header.vue'
import CountBookAPI from './views/CountBookAPI.vue'


export default {
  name: 'App',
  components: {
    Header,
    CountBookAPI,
  },
  computed: {
    showHeader() {
      return this.$route.name !== 'CountBookAPI'
    },
  },
}
</script>



<template>
  <header v-if="showHeader"><Header /></header>

  <router-view></router-view>
</template>
