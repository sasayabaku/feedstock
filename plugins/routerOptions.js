/*
    ページ遷移の度に動作する処理を実装
    * VuexにUserIDが入ってるか確認。
    * なければ、LocalSttorageを参照
    * これもなければ、新規発行処理
*/
import firebase from 'firebase/app';
import firebase_db from '@/plugins/firebase';
import { state } from "../store";

function publication_userID() {
    // 乱数生成
    var S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var N=32;
    var gen_id = Array.from(Array(N)).map(()=>S[Math.floor(Math.random()*S.length)]).join('');
    console.log(gen_id);

    // Firestore確認
    let Ref = firebase_db.database().ref("users");

    if (state.userID === null || state.userID === undefined) {
        Ref.update({
            [gen_id]: firebase.database.ServerValue.TIMESTAMP
        })

    } else {
        Ref.child(state.userID).once('value', snapshot => {
            var data = snapshot.toJSON();
            if (data === null) {
                Ref.update({
                    [gen_id]: firebase.database.ServerValue.TIMESTAMP
                })
            }
        })
    }
    // Local Storage 保存
    localStorage.setItem('userID', gen_id);
}

function check_vuex(userID, store) {
    if (userID === undefined || userID === null) {
        var ls_value = localStorage.getItem('userID');
        console.log(ls_value);

        if (ls_value === null) {
            publication_userID()
        }
        store.commit('setUserID', ls_value);
    } else {
        console.log(userID);
    }
}

export default async ({ app, store }) => {
    app.router.afterEach((to, from) => {
        check_vuex(store.state.userID, store);
    });
}


