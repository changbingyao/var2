<template>
  <header class="header">
    <nav class="nav-bar" :style="{backgroundColor: headerStyle.bgColor}">
      <el-row type="flex" justify="start" style="margin: 0 !important;">
        <el-col :span="1">
          <div class="nav-item nav-icon"
               @click="toggleShrink"
               :style="{transform: isShrink ? 'rotate(90deg)' : 'rotate(0deg)'}">
            <img src="../../assets/img/menu.png" alt="">
          </div>
        </el-col>
        <el-col :span="20">
          <el-breadcrumb class="app-breadcrumb" separator="/">
            <el-breadcrumb-item v-for="(item,index)  in breadcrumbList" :key="item.path" v-if="item.name">
              <span v-if="index==breadcrumbList.length-1" :to="item.path">{{item.name}}</span>
              <router-link style="color: #666;font-size: 14px;" v-else :to="item.path">{{item.name}}</router-link>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="2" style="text-align: right;">
          <div class="nav-item">
            <el-dropdown @command="handleLang" :style="[{color: headerStyle.color}, {fontSize: '12px'}, {verticalAlign: 'top'}, {cursor: 'pointer'}]" trigger="click">
              <span class="el-dropdown-link">
              {{language}} <i class="el-icon-arrow-down el-icon-arrow-down"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="zh-CN">简体中文</el-dropdown-item>
                <el-dropdown-item command="en-US">English</el-dropdown-item>
                <!--<el-dropdown-item command="zh-TW" disabled>繁体中文</el-dropdown-item>-->
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
        <!--退出-->
        <el-col :span="2" style="text-align: right;padding-right: 5px;">
          <el-dropdown @command="handleRightCommand" style="color: #606266;font-size: 12px;" trigger="click">
            <span class="el-dropdown-link" style="cursor: pointer;">
              <span>{{this.$store.state.login.data.user}}</span><i class="el-icon-arrow-down" style="margin-left:3px;"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="signout">{{$t('signOut')}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </nav>
    <div class="active-pages">
      <el-row>
        <el-col :span="23">
          <div v-for="(tag,index) in activePages"
               :key="index"
               class="inlineBox"
               style="cursor: pointer">
            <el-tag
              closable
              @click="tagTo(tag)"
              @close="tagClose(index)"
              :type="isActive(tag)">
              {{tag.zhName}}
            </el-tag>
          </div>
        </el-col>
        <el-col v-show="activePages.length > 0" :span="1" style="text-align:right;height: 34px;line-height: 34px;">
          <el-dropdown @command="handleCloseTags" style="height: 34px;line-height: 34px;color: #606266;" trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="current">{{$t('header.closeCurrentTab')}}</el-dropdown-item>
              <el-dropdown-item command="others">{{$t('header.closeOtherTabs')}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </div>
  </header>
</template>

<script>
  import Axios from 'axios';
  Axios.defaults.baseURL = '/api';
  Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  export default {
    name: "Header",
    props: {
      activePages: {
        type: Array
      },
      closePage: {
        type: Function
      },
      headerStyle: {
        type: Object
      },
      isShrink: Boolean
    },
    model: {
      prop: 'isShrink',
      event: 'changeShrink'
    },
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        themeColor: '',
        breadcrumbList: []
      }
    },
    computed: {
      language: function() {
        if (this.$i18n.locale == 'zh-CN') {
          return '简体中文';
        } else if (this.$i18n.locale == 'en-US') {
          return 'English';
        }
      }
    },
    watch: {
      $route() {
        this.getBreadcrumbList();
      }
    },
    mounted() {
      this.getBreadcrumbList();
    },
    methods: {
      // 面包屑导航
      getBreadcrumbList() {
        this.breadcrumbList = [];
        this.$route.matched.filter((item) => {
          this.breadcrumbList.push({"name": item.meta.name, "path": item.path});
        });
      },

      // 退出功能
      handleRightCommand(command) {
        if (command == 'signout') {
          Axios.post("/logout").then(r => {
            if (r.data.code === this.$successCode) {
              this.$store.commit('USER_LOGOUT');
              this.$router.push({path: '/'});
            }
          })
        }
      },

      toggleShrink() {
        this.$emit('changeShrink', !this.isShrink)
      },

      // 切换语言
      handleLang(val) {
        this.$i18n.locale = val;
        this.$emit('getMenuList');
      },

      handleSet(val) {
        if (val === 'theme') {
          this.$emit('themeChange', val);
        }
      },

      // 关闭标签
      tagClose(index) {
        this.$emit('closePage', index);
      },

      // 切换标签
      tagTo(val) {
        this.$router.push({name: val.name});
      },

      // 右侧关闭标签功能
      handleCloseTags(command) {
        if (command == 'current') {
          this.$store.commit('DELETE_CURRENT_ACTIVEPAGE', this.$route.name);
          if (this.$store.state.app.nextTag != '') {
            this.$router.push({name: this.$store.state.app.nextTag});
          } else if (this.$store.state.app.preTag != ''){
            this.$router.push({name: this.$store.state.app.preTag});
          } else {
            this.$router.push({path: '/home'});
          }
        } else if (command == 'others') {
          this.$store.commit('DELETE_OTHERS_ACTIVEPAGE',  {name: this.$route.name, zhName: this.$route.meta.name});
        }
      },

      // 为当前标签标色
      isActive(val) {
        if (this.$route.name === val.name) {
          return 'primary'
        } else {
          return 'info'
        }
      },

      themeChange(val) {}
    }
  }
</script>

<style scoped lang="scss">
  @import 'assets/scss/variables.scss';

  .nav-bar {
    height: $base-length * 4;
    padding: 0 $base-length;

    .nav-item {
      height: 100%;
      line-height: 3;
      color: #fff;
      transition: transform 300ms;
      .theme-color {

      }
    }

    .nav-icon {
      text-align: left;

      img {
        height: $base-length * 1.5;
      }
    }
  }

  .nav-item {
    /deep/ .el-dropdown {
      color: #000 !important;
    }
  }

  .active-pages {
    width: 100%;
    overflow: auto;
    height: $base-length * 3.5;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    /*background-color: red;*/

    /deep/ .el-icon-caret-bottom {
      cursor: pointer;
    }

    /deep/ .el-icon-caret-bottom:before {
      content: "..." !important;
      display: inline-block;
      transform: rotate(90deg);
      position: relative;
      top: 2px;
      left: 0px;
      font-size: 22px;
    }
  }
</style>
