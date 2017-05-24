<template>
  <div>
    <h2>Editar plats</h2>
    <div class="form-group">
      <label for="editName">Nom del plat:</label>
      <select id="editName" v-model="selectedIndex">
        <option v-for="(sMeal, index) in meals" :value="index">{{ sMeal.name }}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="newCalorieCount">KCalories:</label>
      <input type="number" id="newCalorieCount" name="KCal" :class="{error: errors.has('KCal')}" v-model.number="meals[selectedIndex].calorieCount" v-validate="'required|min_value:0'">
      <span v-if="errors.has('KCal')" class="error">{{ errors.first('KCal') }}</span>
    </div>
    <div class="form-group">
      <label for="newDifficulty">Dificultat:</label>
      <select id="newDifficulty" v-model.number="meals[selectedIndex].difficulty">
        <option v-for="(possibleDifficulty, index) in possibleDifficulties" :value="index">{{ possibleDifficulty }}</option>
      </select>
      <label for="newScore">Puntuació:</label>
      <select id="newScore" v-model.number="meals[selectedIndex].score">
        <option v-for="(possibleScore, index) in possibleScores" :value="index + 1">{{ possibleScore }}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="newTime">Temps:</label>
      <input type="number" id="newTime" name="Temps" :class="{error: errors.has('Temps')}" v-model.number="meals[selectedIndex].time" v-validate="'required|min_value:0'">
      <span v-if="errors.has('Temps')" class="error">{{ errors.first('Temps') }}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'edit-meal',
  data () {
    return {
      selectedIndex: 0,
      possibleDifficulties: ['Baixa', 'Mitja', 'Alta'],
      possibleScores: ['*', '**', '***', '****', '*****']
    }
  },
  props: ['meals']
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
