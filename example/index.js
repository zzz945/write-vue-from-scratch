new Vue ({
  el: 'root',
  data () {
    return {
      message: 'hello world'
    }
  },
  render (h) {
    return h('div', {}, [
      h('p', {}, this.message)
    ])
  }
})