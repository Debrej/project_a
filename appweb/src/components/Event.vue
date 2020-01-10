<template>
    <v-form 
     ref="form" 
     v-model="valid"
     :lazy-validation="true">
        <v-row
          align="center"
          justify="center"
        >
            <v-col cols="8">
                <v-text-field 
                 v-model="event.name" 
                 :counter="255"
                 :rules="eventNameRules" 
                 label="Event Name"
                 prepend-icon="mdi-cursor-text"
                 required
                >
                </v-text-field>

                <v-menu
                 v-model="menu"
                 :close-on-content-click="false"
                 :nudge-right="40"
                 transition="scale-transition"
                 offset-y
                 min-width="290px"
                >
                        <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="dates"
                            label="Period"
                            :rules="eventDateRules"
                            readonly
                            required
                            v-on="on"
                            prepend-icon="mdi-calendar-month-outline"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                        v-model="dates"
                        range
                        :min="new Date().toISOString()"
                        >
                        </v-date-picker>
                </v-menu>
                <v-file-input
                 :rules="logoRules"
                 accept="image/png, image/jpeg, image/bmp"
                 placeholder="Logo"
                 prepend-icon="mdi-camera-outline"
                 label="Optional"
                ></v-file-input>
                <v-textarea 
                v-model="event.description"
                prepend-icon="mdi-script-outline"
                placeholder="Description">
                <template v-slot:label>
                        <div>
                        Optional
                        </div>
                    </template>
                </v-textarea>
            </v-col>
        </v-row>
        <v-row
         align="center"
         justify="center"
        >
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Validate
        </v-btn>

        <v-btn
          color="error"
          class="mr-4"
          @click="reset"
        >
          Reset Form
        </v-btn>

        </v-row>
    </v-form>
    
</template>

<script>
export default {
  name: "Event",
  data: () => ({
      valid: true,
      menu: false,
      dates:[],
      event : {
          name: '',
        //   dates : [],
          start_date:'',
          end_date: '',
          description : '',
          logo_url:''
      },
      eventNameRules : [
        value => !!value || 'Event name is required.',
        value => (value && value.length <= 255) || 'Event name must be less than 255 characters'
      ],
      eventDateRules : [
        value => !!value || 'Period must not be null'
      ],
      logoRules : [
        value => !value || value.size < 2000000 || 'Logo size should be less than 2 MB!',
      ]
  }),
  methods :{
      validate () {
        if (this.$refs.form.validate()){
            this.event.start_date = this.dates[0]
            if(this.dates.length > 1) {
                this.event.end_date = this.dates[1]
            }
            else {
                //the event only last one day
                this.event.end_date = this.event.start_date
            }
            this.$axios.post(this.$host + "event", this.event).then(res => {
                //eslint-disable-next-line
                console.log(res.data);
            });
        }
      },
      reset () {
        this.$refs.form.reset()
      }
  }
};
</script>

<style scoped></style>
