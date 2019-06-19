<template>
  <el-form v-model="data" ref="editForm" label-width="120px">
    {{data.roleName}}{{data.menuType}}
    <el-tree default-expand-all ref="menuTree"
             :data="menuData"
             :props="defaultProps"
             show-checkbox

             node-key="menuCode" @check-change="handleCheckChange"
             :default-checked-keys="checkedKeys">
 <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span v-show="data.menuType==1">
          <el-radio-group v-model="data.dataAuthType">
            <el-radio label='0'>全行</el-radio>
            <el-radio label="1">分行</el-radio>
            <el-radio label="2">支行</el-radio>
            <el-radio label="9">本人</el-radio>
          </el-radio-group>
        </span>
      </span>
    </el-tree>
    <el-row align="right">
      <el-button type="primary" @click="handleSubmit('editForm')" v-show="operator!='view'">{{$t('ok')}}</el-button>
      <el-button @click="handleCancel">{{$t('cancel')}}</el-button>
    </el-row>
  </el-form>
</template>

<script>
  export default {
    name: "Authorize",
    model: {
      prop: 'dialogIsVisible',
      event: 'closeDialog'
    },
    props: {
      dialogIsVisible: {
        required: true
      },
      operator: {
        type: String,
        required: true
      },
      data: {type: Object}
    },
    data() {
      return {
        menuData: [],
        checkedKeys: [],
        defaultProps: {
          children: 'children',
          label: 'menuName'
        }
      };
    },
    mounted() {
      this.loaderData()
    },
    methods: {
      handleCheckChange(data, checked, hasChild) {
        console.log("======>>>>>>:", data,data.menuName, checked, hasChild)
        return false;
      },
      loaderData() {
        //console.log("======>",this.data.roleCode)
        this.checkedKeys = [];
        this.$service.get('/system/authorizes', {params: {roleCode: this.data.roleCode}})
          .then(r => {
            if (r.data.code === this.$successCode) {
              this.menuData = [r.data.data["menus"]]
              let authorizes = r.data.data["authorizes"];
              for (let i in authorizes) {
                this.checkedKeys.push(authorizes[i]["resourceId"]);
              }
              //console.log(this.menuData)
            } else {
              this.$Message({
                showClose: true,
                message: this.$t('text.failure') + r.data.msg,
                type: 'error'
              });
            }
          })
          .catch(err => {
            console.error('err', err)
          })
      },
      /**
       * 点击取消按钮时关闭对话框
       */
      handleCancel() {
        this.$emit('closeDialog', false)
      },
      /**
       * 点击确定按钮时保存数据
       * @param formName
       * @returns {boolean}
       */
      handleSubmit(formName) {
        this.$service.post('/system/authorizes', Object.assign(this.data, {"menus": this.$refs.menuTree.getCheckedNodes(false, true)}))
          .then(r => {
            if (r.data.code === this.$successCode) {
              this.$emit('closeDialog', false)
              this.$emit('loadData')
              this.$Message({
                showClose: true,
                message: this.$t('text.success'),
                type: 'success'
              })
            }
          })
          .catch(err => {
            console.error('err', err)
          })
      }
    },
    watch: {
      'data.roleCode'(nVal, oVal) {
        this.loaderData()
      }
    }
  };

</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
