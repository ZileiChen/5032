<script>
import axios from 'axios'

export default {
  data() {
    return {
      jsondata: null,
      error: null,
    }
  },
  methods: {
    async getBookCount() {
      try {
        const response = await axios.get('https://countbooks-aqz6zsq35q-uc.a.run.app')
        this.jsondata = response.data
        this.error = null
        console.log('Book count fetched successfully:', this.jsondata)
      } catch (error) {
        console.error('Error fetching book count:', error)
        this.error = error
        this.count = null
      }
    },
  },
  async mounted() {
    await this.getBookCount()
  },
}
</script>

<template>
  <pre>{{ jsondata }}</pre>
</template>
