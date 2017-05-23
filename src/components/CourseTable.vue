<script>
import Course from '@/components/Course'

export default {
  name: 'course-table',
  data () {
    return {}
  },
  props: ['meals', 'title', 'sort', 'desiredCalorieCount'],
  computed: {
    sortedMeals () {
      switch (this.sort) {
        case 'calorieCount':
          return this.meals.sort((a, b) => a.calorieCount - b.calorieCount)
        case 'difficulty':
          return this.meals.sort((a, b) => a.difficulty - b.difficulty)
        case 'score':
          return this.meals.sort((a, b) => a.score - b.score)
        case 'time':
          return this.meals.sort((a, b) => a.time - b.time)
        case 'name':
          return this.meals.sort((a, b) => a.name.localeCompare(b.name))
        default:
          return this.meals
      }
    },
    closestKcal () {
      const closest = this.meals
      .filter(x => x.calorieCount <= this.desiredCalorieCount)
      .sort((a, b) => {
        const testA = Math.abs(this.desiredCalorieCount - a.calorieCount)
        const testB = Math.abs(this.desiredCalorieCount - b.calorieCount)
        return testA - testB
      })
      if (closest.length === 0) return null
      const sameKcal = this.meals
        .filter(x => x.calorieCount === closest[0].calorieCount)
        .map(x => x.name)
        .join(', ')
      return sameKcal
    }
  },
  components: { Course }
}
</script>

<template>
  <div>
    <div>
      <h3>{{ title }}</h3>
    </div>
    <table>
      <thead>
        <tr>
          <th>KCal</th>
          <th>Aliments</th>
          <th>Dificultat</th>
          <th>Estrelles</th>
          <th>Temps</th>
        </tr>
      </thead>
      <tbody>
        <course v-for="meal in sortedMeals" :meal="meal" :key="meal"></course>
      </tbody>
    </table>
    <p>Plat que s'apropa més a {{ desiredCalorieCount }}KCal: {{ !!closestKcal ? closestKcal : "No n'hi ha." }}</p>
  </div>
</template>

<style>

</style>
