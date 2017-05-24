<template>
  <div>
    <h2>Afegir plats</h2>
    <input type="text" id="newName" name="Nom" v-model="name" v-validate="'required'" placeholder="Nom" />
    <span v-if="errors.has('Nom')" class="error">{{ errors.first('Nom') }}</span>
    <input type="number" id="newCalorieCount" name="KCal" v-model.number="calorieCount" v-validate="'min_value:0'">
    <span v-if="errors.has('KCal')" class="error">{{ errors.first('KCal') }}</span>
    <input type="number" id="newDifficulty" v-model.number="difficulty">
    <input type="number"id="newScore" v-model.number="score">
    <input type="number" id="newTime" name="Temps" v-model.number="time" v-validate="'min_value:0'">
    <span v-if="errors.has('Temps')" class="error">{{ errors.first('Temps') }}</span>
    <input type="radio" id="newStarter" value="starters" name="newCategory" v-model="stringCategory">
    <label for="newStarter">Primer Plat</label>
    <input type="radio" id="newMain" value="mains" name="newCategory" v-model="stringCategory">
    <label for="newMain">Segon Plat</label>
    <button id="newItem" @click="addMeal">Afegir</button>
  </div>
</template>

<script>
import MEALTYPE from '@/lib/MealType'

export default {
  name: 'add-meal',
  data () {
    return {
      name: '',
      calorieCount: 50,
      difficulty: 1,
      score: 3,
      time: 15,
      stringCategory: 'starters',
      possibleDifficulties: ['Baixa', 'Mitja', 'Alta'],
      possibleScores: ['*', '**', '***', '****', '*****']
    }
  },
  computed: {
    category () {
      switch (this.stringCategory) {
        case 'starters':
          return MEALTYPE.STARTER
        case 'mains':
          return MEALTYPE.MAIN
        default:
          return null
      }
    },
    meal () {
      return {
        name: this.name,
        calorieCount: this.calorieCount,
        difficulty: this.difficulty,
        score: this.score,
        time: this.time,
        category: this.category
      }
    }
  },
  methods: {
    addMeal () {
      this.$emit('newMeal', this.meal)
      this.clearMeal()
    },
    clearMeal () {
      this.name = ''
      this.calorieCount = 50
      this.difficulty = 1
      this.score = 3
      this.time = 15
      this.stringCategory = 'starters'
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  font-weight: normal;
}

.error {
  font-size: 0.75rem;
  color: #f00;
}
</style>
