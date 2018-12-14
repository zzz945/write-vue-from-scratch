import Vue from "../../src/index.js"

describe('Options render', () => {
  it('basic usage', () => {
    const vm = new Vue({
      render (h) {
        const children = []
        for (let i = 0; i < this.items.length; i++) {
          children.push(h('li', { staticClass: 'task' }, [this.items[i].name]))
        }
        return h('ul', { staticClass: 'tasks' }, children)
      },
      data () {
        return {
          items: [{ id: 1, name: 'task1' }, { id: 2, name: 'task2' }]
        }
      }
    }).$mount()

    expect(vm.$el.tagName).toBe('UL')
    for (let i = 0; i < vm.$el.children.length; i++) {
      const li = vm.$el.children[i]
      expect(li.tagName).toBe('LI')
      expect(li.textContent).toBe(vm.items[i].name)
    }

    vm.items = [{ id: 3, name: 'task3' }, { id: 4, name: 'task4' }]
    expect(vm.$el.tagName).toBe('UL')
    for (let i = 0; i < vm.$el.children.length; i++) {
      const li = vm.$el.children[i]
      expect(li.tagName).toBe('LI')
      expect(li.textContent).toBe(vm.items[i].name)
    }
  })

  it('allow null data', () => {
    const vm = new Vue({
      render (h) {
        return h('div', null, 'hello' /* string as children*/)
      }
    }).$mount()
    expect(vm.$el.tagName).toBe('DIV')
    expect(vm.$el.textContent).toBe('hello')
  })
})