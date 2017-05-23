<template>
  <div>
    <h2>Triar plats</h2>
    <label for="startersDesiredCalorieCount">KCal desitjades primer plat:</label>
    <input
      type="number"
      id="startersDesiredCalorieCount"
      v-model.number="starters"
    >
    <br>
    <label for="mainsDesiredCalorieCount">KCal desitjades segon plat:</label>
    <input
      type="number"
      id="mainsDesiredCalorieCount"
      v-model.number="mains"
    >
  </div>
</template>

<script>
export default {
  name: 'sort-meals',
  props: [
    'startersDesiredCalorieCount',
    'mainsDesiredCalorieCount'
  ],
  data () {
    return {
      starters: this.startersDesiredCalorieCount,
      mains: this.mainsDesiredCalorieCount
    }
  },
  watch: {
    mains (value) {
      this.$emit('update:mainsDesiredCalorieCount', value)
    },
    starters (value) {
      this.$emit('update:startersDesiredCalorieCount', value)
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  font-weight: normal;
}
</style>
