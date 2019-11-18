<template>
    <div class="card" v-on:click="count">
        <div class="flexline">
            <div class="column"><div class="name">{{ name }}</div></div>
            <div class="column date">{{ start_date }}</div>
            <div class="column date">{{ end_date }}</div>
        </div>
        <div class="description">{{ description }}</div>
    </div>
</template>

<script>
    export default {
        name: "EventCard",
        props : [
            'id',
            'name',
            'start_date',
            'end_date',
            'description'
        ],
        methods: {
            count () {
                /* eslint-disable no-console */
                console.log("show/event/"+this.id);
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
        background-color: #f6f9e7;
    }

    div.flexline{
        display: flex;
        align-items: center;
        width: 90%;
        flex-basis: 100%;
    }

    div.column{
        flex-basis: 100%;
        height: 100%;
        align-items: center;
    }

    div.column.date{
        display: flex;
        justify-content: end;
    }

    div.description{
        width: 90%;
        padding: 2% 0 2% 0;
        max-height: 20vh;
    }

    div.name{
        flex-basis: 100%;
        font-size: 1.2em;
    }
</style>