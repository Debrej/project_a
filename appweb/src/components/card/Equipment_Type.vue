<template>
    <div class="card" v-on:click="redirect">
        <div class="flexline">
            <div class="column name">{{ name }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Equipment_Type_Card",
        props: [
            "name",
            "id"
        ],
        methods : {
            redirect () {
                this.$router.push("show/equipment_type/"+this.id);
            }
        }
    }
</script>

<style scoped>
    div.card{
        display: flex;
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
        font-size: 1.4em;
        align-items: flex-start;
    }
</style>