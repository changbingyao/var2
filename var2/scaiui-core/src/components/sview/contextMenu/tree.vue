<template>
  <ul class="child-ul-wrapper" :class="float">
    <li v-for="i in itemchildren" :key="i.name" class="child-li-wrapper">
      <div v-if="i.children && i.children.length > 0" class="has-child">
        <div class="parent-name btn-wrapper-simple">
          <i :class="i.icoName ? i.icoName : ''" class="nav-icon-fontawe"></i>
          <div class="nav-name-right">{{i.btnName}}</div>
          <i class="icon el-icon-arrow-right"></i>
        </div>
        <tree-child-component :itemchildren="i.children"
                              @childhandler="fnHandler"
                              :float="float" />
      </div>
      <div v-else>
        <div @click.stop="fnHandler(i)" class="no-child-btn btn-wrapper-simple">
          <i :class="i.icoName ? i.icoName : ''" class="nav-icon-fontawe"></i>
          <div class="nav-name-right">{{i.btnName}}</div>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
  export default {
    name: 'tree-child-component',
    props: ['itemchildren', 'float'],
    methods: {
      fnHandler (item) {
        console.log('childhandler', item)
        this.$emit('childhandler', item)
      }
    }
  }
</script>
<style scoped lang="scss">

  .child-ul-wrapper {
    background: #ffffff;
    position: absolute;
    display: none;
    border: 1px solid #ebeef5;
    border-radius: 3px;
    padding: 5px 0px;

    li {
      list-style: none;
      color: #666;

      .has-child {
        position: relative;
        padding: 5px 10px;
      }

      .nav-name-right {
        white-space: nowrap;
        display: block;
        text-align: left;
        height: 16px;
        padding-right: 10px;
        line-height: 16px;
      }

      &:hover {
        color: #2894f8;
      }
    }



    .no-child-btn {
      padding: 5px 20px 10px 10px;
      letter-spacing: 2px;
    }

    .parent-name {
      display: flex;
      justify-content: space-between;
    }

    .child-li-wrapper:hover > .has-child > .child-ul-wrapper{
      display: block;
    }
    .context-menu-list:hover, .child-li-wrapper:hover {
      /*background: #2894f8;*/
      color: #2894f8;
    }
    .nav-icon-fontawe {
      position: absolute;
    }

    .btn-wrapper-simple {
      position: relative;
      height: 20px;
      line-height: 20px;
    }
  }

  .float-status-1 {
    left: 100%;
    bottom: -1px;
    z-index: 10001
  }
  .float-status-2 {
    left: 100%;
    top: -1px;
    z-index: 10001
  }
  .float-status-3 {
    right: 100%;
    top: -1px;
    z-index: 10001
  }
  .float-status-4 {
    right: 100%;
    bottom: -1px;
    z-index: 10001
  }




</style>
