var  uid = 0

// Dep contructor
export default function Dep() {
  this.id = uid++
  this.subs = []
}

Dep.prototype.addSub = function(sub) {
  this.subs.push(sub)
}

Dep.prototype.removeSub = function(sub) {
  remove(this.subs, sub)
}

Dep.prototype.depend = function() {
  if (Dep.target) {
    Dep.target.addDep(this)
  }
}

Dep.prototype.notify = function() {
  var subs = this.subs
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update()
  }
}

Dep.target = null

function remove (arr, item) {
  arr.splice(arr.findIndex(v => v === item), 1);
}