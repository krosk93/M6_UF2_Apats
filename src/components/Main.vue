<template>
  <div>
    <h1>Gestió dels plats d'un àpat</h1>
    <sort-meals :model.sync="sort" />
    <ul class="pills">
      <li :class="{ active: tab === 'add' }"><a href="#" id="linkAdd" @click.prevent="changeTab('add')">Afegir plats</a></li>
      <li :class="{ active: tab === 'choose' }"><a href="#" id="linkChoose" @click.prevent="changeTab('choose')">Triar plats</a></li>
      <li :class="{ active: tab === 'delete' }"><a href="#" id="linkDelete" @click.prevent="changeTab('delete')">Esborrar plats</a></li>
    </ul>
    <div v-show="tab === 'add'">
      <add-meal @newMeal="addMeal" />
    </div>
    <div v-show="tab === 'choose'">
      <choose-meal
        :startersDesiredCalorieCount.sync="startersDesiredCalorieCount"
        :mainsDesiredCalorieCount.sync="mainsDesiredCalorieCount"
      />
    </div>
    <div v-show="tab === 'delete'">
      <delete-meal :starters="starters" :mains="mains" @deleteMeal="deleteMeal" />
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
import AddMeal from '@/components/AddMeal'
import DeleteMeal from '@/components/DeleteMeal'
import SortMeals from '@/components/SortMeals'
import ChooseMeal from '@/components/ChooseMeal'
import Meal from '@/class/Meal'
import MEALTYPE from '@/lib/MealType'

export default {
  name: 'main',
  data () {
    return {
      meals: [
        new Meal('Espinacs', MEALTYPE.STARTER, 18, 1, 3, 15),
        new Meal('Pèsols', MEALTYPE.STARTER, 37, 0, 3, 17),
        new Meal('Bledes', MEALTYPE.STARTER, 40, 1, 2, 15),
        new Meal('Espàrrecs', MEALTYPE.STARTER, 45, 0, 2, 10),
        new Meal('Vedella', MEALTYPE.MAIN, 77, 2, 2, 50),
        new Meal('Peix blau', MEALTYPE.MAIN, 80, 1, 2, 15),
        new Meal('Pollastre', MEALTYPE.MAIN, 83, 0, 2, 10),
        new Meal('Embotits', MEALTYPE.MAIN, 97, 0, 1, 3)
      ],
      sort: 'calorieCount',
      startersDesiredCalorieCount: 39,
      mainsDesiredCalorieCount: 85,
      tab: ''
    }
  },
  computed: {
    starters () {
      return this.meals.filter(x => x.category === MEALTYPE.STARTER)
    },
    mains () {
      return this.meals.filter(x => x.category === MEALTYPE.MAIN)
    }
  },
  components: { CourseTable, AddMeal, DeleteMeal, SortMeals, ChooseMeal },
  methods: {
    addMeal (meal) {
      this.meals.push(meal)
    },
    findMeal (category, name) {
      if (category === MEALTYPE.STARTER) {
        return this.starters.findIndex(x => x.name === name)
      } else if (category === MEALTYPE.MAIN) {
        return this.mains.findIndex(x => x.name === name)
      }
      return -1
    },
    deleteMeal (mealName) {
      this.meals = this.meals.filter(x => x.name !== mealName)
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
