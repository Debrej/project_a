<template>
    <div class="content">
        <div class="column">
            <div class="title">Teams</div>
            <div class="scrollable">
                <TeamCard
                    v-for="team in teams"
                    :key="team.id"
                    :id="team.id"
                    :name="team.name"
                    :supervisor="users.find(u => u.id === team.supervisor_id)"
                >
                </TeamCard>
            </div>
        </div>
        <div class="column">
            <div class="title">Equipment Types</div>
            <div class="scrollable">
                <Equipment_Type_Card
                        v-for="equipment_type in equipment_types"
                        :key="equipment_type.id"
                        :id="equipment_type.id"
                        :name="equipment_type.name"
                >
                </Equipment_Type_Card>
            </div>
        </div>
        <div class="column"></div>
    </div>
</template>

<script>
    import TeamCard from "../card/Team";
    import Equipment_Type_Card from "../card/Equipment_Type";

    export default {
        name: "Admin",
        components: {
            Equipment_Type_Card,
            TeamCard

        },
        data () {
            return {
                teams: null,
                equipment_types: null,
                users: null
            }
        },
        mounted () {
            this.$axios.get(this.$host+'/team')
                .then(res => {
                    this.teams = res.data.team;
                });
            this.$axios.get(this.$host+'/equipment_type')
                .then(res => {
                    this.equipment_types = res.data.equipment_type;
                });
            this.$axios.get(this.$host+'/user')
                .then(res => {
                    this.users = res.data.users;
                });
        }
    }
</script>

<style scoped>
    div.content{
        height: 90%;
        width: 90%;
        display: flex;
        align-items: center;
    }

    div.column{
        display: flex;
        flex-direction: column;
        flex-basis: 100%;
        height: 100%;
    }

    div.title{
        font-size: 1.5em;
        width: 100%;
        margin-bottom: 2%;
    }

    div.scrollable{
        overflow: auto;
        width: 100%;
    }
</style>