<template>
  <aside class="aside" :style="{backgroundColor: sidebarStyle.bgColor, width: isShrink ? '5%' : sidebarStyle.width}">
      <div :style="{display: isShrink ? 'none' : ''}">
        <div class="avatar">
          <div class="gravatar">
            <img :src="'/' + avatar.src">
          </div>
        </div>
        <sVueScrollbar class="menus-scrollbar" ref="Scrollbar">
          <el-menu default-active="0"
                   class="el-menu-vertical-demo"
                   ref="asideMenu"
                   :background-color="sidebarStyle.bgColor"
                   :text-color="sidebarStyle.color"
                   :active-text-color="sidebarStyle.activeText">
            <div v-for="(menu, index) in menuData" :key="index">
              {{menu.type}}
              <el-menu-item v-if="!menu.sub && menu.type=='1'"
                            :index="menu.name"
                          @click.native="to({ path: menu.name })"
                          :class="currentRouteActive(menu.name) ? 'activeNav' : 'unactiveNav'">
              <template slot="title">
                <div class="cus-menu">
                  <div class="cus-text"> <img v-if="menu.icon && menu.icon.indexOf('.')>0 " :src="'/' + menu.icon"></img>
                    <i v-if="menu.icon && menu.icon.indexOf('.')<0 " :class="menu.icon"></i>{{menu.label}}</div>
                </div>
              </template>
              </el-menu-item>
              <el-submenu v-if="menu.sub && menu.type=='0'"
                          :index="menu.name"
                          :class="currentRouteActive(menu.name)">
                <template slot="title"><i :class="menu.icon"></i>{{menu.label}}</template>
                <el-menu-item v-for="menuItem in menu.children"
                              :key="menuItem.name"
                              :index="menuItem.name"
                              :class="currentRouteActive(menuItem.name)"
                            @click.native="to({ path: menuItem.name })"><span>{{menuItem.label}}</span></el-menu-item>
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
        default: function() {
          return   false
        }
      },
      menuData: {
        type: Array,
        required: false
      },
      avatar: {
        type: Object,
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
    methods: {
      shrinkSidebar() {
        this.$emit('screenShrink', this.sideShrink)
        this.sideShrink = !this.sideShrink
      },
      to(val) {
        this.$router.push(val)
        // this.$router.push({name: val})
      },
      logout() {
        // this.$store.commit('USER_LOGOUT')
      },
      currentRouteActive(routeName) {
        // return {active: this.$route.name.includes(routeName)}
      }
    },
    mounted() {
      // const opedMenuId = 0
      // this.$refs.asideMenu.openMenu(opedMenuId)
    },
    computed: {
      user() {
        // return this.$store.state.auth.data.user || {}
      },
      permissions() {
        // return this.$store.getters.permissions || {}
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/mixins.scss';
  @import '../../assets/scss/variables.scss';

  .aside {
    position: fixed;
    left: 0;
    height: 100%;
    background-color: $main-bg;
    transition: width 300ms;

      .menus-scrollbar {
        max-height: calc(100vh - 200px);
        position: relative;
        margin: 0 auto;
        overflow: hidden;

        .vue-scrollbar__scrollbar-vertical {
          width: 5px;

          .scrollbar.vue-scrollbar-transition {
            width: 5px;
          }
        }
      }

      .avatar {
        height: $base-length * 8;
        padding: $base-length;
        overflow: hidden;
        color: $main-color;
        font-size: $small-font;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .gravatar {
          width: 72%;
          text-align: center;
          margin: 0 auto;

          img {
            width: 100%;
            max-width: 100%;
            /*border-radius: 100%;*/
            /*border: 2px solid #eee;*/
          }
        }

        .name {
          @include text-overflow();
        }
      }

      .toggle-shrink {
        width: 100%;
        height: $medium-length * 3;
        color: $main-color;
        text-align: center;
        cursor: pointer;
        position: absolute;
        bottom: 0px;
        z-index: 3000;
        /*background-color: red;*/
        /*left: calc(50% - 8px);*/
      }
    }

</style>

