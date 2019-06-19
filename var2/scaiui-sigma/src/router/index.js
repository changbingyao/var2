import Vue from 'vue'
import Router from 'vue-router'
import Login from "../views/Login";
import Home from "../views/Home";
import ModifyPwd from "../views/ModifyPwd";
import VendorList from "../views/vendor/VendorList";
import InterFaceList from "../views/interface/InterFaceList";
import MsgList from "../views/msg/MsgList";
import AccessList from "../views/access/AccessList";
import RouteList from "../views/routes/RouteList";
import CountList from "../views/count/CountList";
import MonitorList from "../views/monitor/MonitorList";
import ExternalList from "../views/fee/external/ExternalList";
import InternalList from "../views/fee/internal/InternalList";
import RateList from "../views/fee/rate/RateList";
import DefineList from "../views/fee/define/DefineList";
import FeeModeList from "../views/fee/feeMode/FeeModeList";
import FeeRuleList from "../views/fee/feeRule/FeeRuleList";
import BatchList from "../views/batch/BatchList";
import QueryList from "../views/query/QueryList";
import DataList from "../views/query/DataList";
import CustomerList from "../views/query/CustomerList";
import MapList from "../views/derive/map/MapList";
import CutList from "../views/derive/cut/CutList";
import GroupList from "../views/derive/group/GroupList";
import ReplaceList from "../views/derive/replace/ReplaceList";
import LogList from "../views/system/log/LogList";
import FlowList from "../views/log/FlowList";
import User from "../views/system/user/UserList"
import Menu from "../views/system/menu/MenuList"
import Org from "../views/system/org/OrgList"
import Role from "../views/system/role/RoleList"


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {notNeedAuth: true}
    }, {
      path: '/modifyPwd',
      name: 'modify',
      component: ModifyPwd,
    }, {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {name: '首页'},
      redirect: '/vendor/vendorList',
      children: [
        {
          path: '/vendor/vendorList',
          name: 'vendor.vendorList',
          component: VendorList,
          meta: {
            name: '厂商管理'
          }
        }, {
          path: '/interface/interFaceList',
          name: 'interface.interFaceList',
          component: InterFaceList,
          meta: {
            name: '外部接口管理'
          }
        }, {
          path: '/msg/msgList',
          name: 'msg.msgList',
          component: MsgList,
          meta: {
            name: '数据输出管理'
          }
        }, {
          path: '/access/accessList',
          name: 'access.accessList',
          component: AccessList,
          meta: {
            name: '接入商管理'
          }
        }, {
          path: '/routes/routeList',
          name: 'routes.routeList',
          component: RouteList,
          meta: {
            name: '智能路由'
          }
        }, {
          path: '/count/countList',
          name: 'count.countList',
          component: CountList,
          meta: {
            name: '查询统计'
          }
        }, {
          path: '/monitor/monitorList',
          name: 'monitor.monitorList',
          component: MonitorList,
          meta: {
            name: '监控管理'
          }
        }, {
          path: '/fee/externalList',
          name: 'fee.externalList',
          component: ExternalList,
          meta: {
            name: '外部计费'
          }
        }, {
          path: '/fee/internalList',
          name: 'fee.internalList',
          component: InternalList,
          meta: {
            name: '内部计费'
          }
        }, {
          path: '/fee/rateList',
          name: 'fee.rateList',
          component: RateList,
          meta: {
            name: '费率管理'
          }
        }, {
          path: '/fee/defineList',
          name: 'fee.defineList',
          component: DefineList,
          meta: {
            name: '费率定义'
          }
        }, {
          path: '/fee/feeModeList',
          name: 'fee.feeModeList',
          component: FeeModeList,
          meta: {
            name: '计费方式'
          }
        }, {
          path: '/fee/feeRuleList',
          name: 'fee.feeRuleList',
          component: FeeRuleList,
          meta: {
            name: '计费规则'
          }
        }, {
          path: '/batch/batchList',
          name: 'batch.batchList',
          component: BatchList,
          meta: {
            name: '批量调用'
          }
        }, {
          path: '/query/queryList',
          name: 'query.queryList',
          component: QueryList,
          meta: {
            name: '批量调用查询'
          }
        }, {
          path: '/query/dataList',
          name: 'query.dataList',
          component: DataList,
          meta: {
            name: '数据方调用查询'
          }
        }, {
          path: '/query/customerList',
          name: 'query.customerList',
          component: CustomerList,
          meta: {
            name: '客户方调用查询'
          }
        }, {
          path: '/map/mapList',
          name: 'map.mapList',
          component: MapList,
          meta: {
            name: '映射'
          }
        }, {
          path: '/cut/cutList',
          name: 'cut.cutList',
          component: CutList,
          meta: {
            name: '裁剪及拼接'
          }
        }, {
          path: '/group/groupList',
          name: 'group.groupList',
          component: GroupList,
          meta: {
            name: '分组'
          }
        }, {
          path: '/replace/replaceList',
          name: 'replace.replaceList',
          component: ReplaceList,
          meta: {
            name: '替换'
          }
        }, {
          path: '/system/log',
          name: 'system.log',
          component: LogList,
          meta: {
            name: '操作日志'
          }
        }, {
          path: '/log/flowList',
          name: 'log.flowList',
          component: FlowList,
          meta: {
            name: '请求流水'
          }
        }, {
          path: '/system/user',
          name: 'system.user',
          component: User,
          meta: {
            name: '用户管理',
          }
        }, {
          path: '/system/menu',
          name: 'system.menu',
          component: Menu,
          meta: {
            name: '菜单管理'
          }
        }, {
          path: '/system/org',
          name: 'system.org',
          component: Org,
          meta: {
            name: '机构管理'
          }
        }, {
          path: '/system/role',
          name: 'system.role',
          component: Role,
          meta: {
            name: '角色管理'
          }
        }
      ]
    },
    // 路由重定向
    {path: '*', redirect: '/login'}
  ]
})
