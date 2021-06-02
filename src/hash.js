const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(init, i) {
    if (i) {
      var p = i.split("=");
      init[p[0]] = decodeURIComponent(p[1]);
    }
    return init;
  }, {});
window.location.hash = "";

export default hash;
