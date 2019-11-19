<template>
    <div class="card" v-on:click="count">
        <div class="flexline">
            <div class="column">
                <div class="column name">{{ name }}</div>
                <div class="column activity">{{ event_name }}</div>
            </div>
            <div class="column"></div>
        </div>
        <div class="flexline description">
            {{ description }}
        </div>
        <div class="flexline">
            <div class="column">{{ start_date }}</div>
            <div class="column">{{ end_date }}</div>
            <div class="column supervisor">{{ supervisor }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ActivityCard",
        props: [
            "id",
            "name",
            "description",
            "start_date",
            "end_date",
            "event_name",
            "supervisor"
        ],
        methods: {
            count () {
                /* eslint-disable no-console */
                console.log("show/activity/"+this.id);
                /* eslint-enable no-console */
            }
        }
    }
</script>

<style scoped>
    div.card{
        display: flex;
        flex-direction: column;
        width: 90%;
        border: #d6d5b4 solid 1px;
        align-items: center;
        padding: 3%;
        margin-bottom: 2%;
        cursor: pointer;

        -webkit-transition-duration: 0.4s;
        transition-duration: 0.4s;
    }

    div.card:hover{
        background-color: #d0d0d0;
    }

    div.flexline{
        display: flex;
        align-items: center;
        width: 90%;
        flex-basis: 100%;
    }

    div.column{
        display: flex;
        flex-basis: 100%;
        height: 100%;
        align-items: center;
    }

    div.column.name{
        font-size: 1.2em;
    }

    div.column.activity{
        font-size: 0.8em;
    }

    div.description{
        width: 90%;
        padding: 2% 0 2% 0;
        max-height: 20vh;
    }

    div.column.supervisor{
        display: flex;
        justify-content: flex-end;
    }
</style>