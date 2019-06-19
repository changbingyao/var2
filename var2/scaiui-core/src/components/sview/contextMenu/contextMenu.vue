<template>
  <ul class="vue-contextmenu-listWrapper"
      @contextmenu.prevent=""
      :class="'vue-contextmenuName-' + contextMenuData.menuName">
    <li v-for="item in contextMenuData.menulists"
        class="context-menu-list"
        :key="item.btnName">
      <div v-if="item.children && item.children.length > 0" class="has-child">
        <div class="parent-name btn-wrapper-simple" :class="{'no-allow': item.disabled ? item.disabled : false}">
          <i :class="item.icoName ? item.icoName : ''" class="nav-icon-fontawe"></i>
          <div class="nav-name-right">{{item.btnName}}</div>
          <i class="icon el-icon-arrow-right"></i>
        </div>
        <Tree :itemchildren="item.children"
              @childhandler="fnHandler"
              :float="floatDirection" />
      </div>
      <div v-else>
        <div @click.stop="item.disabled === true ? '' : fnHandler(item)"
             class="no-child-btn btn-wrapper-simple"
             :class="{'no-allow': item.disabled ? item.disabled : false}">
          <i :class="item.icoName ? item.iconName : ''" class="nav-icon-fontawe"></i>
          <div class="nav-name-right">{{item.btnName}}</div>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
  import Tree from './tree.vue';
  export default {
    name: 'context-menu-component',
    components: {
      Tree
    },
    data () {
      return {
        floatDirection: 'float-statue-1'
      }
    },
    props: {
      contextMenuData: {
        type: Object,
        requred: false,
        default () {
          return {
            menuName: null,
            axis: {
              x: null,
              y: null
            },
            menulists: [
              {
                fnHandler: '', // Binding events(绑定事件)
                icoName: '',  // icon (icon图标 )
                btnName: '' // The name of the menu option (菜单名称)
              }
            ]
          }
        }
      },
      transferIndex: {
        type: Number,
        default: 0
      }
    },
    watch: {
      'contextMenuData.axis' (val) {
        console.log('val', val)
        var x = val.x
        var y = val.y
        var innerWidth = window.innerWidth
        var innerHeight = window.innerHeight
        var _this = this
        var index = _this.transferIndex
        var menuName = 'vue-contextmenuName-' + _this.contextMenuData.menuName
        var menu = document.getElementsByClassName(menuName)[index]
        menu.style.display = 'block'
        var menuHeight = this.contextMenuData.menulists.length * 30
        var menuWidth = 150
        menu.style.top = (y + menuHeight > innerHeight ? innerHeight - menuHeight : y) + 'px'
        menu.style.left = (x + menuWidth > innerWidth ? innerWidth - menuWidth : x) + 'px'
        document.addEventListener('mouseup', function (e) {
          // 解决mac电脑在鼠标右键后会执行mouseup事件
          if (e.button === 0) {
            menu.style.display = 'none'
          }
        }, false)
        if ((x + 2 * menuWidth) > innerWidth && (y + 2 * menuHeight) > innerHeight) {
          this.floatDirection = 'float-status-4'
        }
        if((x + 2 * menuWidth) < innerWidth && (y + 2 * menuHeight) > innerHeight) {
          this.floatDirection = 'float-status-1'
        }
        if((x + 2 * menuWidth) > innerWidth && (y + 2 * menuHeight) < innerHeight) {
          this.floatDirection = 'float-status-3'
        }
        if((x + 2 * menuWidth) < innerWidth && (y + 2 * menuHeight) < innerHeight) {
          this.floatDirection = 'float-status-2'
        }
      }
    },
    methods: {
      fnHandler (item) {
        console.log('item', item)
        this.$emit(item.fnHandler, item)
      }
    }
  }
</script>
<style scoped lang="scss">
  .vue-contextmenu-listWrapper {
    display: none;
    position: fixed;
    z-index: 9999;
    background: #ffffff;
    top: 0;
    left: 0;
    border-radius: 2px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border: 1px solid #ebeef5;
    /*font-family: 'Courier New', Courier, monospace;*/
    font-size: 12px;

    .context-menu-list {
      position: relative;
      background: #ffffff;
      text-decoration: none;
      list-style: none;
      margin: 3px 0;

      &:hover {
        /*background: #2894f8;*/
        color: #2894f8;
      }

      &:hover > .has-child > .child-ul-wrapper {
        display: block;
      }

      .has-child {
        position: relative;
        cursor: pointer;
        padding: 5px 10px;
      }
    }

    .parent-name{
      display: flex;
      justify-content: space-between;
      color: #666;

      .nav-name-right {
        text-align: left;
        height: 16px;
        padding-right: 10px;
        line-height: 16px;
      }

      &:hover {
        color: #2894f8;
      }
    }
  }



  .no-child-btn {
    padding: 5px 10px;
    cursor: pointer;
  }
  .nav-icon-fontawe {
    position: absolute;
    left: 0;
  }


  .no-allow {
    color: #d3cfcf;
    cursor: not-allowed;
  }

  .btn-wrapper-simple {
    position: relative;
    height: 16px;
    line-height: 16px;
  }
</style>
