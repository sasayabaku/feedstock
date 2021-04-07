<template>
    <div id="vote_showing">

        <div class="cards">

            <vs-card class="vote" v-for="vote in localvotes" :key="vote.Dep">
                <div class="user">
                    <vs-avatar color="primary" :text="String(vote.username)[0]"/>
                    <div class="text">
                        <div class="name">{{ vote.username }}</div>
                        <div class="date">1 months</div>
                    </div>
                </div>
                <div class="comment">
                    {{vote.comment}}
                </div>
                <vs-divider />
                <div class="reply">
                    <button v-if="reply_check(vote)" class="reply_tag" @click="handleOpen(vote.snapshot_id)">
                         {{ Object.keys(vote.replies).length }} Reply <vs-icon class="icons" icon="keyboard_return" />
                    </button>
                    <button v-else class="reply_tag empty_reply_tag" @click="handleOpen(vote.snapshot_id)">
                        0 Reply <vs-icon class="icons" icon="keyboard_return" />
                    </button>
                    

                    <div class="lik_button">
                        <LikesButton :vote="vote" />
                    </div>
                </div>
            </vs-card>
        </div>

        <div class="sidenav">
            <replyForm :reply="reply" :handleClose="handleClose"/>
        </div>
        
    </div>
</template>

<script>
import firebase_db from '@/plugins/firebase';

import LikesButton from '@/components/vote/likes_button.vue';
import replyForm from  '@/components/vote/reply/reply.vue';
export default {
    components: {
        replyForm,
        LikesButton
    },
    data () {
        return {
            reply: false
        }
    },
    async created() {
        // 初期化処理
        this.$store.commit('setEnpty');
        await this.fetchVotes();
    },

    methods: {
        fetchVotes() {
            firebase_db.database().ref("events/" + this.$store.state.current_meeting + "/votes").on('child_added', snapshot => {
                var data = snapshot.toJSON();
                data['snapshot_id'] = snapshot.key;
                this.$store.commit('addVotes', data);
            })

            firebase_db.database().ref("events/" + this.$store.state.current_meeting + "/votes").on('child_changed', snapshot => {
                var data = snapshot.toJSON();
                data['snapshot_id'] = snapshot.key;
                console.log('child changed!!');

                var current_reply_idx = this.$store.state.votes.findIndex(
                    element => element.snapshot_id === snapshot.key
                );

                var args_obj = {'idx': current_reply_idx, 'data': data}
                this.$store.commit('setReplyVotes', args_obj);
                
            })
        },

        reply_check(vote) {    
            if (vote.replies) {
                return true
            } else {
                return false
            }
        },


        async check(vote) {
            console.log(vote);
        }, 

        handleOpen(idx_value) {
            this.reply = true;
            this.$store.commit('setCurrentReplyId', idx_value);
        },

        handleClose() {
            this.reply = false
        },

    },

    computed: {
        localvotes: {
            get() {
                return this.$store.state.votes
            }
        }
    }
}
</script>

<style lang="scss" scoped>

    #vote_showing {
        width: 100%;
        max-width: 800px;
    }

    .cards {
        padding: 0 3rem;
        @media screen and (min-width: 701px) { padding: 0; }

        .vote {
            padding: 0.3rem 0 0 0;
            min-width: 30rem;

            .vs-divider {
                margin-bottom: 1rem;
            }
        }
    }

    .reply {
        display: flex;
        align-items: center;

        .reply_tag {
            padding: 0 1rem;
            display: flex;
            align-items: center;
            color: blue;

            &:hover {
                color: #00006e;
            }

            .icons {
                padding-left: 0.5rem;
            }
        }

        .empty_reply_tag {
            color: #3b3b3b;

            &:hover {
                color:#6e6e6e;
            }
        }
    }

    .user {
        display: flex;
        align-items: center;
        padding: 0 1rem;

        .text {
            padding: 0 1rem;

            .name {
                font-size: 1.1rem;
                font-weight: 500;
            }

            .date {
                color: #949393;
            }
        }
    }    

    .lik_button {
        margin-left: 2rem;
        font-size: 1.1rem;
    }

    .comment {
        margin-top: 1rem;
        padding: 0 2rem;
        font-size: 1rem;
    }

    .sidenav {
        position: fixed;
    }
</style>

<style lang="scss">

    .vs-avatar--text {
        font-size: 1.1rem;
        font-weight: 600;
    }    


</style>