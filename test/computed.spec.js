import Vue from "../src/index.js";

describe('Computed test', function() {
  it('Basic', function(done) {
  	var vm = new Vue({
  		data () {
        return {
          a:2
        }
      },
      computed: {
        b () {
          return this.a + 1
        },
        c () {
          return this.b + 1
        }
      },
      render (h) {
        return h('p', {}, this.c)
      },
    }).$mount()
    expect(vm.b).toEqual(3)
    expect(vm.c).toEqual(4)
    expect(vm.$el.textContent).toEqual('4')
    vm.a = 5
    expect(vm.b).toEqual(6)
    expect(vm.c).toEqual(7)
    setTimeout(_ => {

      expect(vm.$el.textContent).toEqual('7')
      done()
    }, 10)
  });
});
