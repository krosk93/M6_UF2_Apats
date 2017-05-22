<template>
  <div class="hello">
    <h1>Gestió dels plats d'un àpat</h1>
    <input type="radio" id="sortCalorieCount" value="calorieCount" name="sort" v-model="sort">
    <label for="sortCalorieCount">KCal</label>
    <input type="radio" id="sortName" value="name" name="sort" v-model="sort">
    <label for="sortName">Aliments</label>
    <input type="radio" id="sortDifficulty" value="difficulty" name="sort" v-model="sort">
    <label for="sortDifficulty">Dificultat</label>
    <input type="radio" id="sortScore" value="score" name="sort" v-model="sort">
    <label for="sortScore">Estrelles</label>
    <input type="radio" id="sortTime" value="time" name="sort" v-model="sort">
    <label for="sortTime">Temps</label>
    <br>
    <input type="text" id="newName" v-model="newName" />
    <input type="number" id="newCalorieCount" v-model="newCalorieCount" number>
    <input type="number" id="newDifficulty" v-model="newDifficulty" number>
    <input type="number"id="newScore" v-model="newScore" number>
    <input type="number" id="newTime" v-model="newTime" number>
    <input type="radio" id="newStarter" value="starter" name="newMeal" v-model="newMeal">
    <label for="newStarter">Primer Plat</label>
    <input type="radio" id="newMain" value="main" name="newMeal" v-model="newMeal">
    <label for="newMain">Segon Plat</label>
    <button id="newItem" @click="addItem">Afegir</button>
    <br>
    <input type="number" id="startersDesiredCalorieCount" v-model="startersDesiredCalorieCount" number>
    <label for="startersDesiredCalorieCount">KCal desitjades primer plat</label>
    <input type="number" id="mainsDesiredCalorieCount" v-model="mainsDesiredCalorieCount" number>
    <label for="mainsDesiredCalorieCount">KCal desitjades segon plat</label>
    <div class="course-tables">
      <course-table title="Primers Plats"
        :meals="starters"
        :sort="sort"
        :desiredCalorieCount="startersDesiredCalorieCount"
      />
      <course-table title="Segons Plats"
        :meals="mains"
        :sort="sort"
        :desiredCalorieCount="mainsDesiredCalorieCount"
      />
    </div>
  </div>
</template>

<script>
import CourseTable from '@/components/CourseTable'

export default {
  name: 'hello',
  data () {
    return {
      starters: [
        {
          name: 'Espinacs',
          calorieCount: 18,
          difficulty: 1,
          score: 3,
          time: 15
        },
        {
          name: 'Pèsols',
          calorieCount: 37,
          difficulty: 0,
          score: 3,
          time: 17
        },
        {
          name: 'Bledes',
          calorieCount: 40,
          difficulty: 1,
          score: 2,
          time: 15
        },
        {
          name: 'Espàrrecs',
          calorieCount: 45,
          difficulty: 0,
          score: 2,
          time: 10
        }
      ],
      mains: [
        {
          name: 'Vedella',
          calorieCount: 77,
          difficulty: 2,
          score: 2,
          time: 50
        },
        {
          name: 'Peix blau',
          calorieCount: 80,
          difficulty: 1,
          score: 2,
          time: 15
        },
        {
          name: 'Pollastre',
          calorieCount: 83,
          difficulty: 0,
          score: 2,
          time: 10
        },
        {
          name: 'Embotits',
          calorieCount: 97,
          difficulty: 0,
          score: 1,
          time: 3
        }
      ],
      sort: 'calorieCount',
      newName: '',
      newCalorieCount: 50,
      newDifficulty: 1,
      newScore: 3,
      newTime: 15,
      newMeal: 'starter',
      startersDesiredCalorieCount: 39,
      mainsDesiredCalorieCount: 85
    }
  },
  components: { CourseTable },
  methods: {
    addItem () {
      const meal = {
        name: this.newName,
        calorieCount: Number(this.newCalorieCount),
        difficulty: Number(this.newDifficulty),
        score: Number(this.newScore),
        time: Number(this.newTime)
      }
      if (this.newMeal === 'starter') this.starters.push(meal)
      else this.mains.push(meal)
      this.clearItem()
    },
    clearItem () {
      this.newName = ''
      this.newCalorieCount = 50
      this.newDifficulty = 1
      this.newScore = 3
      this.newTime = 15
      this.newMeal = 'starter'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.course-tables {
  display: flex;
  justify-content: space-around;
}
</style>
