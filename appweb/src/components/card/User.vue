<template>
    <div class="card">
        <div class="flexline">
            <div class="column name">{{ first_name }} "{{ surname }}" {{ last_name }}</div>
            <div class="column end">
                <div class="column end">{{ age }} y.o.</div>
                <div class="column end">{{ specialty }}</div>
            </div>
        </div>
        <div class="flexline">
            <div class="column">@ : {{ email }}</div>
            <div class="column">phone : {{ phone_number }}</div>
            <div class="column balance end" v-bind:class="{debt: is_in_debt}">{{ balance }} €</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserCard",
        props: [
            "id",
            "first_name",
            "last_name",
            "surname",
            "age",
            "email",
            "phone_number",
            "balance",
            "specialty",
            "is_in_debt"
        ],
        methods: {
            count () {
                /* eslint-disable no-console */
                console.log("show/user/"+this.id);
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

    div.column.balance{
        font-style: italic;
    }

    div.debt{
        color: red;
    }

    div.column.name{
        font-size: 1.4em;
    }

    div.column.end{
        display: flex;
        justify-content: flex-end;
    }
</style>