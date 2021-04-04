<template>
    <div id="vote">
        <div class="center content-inputs">
            <div class="check vote_form">
                <v-textarea v-on:keydown.enter.ctrl.exact="send()" v-model="comment" label="Comment" auto-grow rows=1 counter=200 color="#0A256A"></v-textarea>
                <div class="validation_error">{{ validation_result }}</div>
                <v-textarea v-on:keydown.enter.ctrl.exact="send()" v-model="user" label="(Optional) User Name" auto-grow rows=1 counter=12 color="#0A256A"></v-textarea>
            </div>
            <div class="vote_form"><vs-button color="primary" type="border" @click="send()">Send</vs-button></div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/app';
import firebase_db from '@/plugins/firebase';

export default{
    data () {
        return {
            comment: null,
            user: null,
            validation_result: null
        }
    },
    methods: {
        send(){
            if (this.comment === null || this.comment === "") {

                this.validation_result = "Comment を入力してください"

            } else {            

                function getRandomInt(min, max) {
                    return Math.floor(Math.random() * (max - min)) + min;
                }
                let color = `rgb(${getRandomInt(0,255)},${getRandomInt(0,255)},${getRandomInt(0,255)})`
                this.$vs.notify({
                    'title': "Sended",
                    'color': color
                })
                // realtime databaseで降順にするためのunix時間 * -1の値を取得
                var now = new Date()
                var sortTime = now.getTime() * -1

                // Save Realtime Store
                let Ref = firebase_db.database().ref("events/"+ this.$store.state.current_meeting +"/votes")

                Ref.push({
                    username: this.user,
                    comment: this.comment,
                    createAt: firebase.database.ServerValue.TIMESTAMP,
                    sortTime: sortTime,
                })
                .then(response => {
                    this.comment = null;
                    this.user = null;
                })

                this.validation_result = null;
            }
        }
    }
}

</script>

<style lang="scss">
    .center {
        display: flex;
        align-items: center;
    }

    .check {
        width: 500px;
    }

    .vote_form {
        padding: 0 1rem;
    }

    .validation_error {
        color:red;
    }
</style>