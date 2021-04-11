<template>
    <div class="admin">
        <div class="vote_list">
            <vs-card >
                <vs-list>
                    <vs-list-header class="bg_font" title="Questions" color="danger"/>
                        <vs-list-item class="bg_font" :title="question.question" v-for="question in localquestions" :key="question.Dep">
                            <button @click="check('Show')">
                                <vs-chip color="danger"><b>Show</b></vs-chip>
                            </button>
                            <button @click="check('Edit')">
                                <vs-chip color="warning"><b>Edit</b></vs-chip>
                            </button>
                        </vs-list-item>


                        <button class="add_font" @click="popupAction=true">
                            <vs-list-item icon="control_point" class="add_font" title="Add Question">
                            </vs-list-item>
                        </button>
                </vs-list>

            </vs-card>
        </div>
        <div class="showing">
            <vs-card class="card">
                <div class="viewer">
                    <div>Graph View</div>
                </div>
                <vs-divider />
            </vs-card>
        </div>


        <vs-popup :active.sync="popupAction" title="New Question">
            <vs-input class="new_question" placeholder="Question" v-model="q_title" />

            <div class="selections">
                <div class="selec_item" v-for="(sel, index) in select" :key="index">
                    <vs-input class="new_select_item" placeholder="item" v-model="select[index]" />
                </div>
            </div>
            <vs-divider />
            <div class="new_actions">
                <button @click="addItem()">
                    <vs-chip color="primary"><b>Add</b></vs-chip>
                </button>
                <button @click="removeItem()">
                    <vs-chip color="danger"><b>Remove</b></vs-chip>
                </button>
                <button @click="submit_question()">
                    <vs-chip color="success"><b>Submit</b></vs-chip>
                </button>
            </div>
        </vs-popup>
    </div>
</template>

<script>
import firebase_db from '@/plugins/firebase';

export default {
    data () {
        return {
            popupAction: false,
            select: [''],
            q_title: null
        }
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
        check(str) {
            this.$vs.notify({
                'title': str,
                'color': "danger"
            })
        },

        fetchQuestions() {
            firebase_db.database().ref("events/" + this.$store.state.current_meeting + "/questions").on('child_added', snapshot => {
                var data = snapshot.toJSON();
                data['snapshot_id'] = snapshot.key;
                this.$store.commit('setQuestions', data);
            })
        },

        addItem() {
            this.select.push('');
        },
        removeItem() {
            this.select.pop();
        },
        submit_question() {

            // 空判定

            let Ref = firebase_db.database().ref("events/" + this.$store.state.current_meeting + "/questions/")

            // selection item の配列を連想配列に変換
            var select_array = {}
            this.select.forEach((value, index) => {
                select_array[index + 1] = {'text': value }
            });

            Ref.push({
                'question': this.q_title,
                'select': select_array
            })
            .then(response => {
                this.q_title = null;
                this.select = [''];
            })

        
        }
    },
    computed: {
        localquestions :{
            get() {
                return  this.$store.state.questions;
            }
        }
    }
}
</script>


<style lang="scss" scoped>
    .admin {
        display: flex;
        justify-content: center;
        width: 100%;
        min-height: 100%;

        div {
            width: 100%;
        }

        .showing {
            position: relative;
            height:100%;
        }

        .card {
            height: 100%;
        }
    }

    .bg_font {
        font-size: 1.1rem;
    }

    .add_font {
        font-size: 1.2rem;
        color: #ff4757;
        width: 100%;
    }

    .hover_wrap {
        &:hover {
            background-color: #00000005;
        }

        div {
            height: 100%;
        }
    }

    .vs-input.new_question {
        float: left;
        width: 80%;
        margin: 10px;
        margin-top: 5px;
    }

    .vs-input.new_select_item {
        float: left;
        width: 60%;
        margin: 10px;
        margin-top: 5px;        
    }
</style>