/* eslint-disable camelcase */
/* eslint-disable camelcase */
<template>
  <v-container fluid>
    <h1 align="center" justify="center"> Creating Exercise </h1>
    <div align="center">
      <v-col cols="12" sm="6" md="3">
        <v-text-field
          v-model="title"
          label="Title"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-text-field
          v-model="lang"
          label="Langage"
        ></v-text-field>
      </v-col>
    </div>
    <div align="center">
      <v-col cols="12" sm="6" md="3">
        <v-textarea
          v-model="instructions"
          solo
          name="exercise"
          label="Description about the exercise"
        ></v-textarea>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-textarea
          v-model="tests"
          solo
          name="test"
          label="Enter some Unit Test"
        ></v-textarea>
      </v-col>
      <v-btn block color="secondary" dark @click="sendEx">Send Exercise</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    instructions: '',
    lang: '',
    title: '',
    tests: '',
    solution: 'regrgk',
    template_regions: ['test'],
    template_regions_rw: [0],
    difficulty: 0,
    score: 0,
    creation_date: new Date()
  }),

  methods: {
    async sendEx () {
      const {
        instructions,
        lang,
        title,
        tests,
        solution,
        // eslint-disable-next-line camelcase
        template_regions,
        // eslint-disable-next-line camelcase
        template_regions_rw,
        difficulty,
        score,
        // eslint-disable-next-line camelcase
        creation_date
      } = this
      try {
        await this.axios.post('http://localhost:3000/api/v1/exercise', {
          instructions,
          lang,
          title,
          tests,
          solution,
          template_regions,
          template_regions_rw,
          difficulty,
          score,
          creation_date
        })
        console.log(creation_date)
      } catch (err) {
        this.errorLogin = err
      }
    }
  }
}
</script>
