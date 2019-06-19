<template>
  <div class="layout">
    <div class="sidebar">
      <sSidebar :menuData="menuData" :avatar="avatar" :sidebarStyle="sidebarStyle"
                @screenShrink="screenShrink"></sSidebar>
    </div>
    <div class="container" :style="{width: containerWidth}">
      <sHeader :activePages="activePages" @closePage="closePage"></sHeader>
      <div id="home-container">
        <transition name="fade" mode="out-in" appear>
          <!--<keep-alive>-->
          <router-view></router-view>
          <!--</keep-alive>-->
        </transition>
      </div>
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
          {hanzi: '用户管理', sub: false, path: '/system/user', name: 'main.user', icon: 'el-icon-menu'},
          {hanzi: '角色', sub: false, path: '/system/role', name: 'main.role', icon: 'el-icon-menu'},
          {hanzi: '菜单', sub: false, path: '/system/menu', name: 'main.menu', icon: 'el-icon-menu'},
          {hanzi: '字典', sub: false, path: '/system/dictionary', name: 'main.dictionary', icon: 'el-icon-menu'},
          {hanzi: '机构', sub: false, path: '/system/org', name: 'main.org', icon: 'el-icon-menu'},
        //  {hanzi: '授权', sub: false, path: '/system/authorize', name: 'main.authorize', icon: 'el-icon-menu'},
        //  {hanzi: '用户角色', sub: false, path: '/system/userRole', name: 'main.userRole', icon: 'el-icon-menu'},
        ],
        containerWidth: '80%'
      }
    },
    props: {
      username: {
        type: String,
        required: false
      }
    },
    computed: {
      activePages() {
        return this.$store.state.app.activePages
      }
    },
    mounted() {
      this.$service.get("/menus/01").then(r => {
        console.log(JSON.stringify(r));
        this.menuData = r.data.data;
      });
    },
    methods: {
      screenShrink(val) {
        this.containerWidth = val ? '80%' : '95%'
      },
      closePage(index) {
        const parLength = this.activePages.length;
        if (this.$route.name === this.activePages[index].name) {
          if (index > 0) {
            this.$router.push({name: this.activePages[index - 1].name})
          } else if (index < parLength - 1) {
            this.$router.push({name: this.activePages[parLength - 1].name})
          } else {
            this.$router.push({name: 'main'})
          }
        }
        this.$store.commit('REMOVE_ACTIVEPAGE', index)
      }
    },
    watch: {
      '$route': function (to) {
        const params = {zhName: to.meta.name, name: to.name}
        this.$store.commit('ADD_ACTIVEPAGE', params)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../assets/scss/variables.scss';

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

    #home-container {
      height: calc(100vh - 100px);
      padding: $primary-length;
      overflow-y: scroll;
      overflow-x: hidden;
    }
  }
</style>
