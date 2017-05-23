<template>
  <div>
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
</template>

<script>
export default {
  name: 'delete-meal',
  props: ['starters', 'mains'],
  data () {
    return {
      deleteStarter: '',
      deleteMain: ''
    }
  },
  computed: {
    meal () {
      return {
        name: this.name,
        calorieCount: this.calorieCount,
        difficulty: this.difficulty,
        score: this.score,
        time: this.time,
        category: this.category
      }
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
