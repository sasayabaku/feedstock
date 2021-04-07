export const state = () => ({
    votes:[],
    showing_reply:[],
    questions: [],
    current_reply: null,
    current_meeting: null,
})

export const mutations = {
    setEnpty(state) {
        state.votes = [];
        state.questions = [];
    },
    setVotes(state, votes) {
        state.votes = votes;
    },
    addVotes(state, votes) {
        state.votes.unshift(votes);
    },
    setShowingReply(state, reply) {

        if (reply.length !== 1) {
            console.error("vote Index Duplicated");
        }

        state.showing_reply = reply[0];
    },
    setReplyVotes(state, args) {
        state.votes.splice(args.idx, 1, args.data);
    },
    setCurrentReplyId(state, reply_id) {
        state.current_reply = reply_id;
    },
    setCurrentMeeting(state, meeting_id) {
        state.current_meeting = meeting_id;
    },
    setQuestions(state, questions) {
        state.questions.unshift(questions);
    },
    setUserID(state, userID) {
        state.userID = userID;
    }
}

export const getters = {

}

export const actions = {
}