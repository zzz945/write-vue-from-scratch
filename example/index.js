import Vue from '../src/index.js'

new Vue ({
  el: '#root',
  components: {
    number: {
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
      h('number', { props: {value: this.count }})
    ])
  }
})