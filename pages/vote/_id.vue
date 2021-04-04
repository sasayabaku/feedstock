<template>
  <div class="container" id="all">
    <div class="vote_form">
      <Vote />
    </div>

    <div class="votes">
      <ShowVote />
    </div>
  </div>
</template>


<script>
import Vote from '@/components/vote/input.vue';
import ShowVote from '@/components/vote/showing.vue';

export default {
    components: {
        Vote,
        ShowVote
    },
    async created() {
        this.$store.commit('setCurrentMeeting', this.$route.params.id);
    },
    async mounted() {
        this.$store.commit('setCurrentMeeting', this.$route.params.id);
    },

}
</script>

<style lang="scss" scoped>

  .container {
    width: 80%;

      @media screen and (max-width: 700px) {
        width: 100%;
      }

    }

  .vote_form {
    display: flex;
    justify-content: center;
  }

  .votes {
    display: flex;
    justify-content: center;
    margin: 5rem 0;
  }
</style>


<style lang="scss">
  .header {
    display: block;
  }
</style>