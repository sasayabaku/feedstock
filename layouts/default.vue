<template>
  <div class="main">
    <div class="header"><Header /></div>
    <div class="content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Header from '~/layouts/header.vue';
export default {
  components: {
    Header
  }
}
</script>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 14px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.main {
  width: 100%;
  min-height: 100vh;
  background-color: rgb(240, 241, 243);
}

.header {
  width: 100%;
  height: 6vh;
  min-height: 60px;
  position: fixed;
  top: 0;
  z-index: 1;
}

.content {
  display: flex;
  justify-content: center;
  margin: 0 3rem;
  padding: 5rem 0;
  min-height: 100vh;
}
</style>
