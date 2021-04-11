<template>
    <div class="header">
        <nav class="menu">
            <span class="menu-item">
                <nuxt-link :to="`/vote/${$store.state.current_meeting}`"><vs-button color="primary" :type="val_current" @click="current(0)">投稿</vs-button></nuxt-link>
                <nuxt-link :to="`/questionnaire/${$store.state.current_meeting}`"><vs-button color="primary" :type="val_current" @click="current(2)">アンケート</vs-button></nuxt-link>
            </span>
        </nav>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentId: 0
        }
    },
    methods: {
        current(value) {
            // alert(value);
        }
    },
    computed: {
        val_current() {
            return "flat"
        }
    }
}
</script>

<style lang="scss" scoped>
    a {
        text-decoration: none;
        color: #333;
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(255, 255, 255);
        border-bottom: solid 1px rgb(163, 162, 162);
    }

    .menu {
        position: relative;
        text-align: right;
    }
</style>