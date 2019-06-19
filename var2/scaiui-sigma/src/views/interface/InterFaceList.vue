<template>
  <div>
    <!--列表条件-->
    <el-row type="flex" justify="left">
      <el-form label-position="right" :inline="true" ref="interfaceQueryForm" style="width: 100%;">
        <sFormItem3 :label="$t('interface.interfaceName')">
          <el-input v-model="interfaceName" :placeholder="$t('placeholder.default',[$t('interface.interfaceName')])" clearable></el-input>
        </sFormItem3>
        <sFormItem3 :label="$t('interface.status')">
          <sSelect v-model="interfaceStatus" :placeholder="$t('placeholder.select',[$t('interface.status')])" option="STATUS" clearable></sSelect>
        </sFormItem3>
        <sFormItem3 :label="$t('interface.reqType')">
          <sSelect v-model="interfaceReqType" option="REQ_METHOD" :placeholder="$t('placeholder.select',[$t('interface.reqType')])" clearable></sSelect>
        </sFormItem3>
        <sFormItem label-width="0px" style="width: 199%;text-align: right;">
          <el-button class="baseBlue" @click="loadData(1)">{{$t('query')}}</el-button>
          <el-button class="baseBlue" @click="handleReset('interfaceQueryForm')">{{$t('reset')}}</el-button>
          <el-button class="baseGreen" v-permission="'add','添加'" @click="handleAdd">{{$t('add')}}</el-button>
          <el-button class="baseRed" :disabled="selectedIds.length === 0" v-permission="'dels','删除(批量)'" @click="handleDeleteMutil">{{$t('delete')}}</el-button>
        </sFormItem>
      </el-form>
    </el-row>
    <!--列表主体-->
    <div>
      <el-row>
        <el-table ref="multipleTable" :data="data.rows" tooltip-effect="light" style="width: 100%"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column type="index" :label="$t('number')" width="80">
            <template slot-scope="scope">{{(scope.$index+1) + (offset-1) * limit}}</template>
          </el-table-column>
          <el-table-column width="200" :label="$t('interface.interfaceName')" prop="interfaceName" show-overflow-tooltip></el-table-column>
          <el-table-column width="90" :label="$t('interface.status')" show-overflow-tooltip>
            <template slot-scope="scope">
              <sText option="STATUS" v-model="scope.row.status"></sText>
            </template>
          </el-table-column>
          <el-table-column :label="$t('interface.reqType')" show-overflow-tooltip>
            <template slot-scope="scope">
              <sText option="REQ_METHOD" v-model="scope.row.reqType"></sText>
            </template>
          </el-table-column>
          <el-table-column width="110" :label="$t('interface.querisNum')" prop="querisNum" show-overflow-tooltip></el-table-column>
          <el-table-column width="180" :label="$t('interface.interfaceDesc')" prop="interfaceDesc" show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('action')" min-width="90px">
            <template slot-scope="scope">
              <el-button type="text" v-permission="'view','查看'" @click="handleView(scope.row.interfaceId)">{{$t('view')}}</el-button>
              <el-button type="text" v-permission="'edit','编辑'" @click="handleEdit(scope.row.interfaceId)">{{$t('edit')}}</el-button>
              <el-button type="text" v-permission="'del','删除'" @click="handleDelete(scope.row.interfaceId)">{{$t('delete')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <br>
      <el-row type="flex" justify="end" v-if="data.totalCount">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="offset"
          :page-size="limit"
          :page-sizes="$defaultPageSizes"
          layout="total, sizes, prev, pager, next"
          :total="data.totalCount">
        </el-pagination>
      </el-row>
    </div>
    <!--模态框-->
    <el-row>
      <el-dialog :title="dialogTitle[operator]" :visible.sync="dialogIsVisible" width="80%"
                 :close-on-click-modal="false" :before-close="handleClose" @close="closeModal" @opened="openModal">
        <InterFaceEdit ref="interfaceRef" v-model="dialogIsVisible" :operator="operator" :interfaceId="interfaceId"
                       @loadData="loadData" @closeModal="closeModal">
        </InterFaceEdit>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
  import InterFaceEdit from './InterFaceEdit'

  export default {
    name: "InterFaceList",
    components: { InterFaceEdit },
    data() {
      return {
        interfaceName: '',        // 条件—接口名称
        interfaceStatus: '',      // 条件—状态
        interfaceReqType: '',     // 条件—请求方式
        limit: this.$pageSize,
        selectedIds: [],
        operator: 'view',
        offset: 0,
        dialogFormVisible: false,
        dialogIsVisible: false,
        data: {},
        reqType: '',
        transferRes: [],
        transferListData: [],
        params: {},
        interfaceId: '',
        folderList: [],
        dialogTitle: {
          "edit": this.$t('interface.$title', [this.$t('edit')]),
          "add": this.$t('interface.$title', [this.$t('add')]),
          "view": this.$t('interface.$title', [this.$t('view')]),
        },
        serviceIdList: []   // 服务列表下拉框项
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      // 关闭模态框
      closeModal() {
        this.$refs.interfaceRef.handleClear();
        this.dialogIsVisible = false;
      },

      // 打开模态框
      openModal() {
        this.$refs.interfaceRef.handleClear();
        this.$refs.interfaceRef.getServiceIdList();
        this.$refs.interfaceRef.getInnerInterFaceInfo();
      },

      // 关闭模态框之前事件
      handleClose() {
        this.$refs.interfaceRef.activeName = 'first';
        this.dialogIsVisible = false;
      },

      // 每页显示条数变化
      handleSizeChange(val) {
        this.limit = val;
        this.loadData(1);
      },

      // 点击翻页时处理
      handleCurrentChange(val) {
        this.offset = val;
        this.loadData(1);
      },

      // 分页查询列表数据
      loadData(index) {
        if (index !== 1) {
          this.interfaceName = '';
          this.interfaceStatus = '';
          this.interfaceReqType = '';
        }
        this.params = Object.assign({
          limit: this.limit,
          offset: this.offset,
          interfaceType: 'A',
          interfaceName: this.interfaceName,
          status: this.interfaceStatus,
          reqType: this.interfaceReqType,
        });
        this.$service.get('/interface/interfaceInfo', {params: this.params})
          .then(r => {
            if (r.data.code === '000000') {
              this.data = r.data.data;
            } else {
              this.$message({
                showClose: true,
                message: r.data.msg,
                type: 'error'
              });
            }
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          });
      },

      // 重置功能
      handleReset(name) {
        this.$refs[name].resetFields();
        this.interfaceName = '';
        this.interfaceStatus = '';
        this.interfaceReqType = '';
        this.offset = 1;
        this.loadData();
      },

      // 单笔删除
      handleDelete(id) {
        this.$confirm(this.$t('confirm.delete'), this.$t('confirm.title'), {
          distinguishCancelAndClose: true,
          confirmButtonText: this.$t('ok'),
          cancelButtonText: this.$t('cancel'),
          iconClass: 'el-icon-delete'
        }).then(() => {
          this.$service.delete('/interface/inter/' + id)
            .then(r => {
              if (r.data.code === '000000') {
                this.loadData();
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
                });
              }
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: err,
                type: 'error'
              });
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('cancelled')
          });
        });
      },

      // 将选中的id存到ids中
      handleSelectionChange(val) {
        this.selectedIds = [];
        val.forEach((item) => {
          this.selectedIds.push(item.interfaceId)
        });
      },

      // 多条删除
      handleDeleteMutil() {
        this.$confirm(this.$t('confirm.delete'), this.$t('confirm.title'), {
          distinguishCancelAndClose: true,
          confirmButtonText: this.$t('ok'),
          cancelButtonText: this.$t('cancel'),
          iconClass: 'el-icon-delete'
        }).then(() => {
          this.$service.delete('/interface/inter/', {data: this.selectedIds})
            .then(r => {
              if (r.data.code === '000000') {
                this.loadData();
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
                });
              }
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: err,
                type: 'error'
              });
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('cancelled')
          });
        });
      },

      // 添加功能
      handleAdd() {
        this.operator = "add";
        this.interfaceId = null;
        this.dialogIsVisible = true;
        this.$nextTick(() => {
          this.$refs.interfaceRef.getServiceIdList();
        });
      },

      // 查看功能
      handleView(id) {
        this.operator = "view";
        this.interfaceId = id;
        this.dialogIsVisible = true;
      },

      // 编辑功能
      handleEdit(id) {
        this.operator = "edit";
        this.interfaceId = id;
        this.dialogIsVisible = true;
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-form--inline .el-form-item {
    margin-right: 0 !important;
  }
</style>
