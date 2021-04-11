<template>
    <div class="question">
        <!-- <vs-button @click="check()">check</vs-button> -->
        <vs-card class="q-card">
            <div class="form">
                <div class="question-text">{{ question.question }}</div>
                <vs-divider />
                <div v-if="!result" class="selector">
                    <ul class="q-item">
                        <li v-for="(select, key) in question.select" :key="select.Dep">
                            <vs-radio color="danger" v-model="q_selection" :vs-value="key" >{{select.text}}</vs-radio>
                        </li>
                    </ul>
                </div>
                <div v-if="result" class="result">
                    <Chart :chart_data="active_chart_data" />
                </div>
                <vs-divider />
                <div v-if="!result" class="actions">
                    <vs-button color="primary" type="border" @click="vote()">Vote</vs-button>
                </div>
            </div>
        </vs-card>
    </div>      
</template>
<script>
import Chart from '@/components/questionnaire/Chart.vue';
import firebase_db from '@/plugins/firebase';
export default {
    props: {
        question: Object,
    },
    components: {
        Chart
    },
    data() {
        return {
            result: false,
            q_selection: null,
            chart_data: {
               keys: [],
                text: [],
                votes_count: []            
            }
        }
    },
    async mounted(){
        for (const [key, value] of Object.entries(this.question.select)) {
            this.chart_data.keys.push(key);
            this.chart_data.text.push(value.text);
            if (value.vote === null || value.vote === undefined){
                this.chart_data.votes_count.push(0);
            } else {
                this.chart_data.votes_count.push(Object.keys(value.vote).length);
                this.validation_voted(Object.keys(value.vote));
            }
        }
    },

    methods: {
        vote() {
            function getRandomInt(min, max) {
                    return Math.floor(Math.random() * (max - min)) + min;
            }

            var userID = this.$store.state.userID;
            var select_id = String(this.q_selection);

            let Ref = firebase_db.database().ref(
                "events/" + this.$store.state.current_meeting + "/questions/" + this.question.snapshot_id + "/select/" + select_id + "/vote"
            );

            Ref.update({
                [userID]: 1
            })
            .then(response => {
                let color = `rgb(${getRandomInt(0,255)},${getRandomInt(0,255)},${getRandomInt(0,255)})`
                this.$vs.notify({
                    'title': this.q_selection,
                    'color': color
                })
                
                this.result = true
            })



        },
        async check() {
            console.log(this.q_selection);

        },
        validation_voted(vote_array) {
            // 既に投稿済みかどうか判断

            let userID = this.$store.state.userID;
            if(vote_array.includes(userID)) {
                this.result = true;
            }
            
        }
    },
    computed: {
        active_chart_data: {
            get() {
                var active_chart_data = {
                    keys: [],
                    text: [],
                    votes_count: []            
                };
                for (const [key, value] of Object.entries(this.question.select)) {
                    active_chart_data.keys.push(key);
                    active_chart_data.text.push(value.text);
                    if (value.vote === null || value.vote === undefined){
                        active_chart_data.votes_count.push(0);
                    } else {
                        active_chart_data.votes_count.push(Object.keys(value.vote).length);
                        this.validation_voted(Object.keys(value.vote));
                    }
                }
                
                return active_chart_data;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    ul {
        list-style: none;
        padding-left: 0;
    }

    .question-text {
        padding-left: 1rem;
        font-size: 1.4rem;
    }

    .q-item {
        li {
            margin-bottom: 1rem;
            font-size: 1.1rem;
        }
    }

    .result {
        display: flex;
        justify-content: center;
        // max-height: 300px;
    }
</style>
