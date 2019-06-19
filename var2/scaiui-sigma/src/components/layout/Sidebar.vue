<template>
  <aside class="aside" :style="{width: isShrink ? '5%' : sidebarStyle.width}">
    <!--展开-->
    <div :style="{display: isShrink ? 'none' : ''}">
      <div class="avatar"></div>
      <sVueScrollbar class="menus-scrollbar" style="max-height: 80.5vh;" ref="Scrollbar">
        <el-menu style="border-right: none;" default-active="0" class="el-menu-vertical-demo" ref="asideMenu" :background-color="sidebarStyle.bgColor" :text-color="sidebarStyle.color">
          <div v-for="(menu, index) in menuData" :key="index">
            <el-menu-item v-if="menu.type=='1'" :index="menu.name" @click.native="to({ path: menu.name })">
              <template slot="title">
                <div class="cus-menu" :title="language == 'en-US' ? menu.label : ''">
                  <i v-if="menu.icon && menu.icon.indexOf('.')<0 " :class="menu.icon"></i>{{menu.label}}
                </div>
              </template>
            </el-menu-item>
            <el-submenu v-if="menu.type=='0' && menu.children && menu.children.length>0" :index="menu.name">
              <template slot="title">
                <div class="cus-menu" :title="language == 'en-US' ? menu.label : ''">
                  <i :class="menu.icon"></i>{{menu.label}}
                </div>
              </template>
              <el-menu-item v-for="menuItem in menu.children" :key="menuItem.name" :index="menuItem.name" @click.native="to({ path: menuItem.name })">
                <div class="cus-menu" :title="language == 'en-US' ? menuItem.label : ''">
                  <i v-if="menuItem.icon && menuItem.icon.indexOf('.')<0 " :class="menuItem.icon"></i>{{menuItem.label}}
                </div>
              </el-menu-item>
            </el-submenu>
          </div>
        </el-menu>
      </sVueScrollbar>
    </div>
    <!--折叠-->
    <div class="collapseMenu" :style="{display: isShrink ? '' : 'none'}">
      <div class="avatar-little"></div>
      <sVueScrollbar class="menus-scrollbar" style="max-height: 89vh;" ref="Scrollbar">
        <el-menu style="border-right: none;" :collapse="isShrink" default-active="0" class="el-menu-vertical-demo" ref="asideMenu" :background-color="sidebarStyle.bgColor" :text-color="sidebarStyle.color">
          <div v-for="(menu, index) in menuData" :key="index" style="width: 100%;">
            <el-menu-item  v-if="menu.type=='1'" :title="menu.label" :key="menu.name" :index="menu.name" @click.native="to({ path: menu.name })" style="width: 100%;">
              <div class="collapse-cus-menu">
                <i v-if="menu.icon && menu.icon.indexOf('.')<0 " :class="menu.icon"></i>
              </div>
            </el-menu-item>
            <el-submenu v-if="menu.type=='0' && menu.children && menu.children.length>0" :title="menu.label" :index="menu.name" style="width: 100%;">
              <template slot="title">
                <div class="collapse-cus-menu">
                  <i :class="menu.icon"></i>
                </div>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="menuItem in menu.children" :title="menuItem.label" :key="menuItem.name" :index="menuItem.name" @click.native="to({ path: menuItem.name })">
                  <div class="collapse-cus-menu">
                    <i v-if="menuItem.icon && menuItem.icon.indexOf('.')<0 " :class="menuItem.icon"></i>
                  </div>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </div>
        </el-menu>
      </sVueScrollbar>
    </div>
  </aside>
</template>

<script>
  export default {
    name: 'sidebar',
    props: {
      isShrink: {
        type: Boolean,
        default: function () {
          return false
        }
      },
      menuData: {
        type: Array,
        required: false
      },
      sidebarStyle: {
        type: Object,
        required: false
      },
    },
    data() {
      return {
        sideShrink: false,

      }
    },
    computed: {
      language() {
        return this.$i18n.locale;
      }
    },
    methods: {
      shrinkSidebar() {
        this.$emit('screenShrink', this.sideShrink);
        this.sideShrink = !this.sideShrink
      },
      to(val) {
        this.$router.push(val)
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/scss/mixins.scss';
  @import '../../assets/scss/variables.scss';

  .aside {
    position: fixed;
    left: 0;
    height: 100%;
    background-color: #20252d;
    transition: width 300ms;
    .menus-scrollbar {
      position: relative;
      margin: 0 auto;
      overflow: hidden;
      .vue-scrollbar__scrollbar-vertical {
        width: 5px;
        .scrollbar.vue-scrollbar-transition {
          width: 5px;
        }
      }
      .el-menu-item, .el-submenu__title {
        height: 10vh;
      }
      .is-active {
        background: #171C23 !important;
        color: #ffffff !important;
      }
      .cus-menu {
        height:100%;
        line-height: 4.5;
        text-align: left;
        font-size: 13px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        img {
          height: 5vh;
          margin: 0 auto;
        }
        .cus-text {
          font-size: 14px
        }
      }
    }
    .avatar {
      background: url("../../assets/img/system-logo.png") 50% 50% no-repeat;
      height: $base-length * 11.5;
      padding: $base-length;
    }
    .collapseMenu {
      .avatar-little {
        background: url("../../assets/img/system-logo.png") 50% 50% no-repeat;
        background-size: 50px 25px;
        height: 64px;
      }
      .el-icon-arrow-down:before, .el-icon-arrow-right:before {
        content: '' !important;
      }
      .collapse-cus-menu {
        height:100%;
        line-height: 4;
        text-align: left;
        font-size: 14px;
      }
    }
    .toggle-shrink {
      width: 100%;
      height: $medium-length * 3;
      color: $main-color;
      text-align: center;
      cursor: pointer;
      position: absolute;
      bottom: 0;
      z-index: 3000;
    }
  }
</style>

