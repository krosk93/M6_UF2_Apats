<template>
  <div>
    <h1>Gestió dels plats d'un àpat</h1>
    <h2>Ordre</h2>
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
    <ul class="pills">
      <li :class="{ active: tab === 'add' }"><a href="#" @click.prevent="changeTab('add')">Afegir plats</a></li>
      <li :class="{ active: tab === 'choose' }"><a href="#" @click.prevent="changeTab('choose')">Triar plats</a></li>
      <li :class="{ active: tab === 'delete' }"><a href="#" @click.prevent="changeTab('delete')">Esborrar plats</a></li>
    </ul>
    <div v-show="tab === 'add'">
      <h2>Afegir plats</h2>
      <input type="text" id="newName" v-model="newName" />
      <input type="number" id="newCalorieCount" v-model="newCalorieCount" number>
      <input type="number" id="newDifficulty" v-model="newDifficulty" number>
      <input type="number"id="newScore" v-model="newScore" number>
      <input type="number" id="newTime" v-model="newTime" number>
      <input type="radio" id="newStarter" value="starters" name="newCategory" v-model="newCategory">
      <label for="newStarter">Primer Plat</label>
      <input type="radio" id="newMain" value="mains" name="newCategory" v-model="newCategory">
      <label for="newMain">Segon Plat</label>
      <button id="newItem" @click="addMeal">Afegir</button>
    </div>
    <div v-show="tab === 'choose'">
      <h2>Triar plats</h2>
      <label for="startersDesiredCalorieCount">KCal desitjades primer plat:</label>
      <input type="number" id="startersDesiredCalorieCount" v-model="startersDesiredCalorieCount" number>
      <br>
      <label for="mainsDesiredCalorieCount">KCal desitjades segon plat:</label>
      <input type="number" id="mainsDesiredCalorieCount" v-model="mainsDesiredCalorieCount" number>
    </div>
    <div v-show="tab === 'delete'">
      <h2>Esborrar plats</h2>
      <label for="deleteStarter">Primers:</label>
      <select id="deleteStarter" v-model="deleteStarter">
        <option disabled value ="">Seleccionar</option>
        <option v-for="meal in starters">{{ meal.name }}</option>
      </select>
      <button @click="deleteMeal('starters')">Esborrar Primer Plat</button>
      <br>
      <label for="deleteMain">Segons:</label>
      <select id="deleteMain" v-model="deleteMain">
        <option disabled value ="">Seleccionar</option>
        <option v-for="meal in mains">{{ meal.name }}</option>
      </select>
      <button @click="deleteMeal('mains')">Esborrar Segon Plat</button>
    </div>
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
  name: 'main',
  data () {
    return {
      meals: [
        {
          name: 'Espinacs',
          category: 'starters',
          calorieCount: 18,
          difficulty: 1,
          score: 3,
          time: 15
        },
        {
          name: 'Pèsols',
          category: 'starters',
          calorieCount: 37,
          difficulty: 0,
          score: 3,
          time: 17
        },
        {
          name: 'Bledes',
          category: 'starters',
          calorieCount: 40,
          difficulty: 1,
          score: 2,
          time: 15
        },
        {
          name: 'Espàrrecs',
          category: 'starters',
          calorieCount: 45,
          difficulty: 0,
          score: 2,
          time: 10
        },
        {
          name: 'Vedella',
          category: 'mains',
          calorieCount: 77,
          difficulty: 2,
          score: 2,
          time: 50
        },
        {
          name: 'Peix blau',
          category: 'mains',
          calorieCount: 80,
          difficulty: 1,
          score: 2,
          time: 15
        },
        {
          name: 'Pollastre',
          category: 'mains',
          calorieCount: 83,
          difficulty: 0,
          score: 2,
          time: 10
        },
        {
          name: 'Embotits',
          category: 'mains',
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
      newCategory: 'starters',
      startersDesiredCalorieCount: 39,
      mainsDesiredCalorieCount: 85,
      deleteStarter: '',
      deleteMain: '',
      tab: ''
    }
  },
  computed: {
    starters () {
      return this.meals.filter(x => x.category === 'starters')
    },
    mains () {
      return this.meals.filter(x => x.category === 'mains')
    }
  },
  components: { CourseTable },
  methods: {
    addMeal () {
      const meal = {
        name: this.newName,
        calorieCount: Number(this.newCalorieCount),
        difficulty: Number(this.newDifficulty),
        score: Number(this.newScore),
        time: Number(this.newTime),
        category: this.newCategory
      }
      this.meals.push(meal)
      this.clearMeal()
    },
    clearMeal () {
      this.newName = ''
      this.newCalorieCount = 50
      this.newDifficulty = 1
      this.newScore = 3
      this.newTime = 15
      this.newCategory = 'starters'
    },
    findMeal (category, name) {
      if (category === 'starters') {
        return this.starters.findIndex(x => x.name === name)
      } else if (category === 'mains') {
        return this.mains.findIndex(x => x.name === name)
      }
      return -1
    },
    deleteMeal (category) {
      if (category === 'starters') {
        this.meals = this.meals.filter(x => x.name !== this.deleteStarter)
        this.deleteStarter = ''
      } else if (category === 'mains') {
        this.meals = this.meals.filter(x => x.name !== this.deleteMain)
        this.deleteMain = ''
      }
    },
    changeTab (newTab) {
      if (this.tab === newTab) this.tab = ''
      else this.tab = newTab
    }
  }
}
</script>

<style lang="scss" scoped>
$tabColor: #fff;
$activeTabColor: #d5f6d5;
h1, h2 {
  font-weight: normal;
}

ul.pills {
  list-style-type: none;
  margin: 1rem;
  li {
    display: inline-block;
    a {
      padding: 0.5rem;
      color: inherit;
      text-decoration: inherit;
      border-color: darken($tabColor, 20%);
      background-color: $tabColor;
      border-width: 1px;
      border-radius: 0.25rem;
      border-style: solid;

      &:hover {
        background-color: darken($tabColor, 5%);
        border-color: darken($tabColor, 20%);
      }
    }
    &.active {
      a {
        background-color: $activeTabColor;
        border-color: darken($activeTabColor, 20%);
        &:hover {
          background-color: darken($activeTabColor, 5%);
          border-color: darken($activeTabColor, 20%);
        }
      }
    }
  }
}

.course-tables {
  display: flex;
  justify-content: space-around;
}
</style>
