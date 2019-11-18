<template>
    <div class="form">
        <div class="form_title">Event</div>
        <div class="name">
            <div class="label">Name</div>
            <input type="text" name="name" placeholder="The name of this beautiful (I hope) event" v-model="name"/>
        </div>
        <div class="dates">
            <div class="date">
                <div class="label">Starting date</div>
                <vue-ctk-date-time-picker v-model="start_date" label="" locale="fr" :minute-interval="60"></vue-ctk-date-time-picker>
            </div>
            <div class="date">
                <div class="label">Ending date</div>
                <vue-ctk-date-time-picker v-model="end_date" label="" locale="fr" :minute-interval="60" :min-date="start_date"></vue-ctk-date-time-picker>
            </div>
        </div>
        <div class="description">
            <div class="label">Description</div>
            <textarea name="description" class="description" placeholder="The best description of all times" v-model="description">
        </textarea>
        </div>
        <div class="submit">
            <div class="button" style="width: 20%;" v-on:click="submit">
                Submit
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Event",
        data () {
            return {
                start_date: null,
                end_date: null,
                name: null,
                description: null
            }
        },
        methods: {
            submit: function () {
                this.$axios.post(this.$host+'/event',{
                        "name": this.name,
                        "description": this.description,
                        "start_date": this.start_date,
                        "end_date": this.end_date
                    })
                    .then(() => {
                        window.location.href = "/show/events"
                    })
                    .catch(() => {
                        window.location.href = "/error"
                    });
            }
        }
    }
</script>

<style scoped>
    div.form{
        height: 90%;
        width: 60%;
        display: flex;
        flex-direction: column;
    }

    div.form_title{
        font-size: 1.5em;
    }

    div.name{
        width: 50%;
        flex-grow: 1;
    }

    div.dates{
        display: flex;
        flex-grow: 1;
    }

    div.date{
        flex-basis: 100%;
        padding-right: 2%;
    }

    div.description{
        flex-grow: 3;
    }

    div.label{
        font-size: 1.2em;
    }

    div.submit{
        display: flex;
        justify-content: flex-end;
    }

    div.submit > div.button{
        flex-grow: unset;
        flex-basis: unset;

        display: flex;
        justify-content: center;

        cursor: pointer;

        border-radius: 2%;
        padding: 1%;
    }

    div.submit > div.button:hover{
        flex-grow: unset;
        flex-basis: unset;

        background-color: #d6d5ae;
    }

    input.description{
        height: 80%;
        margin: 0;
    }

    input[type=text], input[type=password]{
        border: none;
        border-bottom: 1px solid #99987b;
        background: none;
        padding: 3% 2%;
        margin-bottom: 5%;
        width: 100%;
        font-size: 1.2em;
    }

    textarea.description{
        border: none;
        border-bottom: 1px solid #99987b;
        background: none;
        margin-top: 2%;
        width: 100%;
        height: 80%;
        font-size: 1.2em;
        resize: none;
    }
</style>