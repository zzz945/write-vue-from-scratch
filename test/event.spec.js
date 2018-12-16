import Vue from "../src/index.js";

describe('Event test', function() {
  it('Dom event', function() {
  	var vm = new Vue({
  		data () {
        return {
          a:2
        }
      },
      render (h) {
        return h('button', { attrs: { class: 'event__btn' }, on: { 'click': this.handleClick }}, this.a)
      },
      methods: {
        handleClick () {
          this.a++
        }
      }
    }).$mount()
    document.body.appendChild(vm.$el)
    const btn = document.querySelector('.event__btn')
    expect(btn.tagName).toEqual('BUTTON')
    btn.click()
    expect(vm.a).toEqual(3);
    btn.click()
    expect(vm.a).toEqual(4);
  });

  it('Component event', function() {
  	var vm = new Vue({
      components: {
        mybutton: {
          props: ['value'],
          render (h) {
            return h('button', {attrs: { class: 'event__btn2' }, on: {click: _ => this.$emit('press')}}, this.value)
          }
        }
      },
  		data () {
        return {
          a:2
        }
      },
      render (h) {
        return h('mybutton', { props: {value: this.a}, on: { 'press': this.handleClick }})
      },
      methods: {
        handleClick () {
          this.a++
        }
      }
    }).$mount()
    document.body.appendChild(vm.$el)
    const btn = document.querySelector('.event__btn2')
    expect(btn.tagName).toEqual('BUTTON')
    btn.click()
    expect(vm.a).toEqual(3);
    btn.click()
    expect(vm.a).toEqual(4);
  });
});
