/**
 * @Author: jianglei
 * @Date:   2017-10-12 12:06:49
 */
//'use strict';
import Vue from 'vue'

export default function treeToArray(data, expandLevel, parent = null, level = null) {
  let tmp = [];
  let i = 0;
  Array.from(data).forEach(function (record) {
    let _level = 1;
    if (level !== undefined && level !== null) {
      _level = level + 1
    }
    Vue.set(record, '_level', _level);
    Vue.set(record, '_index', i);
    Vue.set(record, '_path', (parent && parent._path ? parent._path + ".children." : "") + (i++));
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', record._level <= expandLevel || true)
    }
    // 如果有父元素
    /*if (parent) {
      Vue.set(record, 'parent', parent)
    }*/
    tmp.push(record);
    if (record.children && record.children.length > 0) {
      const children = treeToArray(record.children, expandLevel, record, _level);
      for (let ii = 0; ii < children.length; ii++) {
        let e = children[ii];
        Vue.set(e, '_show', record._expanded)
        tmp.push(e);
      }
      record.hasChildren = true;
    } else {
      record.hasChildren = false;
    }
  });
  return tmp;
}
