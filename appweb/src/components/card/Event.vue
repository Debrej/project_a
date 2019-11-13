<template>
    <div class="card">
        <div class="flexline">
            <div class="name">{{ name }}</div>
            <div class="date">{{ start_date }}</div>
            <div class="date">{{ end_date }}</div>
        </div>
        <div class="description">{{ description }}</div>
    </div>
</template>

<script>
    export default {
        name: "EventCard",
        props : [
            'name',
            'start_date',
            'end_date',
            'description'
        ]
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
    }

    div.flexline{
        display: flex;
        align-items: center;
        width: 90%;
        border-bottom: #d6d5b4 solid 1px;
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

    div.date{
        flex-basis: 100%;
    }
</style>