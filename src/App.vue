<template>
  <div id="app">
    <HeaderNav></HeaderNav>
    <transition name="fade" mode="out-in">
      <router-view class="main"></router-view>
    </transition>
    <BackTop></BackTop>
  </div>
</template>

<script>
import HeaderNav from '@/components/HeaderNav.vue'
export default {
  name: 'home',
  components: {
    HeaderNav
  }
}
</script>

<style lang="scss">
@media (max-width: 767px) {
  .main {
    margin-top: 50px;
  }
}
@media (min-width: 768px) {
  .main {
    margin-top: 100px;
  }
}
</style>
