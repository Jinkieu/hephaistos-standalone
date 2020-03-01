<template>
  <v-container fluid>
    <h1 align="center" justify="center"> Exercises </h1>
    <v-row>
      <div v-for="exercise in listExercises" :key="exercise.id">
          <v-col cols="12">
            <v-card>
              <v-card-title>Title: {{ exercise.title }}</v-card-title>
              <v-card-subtitle> Langage: {{ exercise.lang }}</v-card-subtitle>
              <v-card-text>
                Instructions: {{ exercise.instructions }}<br>
                Unit Tests: {{ exercise.tests }}<br>
                Date: {{ exercise.creation_date }}<br>
              </v-card-text>
            </v-card>
          </v-col>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      listExercises: ['']
    }
  },

  mounted () {
    axios.get('http://localhost:3000/api/v1/exercises')
      .then((response) => {
        this.listExercises = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>
