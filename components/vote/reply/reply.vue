<template>
    <vs-sidebar 
        parent="body" 
        defaul-index="1"
        hidden-background
        position-right
        click-not-close 
        v-model="reply"
        >
        <div v-if="reply" class="sidenav">
            <div class="close-button">
                <vs-button @click="handleClose" color="gray" size="small" icon="close" > close</vs-button>
            </div>

            <div class="votes">
                <div class="root">
                    <div class="user">
                    <vs-avatar color="primary" :text="String(localvote.username)[0]" />
                    <div class="text">
                        <div class="name">{{ localvote.username }}</div>
                        <div class="date">1 months</div>
                    </div>
                    </div>
                    <div class="comment">
                        {{ this.localvote.comment }}
                    </div>
                </div>

                <vs-divider />

                <div class="replies">
                    <div class="reply" v-for="reply in localreplies" :key="reply.snapshot_id">
                        <div class="user">
                            <vs-avatar color="primary" :text="String(reply.username)[0]"/>
                            <div class="text">
                                <div class="name">{{reply.username}}</div>
                                <div class="date">1 months</div>
                            </div>
                        </div>
                        <div class="comment">
                            {{ reply.comment }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="reply_form content-inputs">
                <v-textarea v-on:keydown.enter.ctrl.exact="send()" v-model="comment" label="Reply" auto-grow rows=1 counter=200 color="#0A256A"></v-textarea>
                <div class="validation_error">{{ validation_result }}</div>
                <v-textarea v-on:keydown.enter.ctrl.exact="send()" v-model="user" label="(Optional) User Name" auto-grow rows=1 counter=12 color="#0A256A"></v-textarea>
                <vs-button color="primary" type="border" @click="send()">Reply</vs-button>
            </div>
        </div>
    </vs-sidebar>
</template>

<script>
import firebase from 'firebase/app';
import firebase_db from '@/plugins/firebase';

export default {
    data() {
        return {
            comment: null,
            user: null,
            validation_result: null,
        }
    },

    props: {
        reply: Boolean,
        handleClose: Function
    },

    methods: {
        send() {

            if (this.comment === null || this.comment === "") {

                this.validation_result = "Comment を入力してください"

            } else {

                function getRandomInt(min, max) {
                    return Math.floor(Math.random() * (max - min)) + min;
                }
                let color = `rgb(${getRandomInt(0,255)},${getRandomInt(0,255)},${getRandomInt(0,255)})`
                this.$vs.notify({
                    'title': "Sended",
                    'text': this.comment,
                    'color': color
                })

                // realtime databaseで降順にするためのunix時間 * -1の値を取得
                var now = new Date()
                var sortTime = now.getTime() * -1

                // let Ref = firebase_db.database().ref("votes/-MWzzbBdZeadrHYPZzCH/replies")
                let Ref = firebase_db.database().ref("events/"+ this.$store.state.current_meeting + "/votes/" + this.$store.state.current_reply + "/replies");

                Ref.push({
                    username: this.user,
                    comment: this.comment,
                    createAt: firebase.database.ServerValue.TIMESTAMP,
                    sortTime: sortTime
                }).then(response => {
                    this.comment = null
                    this.user = null
                })

                this.validation_result = null;
            }            
        }
    },

    computed: {
        localreplies: {
            get() {
                var idx_value = this.$store.state.current_reply;
                var check = this.$store.state.votes.filter((item, index) => { if(item.snapshot_id === idx_value) return true })[0]

                if (!check) {
                    return []
                } else {
                    return this.$store.state.votes.filter((item, index) => { if(item.snapshot_id === idx_value) return true })[0].replies
                }
            }
        },
        localvote: {
            get() {
                var idx_value = this.$store.state.current_reply;
                var check = this.$store.state.votes.filter((item, index) => { if(item.snapshot_id === idx_value) return true })[0]
                return check
            }
        },
        snapshot_id: {
            get() {
                return this.$store.state.showing_reply.snapshot_id
            }
        }
    },
}
</script>

<style lang="scss" scoped>

    .date {
        font-size: 0.7rem;
    }

    .sidenav {

        height: 100%;

        .votes {
            margin-top: 2rem;
            padding: 2rem 0;
            width: 40vw;
            height: 65vh;
            overflow: scroll;

            .comment {
                margin-top: 1rem;
                margin-left: 2rem;
                font-size: 0.9rem;
            }

            .replies {
                .reply {
                    margin: 2rem 1rem 1rem 0;
                }
            }
        }

        .close-button {
            margin: 1rem;
        }

        .reply_form {
            position: fixed;
            background-color: white;
            width: 20vw;
            margin: 0 1rem;
            bottom: 1rem;
        }

        .validation_error {
            color:red;
        }

    }
</style>

<style lang="scss">
    .vs-sidebar {
        width: 40vw;
        max-width: 500px;
        min-width: 240px;
    }
</style>