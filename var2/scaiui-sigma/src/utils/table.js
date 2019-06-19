import Vue from 'vue';

const TableUtil = {
  /**
   * 根据数组中的某元素本身获取其所在的数组（针对树形数据结构）
   * @param data 总的数据集Array
   * @param element 数组里的某元素 Object
   * @returns {*}  element元素所在的数组Array
   */
  getParentArray: function (data, element) {
    if (data && data instanceof Array) {
      let i = data.indexOf(element);
      if (i >= 0) {
        return data;
      } else {
        for (let e = 0; e < data.length; e++) {
          let tmp = this.getParentArray(data[e].children, element);
          if (tmp) {
            return tmp;
          }
        }
      }
    } else {
      return null;
    }
  },
  /**
   * 根据数组中的某元素本身获取其所在的数组（针对树形数据结构）
   * @param data 总的数据集Array
   * @param element 数组里的某元素 Object
   * @returns {*}  element元素所在的数组Array
   */
  getParent: function (data, element) {
    if (data && data instanceof Array) {
      for (let i = 0; i < data.length; i++) {
        let e = data[i];
        if (e.children) {
          let i = e.children.indexOf(element);
          if (i >= 0) {
            return e;
          } else {
            let tmp = this.getParent(e.children, element);
            if (tmp) {
              return tmp;
            }
          }
        }
      }
    }
    return null;
  },
  /**
   * 根据数组中的某元素本身获取其所在的数组（针对树形数据结构）
   * @param data 总的数据集Array
   * @param element 数组里的某元素 Object
   * @returns {*}  element元素所在的数组Array
   */
  /* getParentRule: function (data, path) {
     if (data && data instanceof Object) {
       let paths = path.split(".");
       if (paths) {
         let tmp = data;
         for (let e = 0; e < paths.length; e++) {
           tmp = tmp[paths[e]];
         }
         return tmp;
       }
     } else {
       return null;
     }
   },*/

  /**
   * 根据数组中的某元素本身获取其所在的数组（针对树形数据结构）
   * @param data 总的数据集Array
   * @param rule 校验规则片段 Object
   * @returns {*}  element元素所在的数组Array
   */
  getRuleByData: function (data, rule, res) {
    if (!res) {
      res = {};
    }
    if (data && data instanceof Array) {
      for (let i = 0; i < data.length; i++) {
        if (!res[i]) {
          res[i] = JSON.parse(JSON.stringify(rule[0]));
        }
        if (data[i] && data[i].children) {
          res[i].children = {};
          this.getRuleByData(data[i].children, rule, res[i].children);
        }
      }
      return res;
    } else {
      return null;
    }
  },
  /**
   * 删除当前行
   * @param data
   * @param element
   * @returns {*}
   */
  removeRow: function (data, row) {
    let parent = this.getParentArray(data, row);
    if (parent) {
      let i = parent.indexOf(row);
      parent.splice(i, 1);
    }
  },
  /**
   * 添加子节点--暂时有问题
   * @param row 当前行
   * @param element  添加的元素
   * @returns {*}
   */
  append: function (row, element) {
    if (!row.children) {
      Vue.set(row, "children", []);
    }
    row.children.push(element);
    // return row;
  },
  /**
   * 添加根节点--暂时有问题
   * @param row 当前行
   * @param element  添加的元素
   * @returns {*}
   */
  appendRoot: function (data, element) {
    if (!data) {
      data = [];
    }
    data.push(element);
    //return data;
  },
  /**
   * 将树形结构转为数组对象 - 暂未使用
   * @param data
   * @param expandLevel
   * @param parent
   * @param level
   * @returns {Array}
   */
  treeToArray: function (data, expandLevel, parent = null, level = null) {
    let tmp = [];
    for (let i = 0; i < data.length; i++) {
      let record = data[i];
      let _level = 1;
      if (level !== undefined && level !== null) {
        _level = level + 1
      }
      Vue.set(record, '_level', _level);
      if (record._expanded === undefined) {
        Vue.set(record, '_expanded', record._level <= expandLevel)
      }
      // 如果有父元素
      /*if (parent) {
        Vue.set(record, 'parent', parent)
      }*/
      tmp.push(record);
      if (record.children && record.children.length > 0) {
        const children = this.treeToArray(record.children, expandLevel, record, _level);
        for (let ii = 0; ii < children.length; ii++) {
          let e = children[ii];
          Vue.set(e, '_show', record._expanded)
          tmp.push(e);
        }
      }
    }
    return tmp;
  }
};

export default TableUtil;
