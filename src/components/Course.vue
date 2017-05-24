<script>
export default {
  name: 'course',
  data () {
    return {}
  },
  props: ['meal'],
  computed: {
    mealDifficulty () {
      const textDifficulty = ['Baixa', 'Mitja', 'Alta']
      return textDifficulty[this.meal.difficulty]
    },
    mealScore () {
      return Array(this.meal.score + 1).join('*')
    }
  }
}
</script>

<template>
  <tr class="meal" :name="meal.name">
    <td class="mealCalorieCount">{{ meal.calorieCount }}</td>
    <td class="mealName">{{ meal.name }}</td>
    <td class="mealDifficulty">{{ meal.stringDifficulty() }}</td>
    <td class="mealScore">{{ meal.stringScore() }}</td>
    <td class="mealTime">{{ meal.time }}</td>
  </tr>
</template>

<style>

</style>
