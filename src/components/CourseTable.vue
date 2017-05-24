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
          return this.meals.sort((a, b) => b.score - a.score)
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
  components: {
    Course
  }
}
</script>

<template>
<div>
  <div>
    <h3>{{ title }}</h3>
  </div>
  <div class="table">
    <div class="thead">
      <div class="td">KCal</div>
      <div class="td">Aliments</div>
      <div class="td">Dificultat</div>
      <div class="td">Estrelles</div>
      <div class="td">Temps</div>
    </div>
    <transition-group name="meal" tag="div">
      <course class="meal-item" v-for="meal in sortedMeals" :meal="meal" :key="meal"></course>
    </transition-group>
  </div>
  <p>Plat que s'apropa més a {{ desiredCalorieCount }}KCal: {{ !!closestKcal ? closestKcal : "No n'hi ha." }}</p>
</div>
</template>

<style lang="scss">
.meal-item {
  transition: all 1s;
}

.meal-enter, .meal-leave-to {
  opacity: 0;
  transform: translateX(15rem);
}

.meal-leave-active {
  position: absolute;
}

.table {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  font-size: 1rem;
  margin: 0.5rem;
  line-height: 1.5;

  .thead {
    display: flex;
    flex-flow: row nowrap;
    font-weight: 700;

    .td {
      display: flex;
      flex-flow: row nowrap;
      flex-grow: 1;
      flex-basis: 0;
      padding: 0.5em;
      word-break: break-word;
    }
  }

  .tr {
    display: flex;
    flex-flow: row nowrap;

    .td {
      display: flex;
      flex-flow: row nowrap;
      flex-grow: 1;
      flex-basis: 0;
      padding: 0.5em;
      word-break: break-word;
    }
  }

  .tr:nth-child(even) {
    background-color: lightblue;
  }

  .tr:hover {
    background-color: #f5f5f5
  }
}
</style>
