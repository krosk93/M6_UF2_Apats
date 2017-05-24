<template>
  <div>
    <h2>Afegir plats</h2>
    <div class="form-group">
      <label for="newName">Nom del plat:</label>
      <input type="text" id="newName" name="Nom" :class="{error: errors.has('Nom')}" v-model="name" v-validate="`required|not_in:${mealNames}`" placeholder="Nom" autofocus />
      <span v-if="errors.has('Nom')" class="error">{{ errors.first('Nom') }}</span>
    </div>
    <div class="form-group">
      <label for="newCalorieCount">KCalories:</label>
      <input type="number" id="newCalorieCount" name="KCal" :class="{error: errors.has('KCal')}" v-model.number="calorieCount" v-validate="'required|min_value:0'">
      <span v-if="errors.has('KCal')" class="error">{{ errors.first('KCal') }}</span>
    </div>
    <div class="form-group">
      <label for="newDifficulty">Dificultat:</label>
      <select id="newDifficulty" v-model.number="difficulty">
        <option v-for="(possibleDifficulty, index) in possibleDifficulties" :value="index">{{ possibleDifficulty }}</option>
      </select>
      <label for="newScore">Puntuació:</label>
      <select id="newScore" v-model.number="score">
        <option v-for="(possibleScore, index) in possibleScores" :value="index + 1">{{ possibleScore }}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="newTime">Temps:</label>
      <input type="number" id="newTime" name="Temps" :class="{error: errors.has('Temps')}" v-model.number="time" v-validate="'required|min_value:0'">
      <span v-if="errors.has('Temps')" class="error">{{ errors.first('Temps') }}</span>
    </div>
    <input type="radio" id="newStarter" value="starters" name="newCategory" v-model="stringCategory">
    <label for="newStarter">Primer Plat</label>
    <input type="radio" id="newMain" value="mains" name="newCategory" v-model="stringCategory">
    <label for="newMain">Segon Plat</label>
    <br>
    <button id="newItem" :disabled="errors.any()" @click.prevent="addMeal">Afegir</button>
  </div>
</template>

<script>
import MEALTYPE from '@/lib/MealType'
import Meal from '@/class/Meal'

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
      possibleScores: ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐']
    }
  },
  props: ['mealNames'],
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
      return new Meal(this.name, this.category, this.calorieCount, this.difficulty, this.score,
        this.time)
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
$ordinary: #fff;
$success: #d5f6d5;
$error: #CD5C5C;
h2 {
  font-weight: normal;
}

.form-group {
  display: block;
  padding: 0.25rem;

  & > label {
    display: inline-block;
  }

  & > input {
    display: inline-block;
    border-radius: 0.25rem;
    padding: 0.5rem;
    border: 1px solid darken($ordinary, 20%);

    &:hover {
      border-color: darken($ordinary, 30%);
    }

    &:focus {
      border-color: darken($ordinary, 40%);
      outline: none;
    }

    &.error {
      border-color: $error;

      &:hover {
        border-color: darken($error, 10%);
      }

      &:focus {
        border-color: darken($error, 20%);
      }
    }
  }

  & > select {
    display: inline-block;
    border-radius: 0.25rem;
    padding: 0.5rem;
    border: 1px solid darken($ordinary, 20%);
  }

  & > span.error {
    display: block;
    color: $error;
    font-size: 0.75rem;
  }
}

button {
  padding: 0.5rem;
  color: inherit;
  text-decoration: inherit;
  font-size: inherit;
  font-family: inherit;
  background-color: $ordinary;
  border: 1px solid darken($ordinary, 20%);
  border-radius: 0.25rem;
  outline: none;

  &:hover {
    background-color: darken($ordinary, 5%);
    border-color: darken($ordinary, 20%);
  }

  &:active {
    background-color: darken($ordinary, 5%);
    border-color: darken($ordinary, 40%);
  }

  &:disabled {
    border-color: $error;
    cursor: not-allowed;
  }
}
</style>
