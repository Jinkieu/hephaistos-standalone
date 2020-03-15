<template>
  <v-container>
    <v-card>
      <v-toolbar flat color="#1e1e1e" dark>
        <v-toolbar-title>
          {{ session.name }}
          <v-btn text @click="signOut">Logout</v-btn>
        </v-toolbar-title>
      </v-toolbar>
      <v-row>
        <v-col cols="12" sm="2" md="2">
          <ExercisesList @exerciseSelected="onExerciseSelected"/>
        </v-col>
        <v-col cols="12" sm="2" md="10">
          <DoWork :exerciseId="exerciseIdSelected" />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import ExercisesList from './ExercisesList.vue'
import DoWork from './DoWork.vue'
import { mapGetters, mapState, mapActions } from 'vuex'
export default {

  name: 'exercises',
  watch: {
    exerciseIdSelected: async function () {
      this.$router.push({ name: 'exercises', params: { sessionId: this.sessionId, exerciseId: this.exerciseIdSelected } })
    }
  },

  components: {
    ExercisesList,
    DoWork
  },

  data () {
    return { exerciseIdSelected: parseInt(this.$route.params.exerciseId) }
  },

  computed: {
    sessionId () {
      return parseInt(this.$route.params.sessionId)
    },
    session () {
      return this.getSessionById(this.sessionId) || { name: 'Loading ... ' }
    },
    firstExerciseId () {
      return parseInt(this.$route.params.exerciseId)
    },
    firstExercise () {
      return this.getExerciseById({ id: this.firstExerciseId })
    },
    exercises () {
      return this.getExercisesBySessionId(this.sessionId)
    },
    ...mapState('sessions', ['sessions']),
    ...mapState('exercises', ['exercises']),
    ...mapGetters('sessions', ['getSessionsByModuleId']),
    ...mapGetters('exercises', ['getExercisesBySessionId']),
    ...mapGetters('exercises', ['getExerciseById']),
    ...mapGetters('sessions', ['getSessionById'])
  },
  async mounted () {
    await this.fetchSession({ id: this.sessionId })
    await Promise.all(
      this.sessions.map(s => this.fetchExercisesForSession({ sessionId: s.id }))
    )
    this.fetchExerciseForSession({ sessionId: this.sessionId, exerciseId: this.exerciseIdSelected })
  },

  methods: {
    ...mapActions('exercises', ['fetchExercisesForSession']),
    ...mapActions('exercises', ['fetchExerciseForSession']),
    ...mapActions('sessions', ['fetchSession']),
    onExerciseSelected (id) {
      this.exerciseIdSelected = id
    },
    signOut () {
      this.logout()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
