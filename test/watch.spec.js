import Vue from "../src/index.js";

describe('Computed test', function() {
  it('Basic', function() {
  	var vm = new Vue({
  		data () {
        return {
          a:2,
          prev: 2,
          new: 2,
        }
      },
      watch: {
        a (val, prev) {
          this.prev = prev
          this.new = val
        }
      },
    })
    vm.a = 3
    expect(vm.prev).toEqual(2)
    expect(vm.new).toEqual(3)
  });
});
