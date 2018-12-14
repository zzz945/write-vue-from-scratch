import Vue from "../src/index.js";

describe('Event test', function() {
  it('Basic', function() {
  	var vm = new Vue({
  		data () {
        return {
          a:2
        }
      },
      render (h) {
        return h('button', { attrs: { class: 'btn' }, on: { 'click': this.handleClick }}, this.a)
      },
      methods: {
        handleClick () {
          this.a++
        }
      }
    }).$mount()
    document.body.appendChild(vm.$el)
    const btn = document.querySelector('.btn')
    expect(btn.tagName).toEqual('BUTTON')
    btn.click()
    expect(vm.a).toEqual(3);
    btn.click()
    expect(vm.a).toEqual(4);
  });
});
