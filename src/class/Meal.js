/**
 * @flow
 */
export default class Meal {
  name: string
  category: Symbol
  calorieCount: number
  difficulty: number
  score: number
  time: number
  textDifficulty: Array<string> = ['Baixa', 'Mitja', 'Alta']

  constructor (name: string,
    category: Symbol,
    calorieCount: number,
    difficulty: number,
    score: number,
    time: number) {
    this.name = name
    this.category = category
    this.calorieCount = calorieCount
    this.difficulty = difficulty
    this.score = score
    this.time = time
  }

  stringDifficulty () : string {
    return this.textDifficulty[this.difficulty]
  }

  stringScore () : string {
    return Array(this.score + 1).join('*')
  }

}
