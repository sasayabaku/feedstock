<template>
    <div class="container" id="all">
        {{ this.$route.params.id }}
        aaa
    </div>
</template>
<script>
export default {
    
}
</script>

<style lang="scss" scoped>
  .container {
    width: 80%;

      @media screen and (max-width: 700px) {
        width: 100%;
      }

    }
</style>

<style lang="scss">
  .header {
    display: block;
  }
</style>