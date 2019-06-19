export const permission = (el, val) => {
  //console.log("pppppp>>>>",el,"======",val)
  if (val) {
    let code = val.expression.split(",")[0];
    if (code) {
      code = code.replace(/'/g, "").replace(/"/g, "");
    }
    let label = val.value;
    if (!label) {
      label = code;
    }
    el._permission = {"code": code, "label": label, "page": window.location.pathname}
    let buttons = [];
    try {
      buttons = sessionStorage.getItem('_PERMISSION_BUTTONS')
      let path = window.location.href.replace(window.location.origin, "").replace("/#", "")
      //console.log("pppppppppp>>>>>", path + "/" + code, JSON.parse(buttons), JSON.parse(buttons)[path + "/" + code])
      if (!buttons || !JSON.parse(buttons)[path + "/" + code]) {
        //console.log("======:",)
        el.style.display = "none"
      }
    } catch (e) {

    }
  }
};
