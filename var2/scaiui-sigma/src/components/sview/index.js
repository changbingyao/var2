import Customise from './Customise'
import Select from './Select'
import Text from './Text'
import {Cascader} from 'iview'
import FormItem from './FormItem'
import FormItem2 from './FormItem2'
import FormItem3 from './FormItem3'
import TreeGrid from './TreeGrid'
import TreeTable from './TreeTable/index'
import TreeTable2 from './TreeTable2/index'
import VueScrollbar from "./vue-scrollbar/vue-scrollbar"
import NoData from './noData/noData'

// 这里是重点
const sview = {
  install: function (Vue) {
    Vue.component('sCustomise', Customise);
    Vue.component('sSelect', Select);
    Vue.component('sText', Text);
    Vue.component('sCascader', Cascader);
    Vue.component('sFormItem', FormItem);
    Vue.component('sFormItem2', FormItem2);
    Vue.component('sFormItem3', FormItem3);
    Vue.component('sTreeGrid', TreeGrid);
    Vue.component('sTreeTable', TreeTable);
    Vue.component('sTreeTable2', TreeTable2);
    Vue.component('sVueScrollbar', VueScrollbar);
    Vue.component('sNoData', NoData);
  }
};

// 导出组件
export default sview
