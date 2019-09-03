<template>
  <div id="app">
    <app-sidebar></app-sidebar>
    <main class="page-container">
      <app-header></app-header>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
export default {
  components: {
    appHeader: Header,
    appSidebar: Sidebar
  }
}
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap';
@import '~bootstrap-vue/src/index.scss';
@import './assets/style/style';
</style>
