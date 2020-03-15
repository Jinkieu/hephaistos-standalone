<template>
  <v-container>
  <v-card class="mx-auto" max-width="500" color="#1e1e1e" tile>
    <v-list shaped>
      <v-subheader>Session's exercises</v-subheader>
      <v-list-item-group color="primary">
        <v-list-item v-for="exercise in getExercisesBySessionId(sessionId)" :key="exercise.id">
          <v-list-item-content>
            <v-list-item-title @click="exerciseSelected(exercise.id)">{{ exercise.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
export default {

  name: 'exercises',

  data: () => ({
  }),

  computed: {
    sessionId () {
      return parseInt(this.$route.params.sessionId)
    },
    session () {
      return this.getSessionById(this.sessionId) || { name: 'Loading ... ' }
    },
    exercises () {
      return this.getExercisesBySessionId(this.sessionId)
    },
    ...mapState('sessions', ['sessions']),
    ...mapState('exercises', ['exercises']),
    ...mapGetters('sessions', ['getSessionsByModuleId']),
    ...mapGetters('exercises', ['getExercisesBySessionId']),
    ...mapGetters('sessions', ['getSessionById'])
  },
  async mounted () {
    await this.fetchSession({ id: this.sessionId })
    await Promise.all(
      this.sessions.map(s => this.fetchExercisesForSession({ sessionId: s.id }))
    )
  },

  methods: {
    ...mapActions('exercises', ['fetchExercisesForSession']),
    ...mapActions('sessions', ['fetchSession']),
    exerciseSelected (id) {
      this.$emit('exerciseSelected', id)
    },
    signOut () {
      this.logout()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
