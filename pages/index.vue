<template>
  <div class="enter">
    <div class="input">
      <div class="code_input">
        <vs-input 
          icon-after="true" icon="search" 
          label-placeholder="enter code here" 
          v-model="meeting_code" 
          size="large"
          v-on:keydown.enter.ctrl.exact="join()"
          />
      </div>
        <div class="vote_form">
          <vs-button color="primary" @click="join()" icon="arrow_forward"></vs-button>
        </div>
    </div>
  </div>

</template>

<script>
import firebase_db from '@/plugins/firebase';
export default ({
  data() {
    return {
      meeting_code: null,
    }
  },
  methods: {
    async check() {
      await this.$store.commit('setCurrentMeeting', this.meeting_code);
      this.meetingDB_validation();
    },
    async join() {
      await this.$store.commit('setCurrentMeeting', this.meeting_code);
      this.meetingDB_validation();
    },

    meetingDB_validation() {
      firebase_db.database().ref("events/" + this.$store.state.current_meeting).once('value', snapshot => {
        var data = snapshot.toJSON();

        if (data === null) {
          var validation_result = "This Meeting Code Not Found";
          this.$vs.notify({
            'title': validation_result,
            'color': 'danger',
            'position': 'top-center',
            'time': '3000'
          })

        } else {
          this.$router.push('/vote/' + this.$store.state.current_meeting);
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
  .enter {
    position:relative;
    height: auto;
    min-width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;

    .input {
      width: 100%;
      display: flex;
      align-items: flex-end;

      .code_input {
        display: block;
      }
    }
  }

  .validation_error {
    color: red;
  }
</style>

<style lang="scss">
  .header {
    display: none;
  }

  .vs-placeholder-label {
    font-size: 1.1rem;
  }
</style>