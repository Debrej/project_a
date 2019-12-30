<template>
    <div class="content">
        <div class="line top">
            <div class="column logo">
                <img :src="`${publicPath}`+'images/'+event.logo_url" :alt="`${publicPath}`+'images/'+event.logo_url"/>
            </div>
            <div class="column">
                <div class="line name">{{ event.name }}</div>
                <div class="line date">
                    Dates : {{ $moment.utc(event.start_date).local().format('DD-MM-YYYY HH:mm') }} - {{ $moment.utc(event.end_date).local().format('DD-MM-YYYY HH:mm') }}
                </div>
            </div>
        </div>
        <div class="line description">
            {{ event.description }}
        </div>
        <div class="line controls">
            <div class="button" style="width: 20%;" v-on:click="backEvent">
                Back
            </div>
            <div class="button" style="width: 20%;" v-on:click="editEvent">
                Edit
            </div>
            <div class="button delete" style="width: 20%;" v-on:click="deleteEvent">
                Delete
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EventDetail",
        data () {
            return {
                publicPath: process.env.BASE_URL,
                event: null,
                logo_url: null,
                id: null
            }
        },
        mounted () {
            this.id = this.$route.params.id;
            this.$axios.get(this.$host+"/event/id/"+this.id)
                .then(res => {
                    this.event = res.data.event;
                });
        },
        methods : {
            backEvent () {
                this.$router.push('/show/events');
            },
            editEvent () {
                this.$router.push('/edit/event/'+this.id);
            },
            deleteEvent () {

            }
        }
    }
</script>

<style scoped>
    div.content{
        display: flex;
        flex-direction: column;
        width: 70%;
        height: 90%;
    }

    div.line{
        display: flex;
        align-items: center;
        width: 90%;
        flex-basis: 100%;
    }

    div.line.description{
        flex-grow: 6;
        flex-basis: unset;
    }

    div.line.top{
        flex-basis: unset;
        border-bottom: solid darkgray 1px;
        padding: 2% 0 2% 0;
    }

    div.line.controls{
        flex-basis: unset;
        border-top: solid darkgray 1px;
        justify-content: space-between;
        padding-top: 1%;
    }

    div.column{
        display: flex;
        flex-basis: 100%;
        height: 100%;
        align-items: center;
        flex-direction: column;
    }

    div.column.logo{
        flex-basis: unset;
        min-width: 10%;
        max-width: 20%;
        max-height: 15vh;
    }

    div.description{
        padding: 2% 5%;
        justify-content: flex-start;
        align-items: flex-start;
    }

    div.date{
        font-style: italic;
    }

    div.name{
        font-size: 2em;
    }

    img{
        height: auto;
        max-width: 80%;
    }

    div.button{
        flex-grow: unset;
        flex-basis: unset;

        display: flex;
        justify-content: center;

        cursor: pointer;

        padding: 1%;

        -webkit-transition-duration: 0.4s;
        transition-duration: 0.4s;
    }

    div.button:hover{
        flex-grow: unset;
        flex-basis: unset;

        background-color: #d6d5ae;
    }

    div.button.delete:hover{
        flex-grow: unset;
        flex-basis: unset;

        background-color: #8a0200;
    }

</style>