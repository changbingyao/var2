<template>
  <div>
    <el-form ref="groupForm" :rules="rules" :model="currentRow">
      <el-row>
        <el-table :data="currentRow.row" style="width: 100%" tooltip-effect="light">
          <el-table-column :label="$t('number')" type="index" align="center" width="50"></el-table-column>
          <el-table-column :label="$t('group.groupCode')" show-overflow-tooltip align="center" width="150">
            <template slot-scope="scope">
              <el-form-item :prop="'row.' + scope.$index + '.dataCode'" :rules="rules.dataCode">
                <el-input v-model="scope.row.dataCode" :placeholder="$t('placeholder.default',[$t('group.groupCode')])" :disabled="operator == 'edit' || operator == 'view'"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column :label="$t('group.lower')" show-overflow-tooltip align="center" width="150">
            <template slot-scope="scope">
              <el-form-item :prop="'row.' + scope.$index + '.lowerLimit'" :rules="rules.lowerLimit">
                <el-input v-model="scope.row.lowerLimit" :placeholder="$t('placeholder.default',[$t('group.lower')])" :disabled="operator == 'view'"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column :label="$t('group.upper')" show-overflow-tooltip align="center" width="160">
            <template slot-scope="scope">
              <el-form-item :prop="'row.' + scope.$index + '.upperLimit'" :rules="rules.upperLimit">
                <el-input v-model="scope.row.upperLimit" :placeholder="$t('placeholder.default',[$t('group.upper')])" :disabled="operator == 'view'"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column :label="$t('map.target')" show-overflow-tooltip align="center" width="130">
            <template slot-scope="scope">
              <el-form-item :prop="'row.' + scope.$index + '.dataTarget'" :rules="rules.dataTarget">
                <el-input v-model="scope.row.dataTarget" :placeholder="$t('placeholder.default',[$t('map.target')])" :disabled="operator == 'view'"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column :label="$t('group.explain')" show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <el-form-item>
                <el-input v-model="scope.row.groupDesc" :placeholder="$t('placeholder.default',[$t('group.explain')])" :disabled="operator == 'view'"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column v-if="operator == 'add'" :label="$t('fee.operation')" show-overflow-tooltip width="90px" align="center">
            <template slot-scope="scope">
              <i @click="addRow(scope.$index)" class="el-icon-circle-plus" style="color: #0086FF; margin-right: 15px;"></i>
              <i v-show="currentRow.row.length > 1" @click="deleteRow(scope.$index)" class="el-icon-remove" style="color: #0086FF;"></i>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row style="margin-top: 20px;text-align: right;">
        <el-button class="baseGray" @click="handleCancel">{{$t('cancel')}}</el-button>
        <el-button v-show="operator!='view'" class="baseBlue" v-permission="'save','确定'" @click="handleSubmit('groupForm')">{{$t('ok')}}</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "GroupView",
    props: {
      operator: '',
      currentRow: {
        row: []
      }
    },
    data() {
      return {
        rules: {
          dataCode: [{required: true, message: this.$t('placeholder.default', [this.$t('group.groupCode')]), trigger: 'blur'}],
          lowerLimit: [{required: true, message: this.$t('placeholder.default', [this.$t('group.lower')]), trigger: 'blur'}],
          upperLimit: [{required: true, message: this.$t('placeholder.default', [this.$t('group.upper')]), trigger: 'blur'}],
          dataTarget: [{required: true, message: this.$t('placeholder.default', [this.$t('map.target')]), trigger: 'blur'}]
        }
      }
    },
    methods: {
      // 添加一行
      addRow(i) {
        this.currentRow.row.splice(i+1, 0, {
          dataCode: '',
          lowerLimit: '',
          upperLimit: '',
          dataTarget: '',
          groupDesc: ''
        });
      },

      // 删除一行
      deleteRow(i) {
        this.currentRow.row.splice(i, 1);
      },

      // 保存功能
      handleSubmit(formName) {
        this.$refs[formName].validate(valid => {
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
        this.$service.post('/data/groupMappings/listDataGroupMapping', JSON.stringify(this.currentRow.row))
          .then(r => {
            if (r.data.code === '000000') {
              this.handleCancel();
              this.$emit('loadData');
              this.$message({
                showClose: true,
                message: r.data.msg,
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
        this.$service.put('/data/groupMappings', this.currentRow.row[0])
          .then(r => {
            if (r.data.code === '000000') {
              this.handleCancel();
              this.$emit('loadData');
              this.$message({
                showClose: true,
                message: r.data.msg,
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

      // 取消功能
      handleCancel() {
        this.handleClose();
        this.$emit('closeModal');
        this.$emit('loadData');
      },

      // 清空校验
      handleClose() {
        this.$refs.groupForm.clearValidate();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-icon-circle-plus, .el-icon-remove {
    cursor: pointer;
  }
</style>
