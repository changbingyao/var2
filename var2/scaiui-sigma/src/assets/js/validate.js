// 验证是否为空
export function valiEmpty(val) {
  const reg = /^\s*$/g;
  return reg.test(val);
}

// 验证厂商版本号(不能输入中文）
export function valiVersionNum(val) {
  const reg = /[\u4E00-\u9FA5]/g;
  return reg.test(val.trim());
}

// 验证厂商超时时间、厂商管理评分信息响应时间（不能输入汉字、字符、符号）
export function valiReadoutTime(val) {
  const reg = /[^\d]/g;
  return reg.test(val.trim());
}

// 验证厂商管理评分信息评分（不能输入汉字、字符、符号）
export function valiDataAccuScore(val) {
  const reg = /[^\d | \.]/g;
  return reg.test(val.trim());
}

// 验证费用编号（只能是英文加数字）
export function valiFeeId(val, ref, this_) {
  const reg = /[^a-zA-Z0-9]/g;
  if (reg.test(val.trim())) {
    this_.$refs[ref].style.display = "block";
    this_.$refs[ref].previousElementSibling.children[0].style.borderColor = "#f56c6c";
    return true;
  } else {
    this_.$refs[ref].style.display = "none";
    this_.$refs[ref].previousElementSibling.children[0].style.borderColor = "#dcdfe6";
    return false;
  }
}

// 验证费用和费率    所有的费用长度不能超过20位，小数点只能最多输入两位
//                   所有的折扣率只能显示0.00~100.00之间
export function valiFeeAndRate(val, flag, ref, this_) {
  if (val == '' || val == null || val == undefined){
    this_.$refs[ref].style.display = "none";
    this_.$refs[ref].previousElementSibling.children[0].style.borderColor = "#dcdfe6";
    return false;
  } else {
    if (flag == 'fee') {
      var reg = /^\d{1,18}(\.\d{0,2})?$/g;
    } else if (flag == 'rate') {
      var reg = /^(((\d|[1-9]\d)(\.\d{1,2})?)|100|100.0|100.00)$/g;
    }
    if (!reg.test(val.trim())) {
      this_.$refs[ref].style.display = "block";
      this_.$refs[ref].previousElementSibling.children[0].style.borderColor = "#f56c6c";
      return true;
    } else {
      this_.$refs[ref].style.display = "none";
      this_.$refs[ref].previousElementSibling.children[0].style.borderColor = "#dcdfe6";
      return false;
    }
  }
}

