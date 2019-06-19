<template>
  <div style="width: 92%;">
    <el-form :model="data" :rules="rules" ref="editForm" label-width="132px">
      <el-row>
        <sFormItem2 :label="$t('menu.menuCode')" prop="menuCode">
          <el-input v-model="data.menuCode" :disabled="operator!='add'"></el-input>
        </sFormItem2>
        <sFormItem2 :label="$t('menu.menuName')" prop="menuName">
          <el-input v-model="data.menuName" :disabled="operator=='view'"></el-input>
        </sFormItem2>
        <sFormItem2 :label="$t('menu.menuUrl')">
          <el-input v-model="data.menuUrl" :disabled="operator=='view'"></el-input>
        </sFormItem2>
        <sFormItem2 :label="$t('menu.menuIcon')" prop="menuIcon">
          <el-input v-model="data.menuIcon" :disabled="operator=='view'"></el-input>
        </sFormItem2>
        <sFormItem2 :label="$t('menu.menuType')" prop="menuType">
          <sSelect v-model="data.menuType"
                   option="MENU_TYPE"
                   :placeholder="$t('placeholder.select',[$t('menu.menuType')])" :disabled="operator=='view'" clearable>
          </sSelect>
        </sFormItem2>
        <sFormItem2 :label="$t('menu.menuSeq')">
          <el-input v-model="data.menuSeq" :disabled="operator=='view'"></el-input>
        </sFormItem2>
        <sFormItem2 :label="$t('menu.isStart')" prop="isStart">
          <sSelect v-model="data.isStart"
                   option="YN"
                   :placeholder="$t('placeholder.select',[$t('menu.isStart')])" :disabled="operator=='view'" clearable>
          </sSelect>
        </sFormItem2>
      </el-row>
      <el-row>
        <sFormItem2 align="right" col-span="24">
          <el-button class="baseGray" @click="handleCancel">{{$t('cancel')}}</el-button>
          <el-button class="baseBlue" @click="handleSubmit('editForm')" v-show="operator!='view'"  >{{$t('ok')}}</el-button>
        </sFormItem2>
      </el-row>
    </el-form>
    <!--<iframe id="showIframe" frameborder=0 name="showHere" scrolling=auto src="data.url"></iframe>-->
  </div>
</template>

<script>
  export default {
    name: "MenuEdit",
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
      data: {type: Object},
      url: {type: String}
    },
    data() {
      return {
        rules: {
          menuName: [
            {required: true, message: this.$t('placeholder.default', [this.$t('menu.menuName')]), trigger: 'blur'},
            {min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur'}
          ],
          menuCode: [
            {required: true, message: this.$t('placeholder.default', [this.$t('menu.menuCode')]), trigger: 'blur'},
            {min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur'}
          ],
          menuIcon: [
            {min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur'}
          ],
          menuType: [
            {required: true, message: this.$t('placeholder.default', [this.$t('menu.menuType')]), trigger: 'blur'}
          ],
          isStart: [],
        }
      }
    },
    mounted() {
      /*console.log("--------->>>>",this.$router,this.data.menuUrl)
      document.getElementById("showIframe").src = this.data.url;//"/system/user"
      let buttons = document.getElementById("showIframe").contentWindow.document.getElementsByTagName("BUTTON");
      console.log("---------------kdkkkkkkkk>", document.getElementById("showIframe").contentWindow.document, buttons)
      let flagList = [];
      let buttonList = [];
      for (let i = 0; i < buttons.length; i++) {
        if (buttons[i]._permission) {
          let code = buttons[i]._permission.code;
          if (flagList.indexOf(code) < 0) {
            flagList.push(code);
            buttonList.push(buttons[i]._permission)
          }
        }
      }
      console.log("-------------------->", buttonList)*/
      //console.log("=====>",document.getElementsByTagName("BUTTON"))
    },
    methods: {
      /**
       * 点击取消按钮时关闭对话框
       */
      handleCancel() {
        this.$emit('closeDialog', false)
        this.$emit('loadData');
      },

      /**
       * 点击确定按钮时保存数据
       * @param formName
       * @returns {boolean}
       */
      handleSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.operator === "edit") {
              this.menuEdit()
            } else {
              this.menuAdd()
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },

      /**
       * 添加服务调用
       */
      menuAdd() {
        this.$service.post('/system/menus', this.data)
          .then(r => {
            if (r.data.code === '000000') {
              this.$emit('closeDialog', false)
              this.$emit('loadData')
              this.$message({
                showClose: true,
                message: this.$t('text.success'),
                type: 'success'
              })
            } else {
              this.$message({
                showClose: true,
                message: this.$t('text.failure') + r.data.msg,
                type: 'error'
              })
            }
          })
          .catch(err => {
            console.error('err', err)
          })
      },

      /**
       * 修改服务调用
       */
      menuEdit() {
        let tmp = this.data;
        tmp["parent"] = null;
        tmp["isStart"] = 1;
        this.$service.put('/system/menus', tmp)
          .then(r => {
            if (r.data.code === '000000') {
              this.$emit('closeDialog', false);
              this.$emit('loadData');
              this.$message({
                showClose: true,
                message: this.$t('text.success'),
                type: 'success'
              })
            } else {
              this.$message({
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
    }
  }
</script>

<style scoped>

</style>
