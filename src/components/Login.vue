<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            :counter="10"
            label="Email"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            :counter="10"
            label="Password"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="8"
        >
          <v-btn block color="secondary" dark @click="signIn">Login</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  data: () => ({
    valid: '',
    email: '',
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => v.length >= 8 || 'Password must be at least 8 characters'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ]
  }),
  computed: {
    ...mapState({ }),
    ...mapGetters('user', ['isAuthenticated'])
  },

  methods: {
    ...mapActions('user', ['login']),
    async signIn () {
      try {
        await this.login({ email: this.email, password: this.password })
        this.$router.push({ name: 'modules' })
      } catch (err) {
        console.log('Ca marche pas')
      }
    }
  }

}

</script>
