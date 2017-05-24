<script>
export default {
  name: 'course',
  data () {
    return {}
  },
  props: ['meal']
}
</script>

<template>
  <div class="meal tr" :name="meal.name">
    <div class="td mealCalorieCount">{{ meal.calorieCount }}</div>
    <div class="td mealName">{{ meal.name }}</div>
    <div class="td mealDifficulty">{{ meal.stringDifficulty() }}</div>
    <div class="td mealScore">{{ meal.stringScore() }}</div>
    <div class="td mealTime">{{ meal.time }}</div>
  </div>
</template>

<style>

</style>
