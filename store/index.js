export const state = () => ({
    votes:[],
    showing_reply:[],
    current_reply: null,
    current_meeting: null
})

export const mutations = {
    setEnpty(state) {
        state.votes = []
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
    }
}

export const getters = {

}

export const actions = {
}