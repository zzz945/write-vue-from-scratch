import Vue from '../src/index.js'

new Vue ({
  el: '#root',
  name: 'parent',
  components: {
    number: {
      name: 'child',
      props: ['value'],
      render (h) {
        return h('span', {}, this.value)
      }
    }
  },
  data () {
    return {
      count: 0
    }
  },
  render (h) {
    return h('div', {}, [
      h('number', { props: {value: this.count }}),
      h('button', { on: { click: this.handleClick }}, 'add')
    ])
  },
  methods: {
    handleClick () {
      this.count++
    }
  }
})

// new Vue ({
//   el: '#root',
//   name: 'parent',
//   data () {
//     return {
//       count: 0
//     }
//   },
//   render (h) {
//     return h('button', { on: { click: this.handleClick }}, this.count)
//   },
//   methods: {
//     handleClick () {
//       this.count++
//     }
//   }
// })