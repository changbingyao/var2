export const strOver = (value, params) => {
  //文字溢出
  params = Number(params) ?  Number(params) : 5
  if(value.length > params) {
    const newVal = value.slice(0, params)
    return newVal + '...'
  } else {
    return value
  }
};
