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
                <div class="reply">
                    <vs-divider />
                    <button v-if="reply_check(vote)" class="reply_tag" @click="handleOpen(vote.snapshot_id)">
                         {{ Object.keys(vote.replies).length }} Reply <vs-icon class="icons" icon="keyboard_return" />
                    </button>
                    <button v-else class="empty_reply_tag" @click="handleOpen(vote.snapshot_id)">
                        0 Reply <vs-icon class="icons" icon="keyboard_return" />
                    </button>
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

import replyForm from  '@/components/vote/reply/reply.vue';
export default {
    components: {
        replyForm
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

        async check() {

            // (Args) Index value
            console.log(Object.keys(this.localvotes[7].replies).length)

        },

        handleOpen(idx_value) {
            this.reply = true;
            this.$store.commit('setCurrentReplyId', idx_value);
        },

        handleClose() {
            this.reply = false
        }
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

<style lang="scss">

    $card_padding: 1rem;

    #vote_showing {
        width: 100%;
        max-width: 800px;

        .cards {
            padding: 0 3rem;

            @media screen and (min-width: 701px) {
                padding: 0;
            }


            .vote {
                padding: 0.5rem 0;
                min-width: 30rem;

                .reply {
                    .reply_tag {
                        padding: 0 $card_padding;
                        display: flex;
                        align-items: center;
                        color: blue;

                        &:hover {
                            color:rgb(0, 0, 110);
                        }

                        .icons {
                            padding-left: 0.5rem;
                        }
                    }

                    .empty_reply_tag {
                        padding: 0 $card_padding;
                        display: flex;
                        align-items: center;
                        color: rgb(59, 59, 59);

                        &:hover {
                            color:rgb(110, 110, 110);
                        }

                        .icons {
                            padding-left: 0.5rem;
                        }                    
                    }
                }
            }
        }
    }

    .prop-container {
        width: 100%;
        display: flex;

        .action {
            margin-left: auto;

            .like-button {
                margin-right: 2rem;
                height: 2rem;
                font-size: 1rem;
            }
        }
    }

    .user {
        display: flex;
        align-items: center;
        padding: 0 $card_padding;

        .text {
            padding: 0 $card_padding;

            .name {
                font-size: 1.1rem;
                font-weight: 500;
            }

            .date {
                color: #949393;
            }
        }
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