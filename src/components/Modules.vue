<template>
  <v-container>
    <v-card>
      <v-toolbar flat color="#1e1e1e" dark>
        <v-toolbar-title>
          List of Modules
          <v-btn text @click="signOut">Logout</v-btn>
        </v-toolbar-title>
      </v-toolbar>
         <v-col v-for="module in this.modules" :key="module.id">
                <h2><router-link :to="{ name: 'module', params: { moduleId: module.id } }">{{ module.name }}</router-link></h2>
            <Sessions :moduleId="module.id"/>
        </v-col>
    </v-card>
  </v-container>
</template>

<style>
div{
  padding:5px }
</style>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import Sessions from './Sessions.vue'

export default {

  name: 'modules',
  components: {
    Sessions
  },
  data: () => ({
  }),

  computed: {
    ...mapState('modules', ['modules']),
    ...mapState('sessions', ['sessions']),
    ...mapGetters('user', ['isAuthenticated'])
  },
  async mounted () {
    await this.fetchModules()
  },
  methods: {
    ...mapActions('user', ['logout']),
    ...mapActions('modules', ['fetchModules']),
    signOut () {
      this.logout()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
