<template>
  <div>
    <!--头部条件-->
    <el-row style="margin: -4px 0 25px;">
      <div class="cost-el-form-item" style="width: 33%;">
        <label class="el-form-item__label">{{$t('interface.interfaceName')}}</label>
        <el-input style="width: 60%;" ref="msgInterfaceNameRef" v-model="msgInterfaceName" :placeholder="$t('placeholder.default',[$t('interface.interfaceName')])" class="el-form-item__content"></el-input>
      </div>
      <div class="cost-el-form-item" style="width: 33%;">
        <label class="el-form-item__label">{{$t('interface.status')}}</label>
        <sSelect style="width: 60%;display: inline-block;" ref="msgStatusRef" v-model="msgStatus" option="STATUS" :placeholder="$t('placeholder.select',[$t('interface.status')])"></sSelect>
      </div>
      <div class="cost-el-form-item" style="width:33%;text-align: right;">
        <el-button class="baseBlue" @click="loadData(1)">{{$t('query')}}</el-button>
        <el-button class="baseBlue" @click="handleReset">{{$t('reset')}}</el-button>
        <el-button class="baseGreen" v-permission="'add','添加'" @click="handleAdd">{{$t('add')}}</el-button>
        <el-button class="baseRed" :disabled="selectedIds.length === 0" v-permission="'dels','删除(批量)'" @click="handleDeleteMutil">{{$t('delete')}}</el-button>
      </div>
    </el-row>
    <!--列表主体-->
    <el-row>
      <el-table ref="multipleTable" :data="data.rows" tooltip-effect="light" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column type="index" :label="$t('number')" width="90">
          <template slot-scope="scope">
            {{(scope.$index+1) + (offset-1) * limit}}
          </template>
        </el-table-column>
        <el-table-column width="210" :label="$t('interface.interfaceName')" prop="interfaceName"
                         show-overflow-tooltip></el-table-column>
        <el-table-column :label="$t('interface.status')" prop="status" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.status === '1'">{{$t('interface.effective')}}</span>
            <span v-else-if="scope.row.status === '0'">{{$t('interface.invalid')}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('interface.querisNum')" prop="querisNum" show-overflow-tooltip></el-table-column>
        <el-table-column width="230" :label="$t('interface.interfaceDesc')" prop="interfaceDesc" show-overflow-tooltip></el-table-column>
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
    <!--新增编辑查看管理-->
    <el-row>
      <el-dialog class="msg_dialog" :title="dialogTitle[operator]" :visible.sync="dialogIsVisible" width="80%" :close-on-click-modal="false" @close="closeModal" @opened="openModal">
        <MsgEdit ref="msgEditRef" :operator="operator" :interFaceId="interFaceId" :pathItems="pathItems" @loadData="loadData" @closeModal="closeModal">
        </MsgEdit>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
  import MsgEdit from './MsgEdit'

  export default {
    name: "MsgList",
    components: { MsgEdit },
    data() {
      return {
        msgInterfaceName: '',     // 条件—接口名称
        msgStatus: '',            // 条件—状态
        limit: this.$pageSize,
        selectedIds: [],
        operator: 'view',
        offset: 0,
        dialogIsVisible: false,
        data: {},
        pathItems: [],
        pathItemsSerId: [],
        params: {},
        interFaceId: '',
        folderList: [],
        dialogTitle: {
          "edit": this.$t('interface.$title', [this.$t('edit')]),
          "add": this.$t('interface.$title', [this.$t('add')]),
          "view": this.$t('interface.$title', [this.$t('view')]),
        }
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      // 关闭模态框
      closeModal() {
        this.$refs.msgEditRef.handleClear();
        this.dialogIsVisible = false;
      },
      // 打开模态框
      openModal() {
        this.$refs.msgEditRef.handleClear();
        this.$refs.msgEditRef.getServiceIdList();
        this.$refs.msgEditRef.getInterfaceInfo();
        this.$refs.msgEditRef.getInterfaceNameList();
        this.$refs.msgEditRef.getOthTypeCodeList();
        this.$refs.msgEditRef.getOthTypeCodeListTwo();
        this.$refs.msgEditRef.getOthTypeCodeListThree();
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

      // 查询功能
      loadData(index) {
        if (index !== 1) {
          this.msgInterfaceName = '';
          this.msgStatus = '';
        }
        this.params = Object.assign({
          limit: this.limit,
          offset: this.offset,
          interfaceType: 'B',
          interfaceName: this.msgInterfaceName,
          status: this.msgStatus
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
          })
      },

      // 将选中的id存到ids中
      handleSelectionChange(val) {
        this.selectedIds = [];
        val.forEach((item) => {
          this.selectedIds.push(item.interfaceId);
        });
      },

      // 单条删除
      handleDelete(id) {
        this.$confirm(this.$t('confirm.delete'), this.$t('confirm.title'), {
          distinguishCancelAndClose: true,
          confirmButtonText: this.$t('ok'),
          cancelButtonText: this.$t('cancel'),
          iconClass: 'el-icon-delete'
        }).then(() => {
          this.$service.delete('/interface/inter/outData/' + id)
            .then(r => {
              if (r.data.code === '000000') {
                this.loadData();
                this.$message({
                  showClose: true,
                  message: this.$t('text.success'),
                  type: 'success'
                })
              }
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: this.$t('text.failure') + err.data.msg,
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

      // 多条删除
      handleDeleteMutil() {
        this.$confirm(this.$t('confirm.delete'), this.$t('confirm.title'), {
          distinguishCancelAndClose: true,
          confirmButtonText: this.$t('ok'),
          cancelButtonText: this.$t('cancel'),
          iconClass: 'el-icon-delete'
        }).then(() => {
          this.$service.delete('/interface/inter/delData', {data: this.selectedIds})
            .then(r => {
              if (r.data.code === '000000') {
                this.loadData();
                this.$message({
                  showClose: true,
                  message: this.$t('text.success'),
                  type: 'success'
                })
              }
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: this.$t('text.failure') + err.data.msg,
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
        this.dialogIsVisible = true;
        this.interFaceId = null;
      },

      // 重置功能
      handleReset() {
        this.msgInterfaceName = '';
        this.msgStatus = '';
        this.loadData(1);
      },

      // 查看功能
      handleView(id) {
        this.operator = "view";
        this.interFaceId = id;
        this.dialogIsVisible = true;
      },

      // 编辑功能
      handleEdit(id) {
        this.operator = "edit";
        this.interFaceId = id;
        this.dialogIsVisible = true;
      }
    }
  }
</script>

<style lang="scss">
  .msg_dialog .el-dialog__body {
    padding: 0 20px 20px !important;
  }

  .cost-el-form-item {
    display: inline-block;
  }
</style>
