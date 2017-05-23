<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: 'sort-meals',
  props: ['model'],
  data () {
    return {
      sort: this.model
    }
  },
  watch: {
    sort (value) {
      this.$emit('update:model', value)
    }
  },
  methods: {
    deleteMeal (type) {
      if (type === 'starters') {
        this.$emit('deleteMeal', this.deleteStarter)
        this.deleteStarter = ''
      } else if (type === 'mains') {
        this.$emit('deleteMeal', this.deleteMain)
        this.deleteMain = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  font-weight: normal;
}
</style>
