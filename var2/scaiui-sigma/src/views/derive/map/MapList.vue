<template>
  <div>
    <!--查询条件-->
    <el-row type="flex" justify="left">
      <el-form label-position="right" :inline="true" style="width: 100%;">
        <sFormItem3 :label="$t('map.mapCode')">
          <el-input v-model="mapCode" :placeholder="$t('placeholder.default',[$t('map.mapCode')])" clearable></el-input>
        </sFormItem3>
        <sFormItem3 :label="$t('map.targetDesc')">
          <el-input v-model="targetDesc" :placeholder="$t('placeholder.default',[$t('map.targetDesc')])" clearable></el-input>
        </sFormItem3>
        <sFormItem3 :label="$t('map.mapExplain')">
          <el-input v-model="mapExplain" :placeholder="$t('placeholder.default',[$t('map.mapExplain')])" clearable></el-input>
        </sFormItem3>
        <div style="width: 100%; margin-bottom: 18px; text-align: right;">
          <el-button class="baseBlue" @click="loadData(1)">{{$t('query')}}</el-button>
          <el-button class="baseBlue" @click="handleReset">{{$t('reset')}}</el-button>
          <el-button class="baseGreen" v-permission="'add','添加'" @click="handleAdd">{{$t('add')}}</el-button>
          <el-button class="baseRed" :disabled="selectedIds.length === 0" v-permission="'dels','删除(批量)'" @click="handleDeleteMutil">{{$t('delete')}}</el-button>
        </div>
      </el-form>
    </el-row>
    <!--主体-->
    <el-row>
      <el-table style="width: 100%" :data="data.rows" @selection-change="handleSelectionChange" tooltip-effect="light">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column :label="$t('number')" type="index" width="80"></el-table-column>
        <el-table-column prop="dataCode" :label="$t('map.mapCode')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="dataSource" :label="$t('map.source')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="dataTarget" :label="$t('map.target')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="dataDesc" :label="$t('map.targetDesc')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="mapDesc" :label="$t('map.mapExplain')" show-overflow-tooltip width="200"></el-table-column>
        <el-table-column :label="$t('fee.operation')" show-overflow-tooltip min-width="90px">
          <template slot-scope="scope">
            <el-button type="text" v-permission="'view','查看'" @click="handleView(scope.row)">{{$t('view')}}</el-button>
            <el-button type="text" v-permission="'edit','编辑'" @click="handleEdit(scope.row)">{{$t('edit')}}</el-button>
            <el-button type="text" v-permission="'del','删除'" @click="handleDelete(scope.row.dataId)">{{$t('delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <br>
    <!--分页-->
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
      <el-dialog :title="dialogTitle[operator]" :visible.sync="dialogIsVisible" width="80%" :close-on-click-modal="false" @close="closeModal">
        <MapView ref="mapViewRef" :currentRow="currentRow" :operator="operator" @loadData="loadData" @closeModal="closeModal"></MapView>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
  import MapView from './MapView'

  export default {
    name: "MapList",
    components: { MapView },
    data() {
      return {
        mapCode: '',
        targetDesc: '',
        mapExplain: '',
        data: {},
        offset: 0,
        limit: this.$pageSize,
        selectedIds: [],
        dialogIsVisible: false,
        currentRow: {},
        operator: 'view',
        dialogTitle: {
          "add": this.$t('map.$title', [this.$t('add')]),
          "edit": this.$t('map.$title', [this.$t('edit')]),
          "view": this.$t('map.$title', [this.$t('view')])
        }
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      // 关闭模态框
      closeModal() {
        this.$refs.mapViewRef.handleClose();
        this.dialogIsVisible = false;
      },

      // 分页查询
      loadData(index) {
        if (index !== 1) {
          this.mapCode = '';
          this.targetDesc = '';
          this.mapExplain = '';
        }
        this.params = Object.assign({
          limit: this.limit,
          offset: this.offset,
          dataCode: this.mapCode,
          dataDesc: this.targetDesc,
          mapDesc: this.mapExplain
        });
        this.$service.get('/system/datadicmapping', {params: this.params}).then(r => {
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
      handleReset() {
        this.offset = 1;
        this.loadData();
      },

      // 添加功能
      handleAdd() {
        this.operator = "add";
        this.currentRow = {
          row: [{}]
        };
        this.dialogIsVisible = true;
      },

      // 查看功能
      handleView(rowData) {
        this.operator = "view";
        this.currentRow = {
          row: []
        };
        this.currentRow.row.push(rowData);
        this.dialogIsVisible = true;
      },

      // 编辑功能
      handleEdit(rowData) {
        this.operator = "edit";
        this.currentRow = {
          row: []
        };
        this.currentRow.row.push(rowData);
        this.dialogIsVisible = true;
      },

      // 将选中的id存到ids中
      handleSelectionChange(val){
        this.selectedIds = [];
        val.forEach((item) => {
          this.selectedIds.push(item.dataId);
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
          this.$service.delete('/system/datadicmapping/', {data: this.selectedIds})
            .then(r => {
              if (r.data.code === '000000') {
                this.loadData();
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

      // 单条删除
      handleDelete(id) {
        this.$confirm(this.$t('confirm.delete'), this.$t('confirm.title'), {
          distinguishCancelAndClose: true,
          confirmButtonText: this.$t('ok'),
          cancelButtonText: this.$t('cancel'),
          iconClass: 'el-icon-delete'
        }).then(() => {
          this.$service.delete('/system/datadicmapping/' + id)
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

      // 每页显示条数变化
      handleSizeChange(val) {
        this.limit = val;
        this.loadData(1);
      },

      // 翻页时处理
      handleCurrentChange(val) {
        this.offset = val;
        this.loadData(1);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
