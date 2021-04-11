<template>
    <div class="sandbox">
        <vs-button @click="createDB()">createDB</vs-button>
        <vs-button @click="check()">Dexie</vs-button>
        <vs-button @click="add()">Add</vs-button>
    </div>
</template>
<script>
import firebase from 'firebase/app';
import firebase_db from '@/plugins/firebase';
import Dexie from 'dexie';
export default {
    data() {
        return {
            db: new Dexie('feedstock')
        }
    },
    methods: {
        check() {
            let Ref = firebase_db.database().ref("users").child(this.$store.state.userID + 'afd').once('value', snapshot => {
                var data = snapshot.toJSON();
                console.log(data);

                if (data === null) {
                    
                }
                console.log(snapshot.key);
            });


        },
        createDB() {

            this.db.version(2).stores({
                settings: 'userID'
            });

            this.db.settings.put({'userID': 'someware'});
        },
        async dexie_check() {
            this.db.version(2).stores({
                settings: 'userID'
            });

            console.log(this.db)
            console.log(this.db.settings);
            var a  = await this.db.settings.toArray();
            console.log(a[0]['userID']);
            
        },
        add() {
            db.settings.put({'userID': 'someware'});
        }
    }
}
</script>