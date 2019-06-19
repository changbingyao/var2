Array.prototype.uniqObject = function(arr) {
  if(this.map(function(e) { return e.name; }).indexOf(arr.name) === -1) {
    this.push(arr)
  }
  return this
}

Array.prototype.uniqItem = function(arr) {
  if(this.indexOf(arr) === -1) {
    this.push(arr)
  }
  return this
}



