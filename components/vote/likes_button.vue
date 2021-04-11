<template>
    <div id="likes_button">
        <button v-if="likes_check(vote) === 0" class="favorite_button" @click="do_likes(vote.snapshot_id)">
            <vs-chip icon="favorite"><vs-icon icon="favorite_border" size="small" color="#ff4757"/><b>{{Object.keys(vote.likes).length}}</b></vs-chip>
        </button>
        <button v-else-if="likes_check(vote) === 1" class="already_favorite_button" @click="remove_likes(vote.snapshot_id)">
            <vs-chip icon="favorite"><vs-icon icon="favorite" size="small" color="#ff4757"/><b>{{Object.keys(vote.likes).length}}</b></vs-chip>
        </button>
        <button v-else class="favorite_button" @click="do_likes(vote.snapshot_id)">
            <vs-chip icon="favorite"><vs-icon icon="favorite_border" size="small" color="#ff4757"/><b>0</b></vs-chip>
        </button>
    </div>
</template>

<script>
import firebase_db from '@/plugins/firebase';
export default {
    props:{
        vote: Object
    },
    methods: {

        likes_check(vote) {
            var userID = this.$store.state.userID;
            if (vote.likes) {
                if (Object.keys(vote.likes).includes(userID)) {
                    return 1
                } else {
                    return 0
                }
            } else {
                return false
            }
        },

        do_likes(snapshot_id) {
            var userID = this.$store.state.userID;

            let Ref = firebase_db.database().ref(
                "events/" + this.$store.state.current_meeting + '/votes/' + snapshot_id + "/likes"
            );

            Ref.update({
                [userID]: 1
            })
        },
        remove_likes(snapshot_id) {
            var userID = this.$store.state.userID;

            let Ref = firebase_db.database().ref(
                "events/" + this.$store.state.current_meeting + '/votes/' + snapshot_id + "/likes"
            );

            Ref.update({
                [userID]: null
            })
        }    
    }
}
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">

</style>