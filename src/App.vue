<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import { defineComponent } from 'vue';

// export default defineComponent({
//   name: 'App',
// });
import LoginForm from './components/LoginForm.vue';

export default {
  components:{LoginForm}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>