<template>
  <div class="layout">
    <div class="sidebar">
      <sSidebar :menuData="menuData" :avatar="avatar" :sidebarStyle="sidebarStyle" @screenShrink="screenShrink"></sSidebar>
    </div>
    <div class="container" :style="{width: containerWidth}">
      <!--<sHeader></sHeader>-->
      <transition name="fade" mode="out-in" appear>
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        isCollapsed: false,
        sidebarStyle: {
          bgColor: '#20252c',
          color: '#fff',
          activeText: '#ffd04b'
        },
        avatar: {
          text: '智能可视化数据分析系统',
          src: 'http://thyrsi.com/t6/400/1540887073x-1404775437.png'
        },
        menuData: [
          {hanzi: '拖拽', sub: true, icon: 'el-icon-menu', name: 'main.system2', children: [
            {hanzi: '拖块', sub: false, path: '/drag', name: 'main.drag', icon: 'el-icon-menu' },
            {hanzi: '拖动拼接', sub: false, path: '/join', name: 'main.join', icon: 'el-icon-menu' },
            {hanzi: '拖动调节div大小', sub: false, path: '/dragSize', name: 'main.dragSize', icon: 'el-icon-menu' },
            {hanzi: '可拖动树', sub: false, path: '/tree', name: 'main.tree', icon: 'el-icon-menu' },
          ]},
          {hanzi: 'excel', sub: true, icon: 'el-icon-menu', name: 'main.system2', children: [
            {hanzi: '导出excel', sub: false, path: '/', name: 'system.user', index: 1-1},
            {hanzi: '导出已选项', sub: false, path: '/', name: 'system.user1', index: 1-2},
            {hanzi: '上传', sub: false, path: '/', name: 'system.user2', index: 1-3},
          ]},
          {hanzi: '全屏', sub: false, path: '/charts', name: 'main.charts', icon: 'el-icon-menu' },
          {hanzi: '图表', sub: false, path: '/charts', name: 'main.charts', icon: 'el-icon-menu' },
          {hanzi: '下拉菜单', sub: false, path: '/select', name: 'main.select', icon: 'el-icon-menu' },
          {hanzi: '面包屑', sub: false, path: '/charts', name: 'main.charts', icon: 'el-icon-menu' },
          {hanzi: 'tree-table', sub: false, path: '/charts', name: 'main.charts', icon: 'el-icon-menu' },
          {hanzi: '国际化', sub: false, path: '/i18n', name: 'main.i18n', icon: 'el-icon-menu' },
          {hanzi: '文件夹们', sub: false, path: '/folder', name: 'main.folder', icon: 'el-icon-menu' },
        ],
        containerWidth: '83%'
      };
    },
    computed: {
      menuitemClasses: function () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      }
    },
    methods: {
      screenShrink(val) {
        console.log('screenShrink', val)
        this.containerWidth = val ? '83%' : '95%'
      }
    }
  }
</script>

<style scoped>
  .layout {
    width: 100%;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
  }

  .container {
    height: 100%;
  }
</style>
