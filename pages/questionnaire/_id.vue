<template>
    <div class="container" id="all">
        <div class="q-card" v-for="question in localquestions" :key="question.Dep">
            <Question :question="question" />
        </div>
    </div>
</template>
<script>
import firebase_db from '@/plugins/firebase';
import Question from '@/components/questionnaire/question.vue';
export default {
    components: {
        Question
    },
    async created() {
        this.$store.commit('setCurrentMeeting', this.$route.params.id);

        this.$store.commit('setEnpty');
        await this.fetchQuestions();
    },
    async mounted() {
        this.$store.commit('setCurrentMeeting', this.$route.params.id);
    },
    methods: {
        fetchQuestions() {
            firebase_db.database().ref("events/" + this.$store.state.current_meeting + "/questions").on('child_added', snapshot => {
                var data = snapshot.toJSON();
                data['snapshot_id'] = snapshot.key;
                this.$store.commit('setQuestions', data);
            })
        },
    },
    computed: {
        localquestions: {
            get() {
                return this.$store.state.questions;
            }
        }
    }

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