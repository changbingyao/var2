<template>
  <div>
    <el-form :model="data" :rules="rules" ref="accessEditForm" label-width="120px">
      <!--基本信息-->
      <el-row class="leftLine">
        <i></i>{{$t('basicinfo')}}
      </el-row>
      <el-row>
        <sFormItem2 :label="$t('access.appKey')" prop="reqSystemReg.appKey">
          <el-input v-model="data.reqSystemReg.appKey" :placeholder="$t('placeholder.default',[$t('access.appKey')])" :disabled="operator=='view'"></el-input>
        </sFormItem2>
        <sFormItem2 :label="$t('access.appSecret')" prop="reqSystemReg.appSecret">
          <el-input v-model="data.reqSystemReg.appSecret" :placeholder="$t('placeholder.default',[$t('access.appSecret')])" :disabled="operator=='view'"></el-input>
        </sFormItem2>
        <sFormItem2 :label="$t('access.ipAddress')" prop="reqSystemReg.ipAddr">
          <el-input v-model="data.reqSystemReg.ipAddr" :placeholder="$t('placeholder.default',[$t('access.ipAddress')])" :disabled="operator=='view'"></el-input>
        </sFormItem2>
        <sFormItem2 :label="$t('access.systemDesc')" prop="reqSystemReg.regSystemDesc">
          <el-input v-model="data.reqSystemReg.regSystemDesc" :placeholder="$t('placeholder.default',[$t('access.systemDesc')])" :disabled="operator=='view'"></el-input>
        </sFormItem2>
        <sFormItem2 style="width: 50%;" :label="$t('interface.encryption')" prop="reqSystemReg.systemType">
          <sSelect style="width: 100%;" v-model="data.reqSystemReg.systemType" :option="systemTypeList" :placeholder="$t('placeholder.select',[$t('interface.encryption')])" :disabled="operator=='view'"></sSelect>
        </sFormItem2>
      </el-row>
      <!--权限信息-->
      <el-row class="leftLine">
        <i></i>{{$t('permissionInfo')}}
      </el-row>
      <!--<el-row style="margin-bottom: 15px;">-->
        <!--<el-button type="primary" size="mini" icon="el-icon-edit" circle></el-button> {{$t('permissionInfo')}}-->
      <!--</el-row>-->
      <el-row style="width: 100%; padding-left: 4%; margin-bottom: 18px;">
        <div class="el-transfer">
          <!--左-->
          <transfer-panel
            :operator="operator"
            :checkboxCtrl="true"
            :title="titles[0]"
            :data="permissionSourceList"
            @disabledChanged="disabledChanged">
          </transfer-panel>
          <!--按钮-->
          <div class="el-transfer__buttons">
            <el-button @click="addLeft" :class="['el-button', 'el-button--small', 'el-transfer__button', {'is-disabled': leftDisabledCtrl}]">
              <span class="el-icon-arrow-left"></span>
            </el-button>
            <el-button @click="addRight" :class="['el-button', 'el-button--small', 'el-transfer__button', {'is-disabled': rightDisabledCtrl}]">
              <span class="el-icon-arrow-right"></span>
            </el-button>
          </div>
          <!--中-->
          <transfer-panel
            :operator="operator"
            :checkboxCtrl="true"
            :title="titles[1]"
            :data="data.systemLimits"
            @disabledChanged="disabledChanged">
          </transfer-panel>
          <!--右-->
          <transfer-panel
            :operator="operator"
            :checkboxCtrl="false"
            :data="data.systemLimits"
            :title="titles[2]">
          </transfer-panel>
        </div>
      </el-row>
      <!--footer部分-->
      <el-row>
        <sFormItem2 align="right" col-span="24">
          <el-button class="baseGray" @click="handleCancel">{{$t('cancel')}}</el-button>
          <el-button class="baseBlue" v-permission="'save','保存'" @click="handleSubmit('accessEditForm')" v-show="operator!='view'">{{$t('ok')}}</el-button>
        </sFormItem2>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import TransferPanel from '../../components/transfer/TransferPanel'
  export default {
    name: "AccessEdit",
    components: {
      TransferPanel
    },
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
        leftCheckedList: [],
        rightCheckedList: [],
        leftDisabledCtrl: true,
        rightDisabledCtrl: true,
        systemTypeList: [{
          label: '是', value: 'A'
        }, {
          label: '否', value: 'B'
        }],
        titles: ['Source','Target', '持久化设置'],
        initCurrentRow: {},
        permissionSourceList: [],
        permissionTargetList: [],
        //校验输入
        rules: {
          reqSystemReg: {
            appKey: [{required: true, message: this.$t('placeholder.default', [this.$t('access.appKey')]), trigger: 'blur'}],
            appSecret: [{required: true, message: this.$t('placeholder.default', [this.$t('access.appSecret')]), trigger: 'blur'}],
            ipAddr: [{required: true, message: this.$t('placeholder.default', [this.$t('access.ipAddress')]), trigger: 'blur'}],
            systemType: [{required: true, message: this.$t('placeholder.select', [this.$t('access.systemType')]), trigger: 'change'}],
            regSystemDesc: [{required: true, message: this.$t('placeholder.default', [this.$t('access.systemDesc')]), trigger: 'blur'}]
          }
        }
      }
    },
    watch: {
      data: function (newVal, oldVal) {
        if (newVal) {
          this.handleClear();
          this.data = newVal;
        }
      },
      operator: function(newVal, oldVal){
        if (newVal == 'add') {
          this.leftDisabledCtrl = true;
          this.rightDisabledCtrl = true;
        }
      }
    },
    methods: {
      // 排序
      compare(property) {
        return function(a, b) {
          return a[property] > b[property];
        }
      },

      // 向右添加
      addRight() {
        this.permissionSourceList.forEach((item, index) => {
          this.leftCheckedList.forEach(val => {
            if (this.permissionSourceList[index].key == val) {
              this.data.systemLimits.push({key: this.permissionSourceList[index].key,
                label: this.permissionSourceList[index].label,
                disabled: this.permissionSourceList[index].disabled,
                interfaceType: 'B',
                dataPerTime: '',
                dataPerTimeUnit: ''});
              this.permissionSourceList.splice(index, 1);
            }
          });
        });
        this.permissionSourceList.sort(this.compare('label'));
        this.data.systemLimits.sort(this.compare('label'));
      },

      // 向左添加
      addLeft() {
        this.data.systemLimits.forEach((item, index) => {
          this.rightCheckedList.forEach(val => {
            if (this.data.systemLimits[index].key == val) {
              this.permissionSourceList.unshift({key: this.data.systemLimits[index].key,
                label: this.data.systemLimits[index].label,
                disabled: this.data.systemLimits[index].disabled});
              this.data.systemLimits.splice(index, 1);
            }
          });
        });
        this.permissionSourceList.sort(this.compare('label'));
        this.data.systemLimits.sort(this.compare('label'));
      },

      // 按钮颜色改变
      disabledChanged(data) {
        if (data[0] == this.titles[0]) {
          this.rightDisabledCtrl = !data[1].length > 0;
          this.leftCheckedList = data[1];
        } else if (data[0] == this.titles[1]) {
          this.leftDisabledCtrl = !data[1].length > 0;
          this.rightCheckedList = data[1];
        }
      },

      // 获取传递过来的数据
      getCurrentRowData(data) {
        this.initCurrentRow = Object.assign({}, data);
      },

      // 查询所有接口名称
      queryInterfaceList() {
        this.$service.get('/interface/interfaceInfo', {params: {offset: 0, limit: 10000, interfaceType: 'B'}})
          .then(r => {
            if (r.data.code === '000000') {
              this.permissionSourceList = [];
              r.data.data.rows.forEach((item, index) => {
                this.data.systemLimits.forEach((val) => {
                  if (r.data.data.rows[index].interfaceId === val.key) {
                    r.data.data.rows.splice(index, 1);
                  }
                });
              });
              if (this.operator == 'add' || this.operator == 'edit') {
                r.data.data.rows.forEach((item) => {
                  this.permissionSourceList.push({label: item.interfaceName, key: item.interfaceId, disabled: false});
                });
              } else if (this.operator == 'view') {
                r.data.data.rows.forEach((item) => {
                  this.permissionSourceList.push({label: item.interfaceName, key: item.interfaceId, disabled: true});
                })
              }
              this.permissionSourceList.sort(this.compare('label'));
            }
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: this.$t('text.failure') + err.data.msg,
              type: 'error'
            });
          });
      },

      // 清空验证
      handleClear() {
        this.$refs.accessEditForm.clearValidate();
      },

      // 取消功能
      handleCancel() {
        this.$refs.accessEditForm.clearValidate();
        Object.assign(this.$options.propsData.data, this.initCurrentRow);
        this.$emit('closeDialog', false);
      },

      // 确认提交功能
      handleSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.operator == "edit") {
              this.accessEdit();
            } else {
              this.accessAdd();
            }
          } else {
            return false;
          }
        });
      },

      // 添加功能
      accessAdd() {
        this.permissionTargetList = [];
        if (this.data.systemLimits.length != 0) {
          for(var i = 0; i < this.data.systemLimits.length; i++) {
            delete this.data.systemLimits[i].disabled;
            delete this.data.systemLimits[i].label;
            this.permissionTargetList.push({"authorizedInterface": this.data.systemLimits[i].key,
                "interfaceType": this.data.systemLimits[i].interfaceType,
                "dataPerTime": this.data.systemLimits[i].dataPerTime,
                "dataPerTimeUnit": this.data.systemLimits[i].dataPerTimeUnit});
            delete this.data.systemLimits[i].key;
          }
        }
        this.$service.post('/req/systemLimits', {reqSystemReg: this.data.reqSystemReg, systemLimits: this.permissionTargetList})
          .then(r => {
            if (r.data.code === '000000') {
              this.handleCancel();
              this.$emit('loadData');
              this.$message({
                showClose: true,
                message: this.$t('text.success'),
                type: 'success'
              })
            } else {
              this.$message({
                showClose: true,
                message: r.data.msg,
                type: 'error'
              })
            }
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
      },

      // 编辑功能
      accessEdit() {
        this.permissionTargetList = [];
        if (this.data.systemLimits.length != 0) {
          for(var i = 0; i < this.data.systemLimits.length; i++) {
            delete this.data.systemLimits[i].disabled;
            delete this.data.systemLimits[i].label;
            this.permissionTargetList.push(
              {"authorizedInterface": this.data.systemLimits[i].key,
                "interfaceType": this.data.systemLimits[i].interfaceType,
                "dataPerTime": this.data.systemLimits[i].dataPerTime,
                "dataPerTimeUnit": this.data.systemLimits[i].dataPerTimeUnit});
            delete this.data.systemLimits[i].key;
          }
        }
        this.$service.put('/req/systemLimits', {reqSystemReg: this.data.reqSystemReg, systemLimits: this.permissionTargetList})
          .then(r => {
            if (r.data.code === '000000') {
              this.handleCancel();
              this.$emit('loadData');
              this.$message({
                showClose: true,
                message: this.$t('text.success'),
                type: 'success'
              })
            } else {
              this.$message({
                showClose: true,
                message: r.data.msg,
                type: 'error'
              })
            }
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-transfer > .el-transfer-panel {
    width: 30% !important;
  }

  /deep/ .el-transfer__buttons {
    padding: 0 4px !important;
  }

  /deep/ .el-transfer__buttons > .el-button:focus, .el-transfer__buttons > .el-button:hover {
    color: #fff !important;
    background-color: #66b1ff !important;
  }

  /deep/ .el-transfer__buttons > .is-disabled:focus, .el-transfer__buttons > .is-disabled:hover {
    color: #c0c4cc !important;
    background-color: #f5f7fa !important;
  }
</style>
