import Customise from './Customise'
import Select from './Select'
//import Select2 from './Select2'
import Text from './Text'
import Operator from './Operator'
import {Cascader} from 'iview'
import FormItem from './FormItem'
import FormItem2 from './FormItem2'
import FormItem3 from './FormItem3'
import TreeGrid from './TreeGrid'
import TreeTable from './TreeTable/index'
import TreeTable2 from './TreeTable2/index'
import VueScrollbar from "./vue-scrollbar/vue-scrollbar"
import Sidebar from "./Sidebar"
import Header from "./Header"
import TrageBox from "./TrageBox"
import ChartParams from "./ChartParams"
import sFolder from "./folder/folder"
import VueDraggableResizable from 'vue-draggable-resizable'
import DragJoin from './drag/dragJoin'
import DragBlock from './drag/dragBlock'
import DragLabel from './drag/dragLabel'
import NoData from './noData/noData'
import VueContextMenu from './contextMenu/contextMenu'


// 这里是重点
const sview = {
  install: function (Vue) {
    Vue.component('sCustomise', Customise);
    Vue.component('sSelect', Select);
    //Vue.component('sSelect2', Select2);
    Vue.component('sText', Text);
    Vue.component('sOperator', Operator);
    Vue.component('sCascader', Cascader);
    Vue.component('sFormItem', FormItem);
    Vue.component('sFormItem2', FormItem2);
    Vue.component('sFormItem3', FormItem3);
    Vue.component('sTreeGrid', TreeGrid);
    Vue.component('sTreeTable', TreeTable);
    Vue.component('sTreeTable2', TreeTable2);
    Vue.component('sVueScrollbar', VueScrollbar);
    Vue.component('sSidebar', Sidebar);
    Vue.component('sHeader', Header);
    Vue.component('sTrageBox', TrageBox);
    Vue.component('sChartParams', ChartParams);
    Vue.component('sFolder', sFolder);
    Vue.component('VueDraggableResizable', VueDraggableResizable);
    Vue.component('sDragJoin', DragJoin);
    Vue.component('sDragBlock', DragBlock);
    Vue.component('sDragLabel', DragLabel);
    Vue.component('sNoData', NoData);
    Vue.component('sVueContextMenu', VueContextMenu);
  }
};

// 导出组件
export default sview
