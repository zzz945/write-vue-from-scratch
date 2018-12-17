import Vue from "../../src/index.js"

describe('create-component', () => {
  it('render vnode with component', (done) => {
    const vm = new Vue({
      data () {
        return { msg1: 'hello', msg2: 'world' }
      },
      render (h) {
        return h('div', null, [
          h('my-component', { props: {msg: this.msg1}}),
          h('my-component', { props: {msg: this.msg2}})
        ])
      },
      components: {
        'my-component': {
          props: ['msg'],
          render (h) {
            return h('p', null, this.msg)
          }
        }
      }
    }).$mount()

    let el = vm.$el
    expect(el.tagName).toEqual('DIV')
    expect(el.children[0].tagName).toEqual('P')
    expect(el.children[1].tagName).toEqual('P')
    expect(el.children[0].textContent).toEqual('hello')
    expect(el.children[1].textContent).toEqual('world')

    vm.msg1 = 'fuck'
    setTimeout(_ => {
      el = vm.$el
      expect(el.children[0].textContent).toEqual('fuck')
      done()
    }, 0)
  })
})