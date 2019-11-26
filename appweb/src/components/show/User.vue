<template>
    <div class="content">
        <div class="title">Users</div>
        <div class="scrollable">
            <UserCard
                    v-for="user in users"
                    :key="user.id"
                    :id="user.id"
                    :first_name="user.first_name"
                    :last_name="user.last_name.toUpperCase()"
                    :surname="user.surname"
                    :email="user.email"
                    :phone_number="user.phone_number"
                    :age="$moment(user.birthday).fromNow().split(' ')[0]"
                    :specialty="specialties.find(s => s.id === user.specialty_id).year + specialties.find(s => s.id === user.specialty_id).name"
                    :balance="user.balance"
                    :is_in_debt="user.balance < 0"
                    :profile_pic_url="user.profile_pic_url != null ? user.profile_pic_url : 'default_profile_pic.png'"
            ></UserCard>
        </div>
    </div>
</template>

<script>
    import UserCard from '../card/User';

    export default {
        name: "Task",
        components: {
            UserCard
        },
        data () {
            return {
                specialties: null,
                users: null
            }
        },
        mounted () {
            this.$axios.get(this.$host+"/specialty")
                .then(res => {
                    this.specialties = res.data.specialty;
                });
            this.$axios.get(this.$host+"/user")
                .then(res => {
                    this.users = res.data.users;
                });
        }
    }
</script>

<style scoped>
    div.content{
        height: 90%;
        width: 60%;
        display: flex;
        flex-direction: column;
        align-items: center;
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