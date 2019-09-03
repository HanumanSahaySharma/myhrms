<template>
  <div class="sidebar" v-if="authUser">
    <div class="logo d-flex justify-content-center align-items-center">
      <a href="#">
        <img src="../assets/images/logo.svg" width="30" />
      </a>
    </div>
    <app-navbar></app-navbar>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  computed: {
    authUser(){
      return this.$store.state.authUser
    }
  },
  components: {
    appNavbar: Navbar
  }
}
</script>
