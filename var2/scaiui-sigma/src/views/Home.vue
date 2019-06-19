<template>
  <div class="layout">
    <div class="sidebar">
      <!--左侧菜单栏-->
      <Sidebar :menuData="menuData" :isShrink="isShrink" :sidebarStyle="sidebarStyle" @screenShrink="screenShrink"></Sidebar>
    </div>
    <div class="container" :style="{width: containerWidth}">
      <!--导航栏-->
      <LayoutHeader @closePage="closePage" @getMenuList="getMenuList" v-model="isShrink" :activePages="activePages" :headerStyle="headerStyle"></LayoutHeader>
      <!--内容区域-->
      <div id="home-container">
        <transition name="fade-in" mode="out-in">
          <!--<keep-alive>-->
          <router-view></router-view>
          <!--</keep-alive>-->
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import Sidebar from '../components/layout/Sidebar'
  import LayoutHeader from '../components/layout/Header'

  export default {
    name: "Home",
    data() {
      return {
        isShrink: false,
        isCollapsed: false,
        sidebarStyle: {
          bgColor: '#20252d',
          color: '#63676c',
          width: '15%',
          itemBgColor: '#000000'
        },
        headerStyle: {
          bgColor: '#fff',
          color: '#63676C !important'
        },
        menuData: [],
        containerWidth: '85%'
      }
    },
    components: {
      Sidebar,
      LayoutHeader
    },
    computed: {
      activePages() {
        return this.$store.state.app.activePages;
      }
    },
    mounted() {
      this.getMenuList();
    },
    methods: {
      // 获取菜单功能
      getMenuList() {
        // 01—系统菜单，   03—其他菜单
        this.$service.get("/menus/01", {params: {locale: this.$i18n.locale}}).then(r => {
          if (r.data.code === '000000') {
            if (r.data.data) {
              this.menuData = [{
                code: "01",
                icon: "el-icon-erp-system",
                label: this.$t('systemMenu'),
                name: "system",
                type: "0"
              }];
              this.menuData[0]["children"] = r.data.data;
            } else {
              this.menuData=[];
            }
            this.$service.get("/menus/03", {params: {locale: this.$i18n.locale}}).then(r => {
              if (r.data.code === '000000') {
                this.menuData = r.data.data.concat(this.menuData);
              } else {
                this.$message({
                  showClose: true,
                  message: r.data.msg,
                  type: 'error'
                });
              }
            }).catch((err) => {
              this.$message({
                showClose: true,
                message: err,
                type: 'error'
              });
            });
          } else {
            this.$message({
              showClose: true,
              message: r.data.msg,
              type: 'error'
            });
          }
        }).catch((err) => {
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          });
        });
      },

      screenShrink(val) {
        this.containerWidth = val ? '90%' : '95%'
      },

      // 关闭标签功能
      closePage(index) {
        const parLength = this.activePages.length;
        if (this.$route.name === this.activePages[index].name) {
          if (index > 0) {
            this.$router.push({name: this.activePages[index - 1].name})
          } else if (index < parLength - 1) {
            this.$router.push({name: this.activePages[parLength - 1].name})
          } else {
            this.$router.push({name: 'home'})
          }
        }
        this.$store.commit('REMOVE_ACTIVEPAGE', index)
      },

    },
    watch: {
      '$route': function (to) {
        const params = {zhName: to.meta.name, name: to.name};
        this.$store.commit('ADD_ACTIVEPAGE', params);
      },
      isShrink: function (nVal) {
        this.sidebarStyle.width = nVal ? '5%' : '15%';
        this.containerWidth = nVal ? '95%' : '85%'
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../assets/scss/variables.scss';

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
      height: calc(100vh - 75px);
      padding: $primary-length;
      background-color: $container-bg;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
</style>
