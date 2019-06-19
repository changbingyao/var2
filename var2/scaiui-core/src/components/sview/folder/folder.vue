<template>
  <div class="folderItem"
       @contextmenu.prevent
       :style="{'flexDirection': showAsFolder ? 'column': 'row'}">
    <img v-if="floderData.type === 'folder'" :style="{'height': showAsFolder ? '45px':'15px', 'width':  showAsFolder ? '55px':'18px'}" src="/static/img/folder.png" alt="">
    <img v-if="floderData.type === 'context'" :style="{'height': showAsFolder ? '45px':'15px', 'width':  showAsFolder ? '60px':'18px'}" src="/static/img/page.png" alt="">
    <img v-if="floderData.type === 'context' && isActive" src="/static/img/active-page.png" alt="">
    <el-popover
      placement="bottom"
      :disabled="name.length <= 4"
      trigger="hover"
      v-if="showAsFolder">
      <div class="pop-text" @contextmenu.prevent="">{{name}}</div>
      <div class="pop-text" @contextmenu.prevent="" v-if="floderData && floderData.crtDate">{{$t('crtDate')}}：{{floderData.crtDate | timeFormat}}</div>
      <div slot="reference">
        <div style="text-align: center;line-height: 1.7;" :class="isActive ? 'is-active' : 'un-active'">
          {{name | strOver}}
        </div>
      </div>
    </el-popover>
    <div v-if="!showAsFolder"
         style="text-align: left;line-height: 1.8;width: 1082px;"
         :class="isActive ? 'is-active' : 'un-active'">
      <el-row>
        <el-col :span="8">
          <div style="text-align: left">{{name}}</div>
        </el-col>
        <el-col :span="8">
          <div>{{floderData.crtDate | timeFormat}}</div>
        </el-col>
        <el-col :span="8" v-if="floderData.operType === 'folder'">
          <el-button type="text" @click="operOpen(floderData)">{{$t('open')}}</el-button>
          <el-button type="text" @click="operFDel(floderData)">{{$t('delete')}}</el-button>
          <el-button type="text" @click="operFMove(floderData)">{{$t('move')}}</el-button>
          <el-button type="text" @click="operFRename(floderData)">{{$t('rename')}}</el-button>
        </el-col>
        <el-col :span="8" v-if="floderData.operType === 'datasource'">
          <el-button type="text" v-permission="'view','查看'" @click="operView(floderData)">{{$t('view')}}</el-button>
          <el-button type="text" v-permission="'edit','编辑'" v-if="floderData.sourceType!=='1'" @click="operEdit(floderData)">{{$t('edit')}}</el-button>
          <el-button type="text" v-permission="'del','删除'" @click="operDelete(floderData)">{{$t('delete')}}</el-button>
          <el-button type="text" v-permission="'manage','管理'" v-if="floderData.sourceType!=='1'" @click="operManage(floderData)">{{$t('manage')}}</el-button>
        </el-col>
        <el-col :span="8" v-if="floderData.operType === 'inquiry'">
          <el-button type="text" v-permission="'edit','编辑'" @click="operCreate(floderData)">{{$t('newreport')}}</el-button>
          <el-button type="text" v-permission="'del','查看'" @click="operView(floderData)">{{$t('view')}}</el-button>
          <el-button type="text" v-permission="'del','编辑'" @click="operEdit(floderData)">{{$t('edit')}}</el-button>
          <el-button type="text" v-permission="'del','删除'" @click="operDelete(floderData)">{{$t('delete')}}</el-button>
        </el-col>
        <el-col :span="8" v-if="floderData.operType === 'report'">
          <el-button type="text" v-permission="'view','查看'" @click="operView(floderData)">{{$t('view')}}</el-button>
          <el-button type="text" v-permission="'edit','编辑'" @click="operEdit(floderData)">{{$t('edit')}}</el-button>
          <el-button type="text" v-permission="'del','删除'"
                     @click="operDelete(floderData)">
            {{$t('delete')}}</el-button>
        </el-col>
        <el-col :span="8" v-if="floderData.operType === 'dashboard'">
          <el-button type="text" v-permission="'edit','查看'" @click="operView(floderData)">{{$t('view')}}</el-button>
          <el-button type="text" v-permission="'edit','编辑'" @click="operEdit(floderData)">{{$t('edit')}}</el-button>
          <el-button type="text" v-permission="'del','删除'"
                     @click="operDelete(floderData)">
            {{$t('delete')}}</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Folder",
    props: {
      name: {type: String},
      time: String,
      showAsFolder: {
        type: Boolean,
        default: function() {
          return true
        }
      },
      floderData: Object,
      isActive: Boolean,
      type: {
        type: String,
        default: function() {
          return 'floder'
        }
      }
    },
    methods: {
      //查看
      operView(val){
        this.$emit('operView', val);
      },
      //编辑
      operEdit(val){
        this.$emit('operEdit', val);
      },
      //删除
      operDelete(val){
        this.$emit('operDelete', val);
      },
      //管理
      operManage(val){
        this.$emit('operManage', val);
      },
      //新建
      operCreate(val){
        this.$emit('operCreate', val);
      },
      //文件夹打开操作
      operOpen(val){
        this.$emit('operOpen', val);
      },
      //文件夹删除操作
      operFDel(val){
        this.$emit('operFDel', val);
      },
      operFRename(val){
        this.$emit('operFRename', val);
      },
      operFMove(val) {
        this.$emit('operFMove', val);
      }
    }
  }
</script>

<style lang="scss">
  .folderItem {
    display: flex;
    flex-wrap: nowrap;
    position: relative;

    .folder-checkicon {
      position: absolute;
      top: 20%;
      left: 23%;
      font-size:30px;
    }


    img {
      /*height: 50px;*/
      vertical-align: middle;
    }
    .is-active {
      color: #1296db;
    }
    .pop-text{
      width: 100%;
      font-size: 10px !important;
      white-space:normal;
      color: #666;
      font-weight: normal;
    }

    .un-active {
      color: #666;
    }
  }
</style>
