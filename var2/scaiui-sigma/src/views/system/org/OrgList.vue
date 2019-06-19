<template>
  <div>
    <!--列表主体-->
    <br>
    <sTreeTable2 :data="data" expand-all border>
      <el-table-column :label="$t('org.orgName')" prop="orgName"></el-table-column>
      <el-table-column :label="$t('org.orgCode')" prop="orgCode"></el-table-column>
      <el-table-column :label="$t('org.orgLevel')" prop="orgGrade">
        <template slot-scope="scope">
          <sText option="ORG_GRADE" v-model="scope.row.orgLevel"></sText>
        </template>
      </el-table-column>
      <el-table-column :label="$t('org.status')" prop="status">
        <template slot-scope="scope">
          <sText option="STATUS" v-model="scope.row.status"></sText>
        </template>
      </el-table-column>
      <el-table-column :label="$t('action')" min-width="90px">
        <template slot-scope="scope">
          <el-button type="text" v-permission="'view','查看'" @click="handleView(scope.row)">{{$t('view')}}</el-button>
          <el-button type="text" v-permission="'edit','编辑'" @click="handleEdit(scope.row)">{{$t('edit')}}</el-button>
          <el-button type="text" v-permission="'add','添加'" @click="handleAdd(scope.row.orgCode)">{{$t('add')}}
          </el-button>
          <el-button type="text" v-permission="'del','删除'" @click="handleDelete(scope.row.orgId)">{{$t('delete')}}</el-button>
        </template>
      </el-table-column>
    </sTreeTable2>
    <!--新增编辑查看-->
    <div>
      <el-row>
        <el-dialog :title="dialogTitle[operator]" :visible.sync="dialogIsVisible" width="60%" :close-on-click-modal="false">
          <OrgEdit v-model="dialogIsVisible" :operator="operator" :data="currentRow" @loadData="loadData"></OrgEdit>
        </el-dialog>
      </el-row>
    </div>
  </div>
</template>

<script>
    import OrgEdit from './OrgEdit'

    export default {
      name: "OrgList",
      components: {OrgEdit},
      data() {
        return {
          limit: this.$pageSize,
          operator: 'view',
          offset: 1,
          dialogFormVisible: false,
          dialogIsVisible: false,
          data: [],
          params:{},
          currentRow: {},
          dialogTitle: {
            "edit": this.$t('org.$title', [this.$t('edit')]),
            "add": this.$t('org.$title', [this.$t('add')]),
            "view": this.$t('org.$title', [this.$t('view')])
          }
        }
      },
      mounted() {
        this.loadData();
      },
      methods: {
        // 分页查询列表数据
        loadData(shadow = {}) {
          this.params = Object.assign({}, shadow||this.params);
          this.$service.get('/system/orgs/0/tree', {params: this.params})
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

        // 每页显示条数变化
        handleSizeChange(val) {
          this.limit = val;
          this.loadData();
        },

        // 添加
        handleAdd(val) {
          this.operator = "add";
          this.dialogIsVisible = val;
          this.currentRow = {"parentOrgCode": val, status:'1',orgCategory:'01',orgGrade:'0',isLeaf:'1'};
        },

        // 点击翻页时处理
        handleCurrentChange(val) {
          this.offset = val;
          this.loadData();
        },

        // 查看
        handleView(rowData) {
          this.operator = "view";
          this.dialogIsVisible = true;
          this.currentRow = rowData;
        },

        // 编辑
        handleEdit(rowData) {
          this.operator = "edit";
          this.dialogIsVisible = true;
          this.currentRow = rowData;
        },

        // 单笔删除
        handleDelete(id) {
          this.$confirm(this.$t('confirm.delete'), this.$t('confirm.title'), {
            distinguishCancelAndClose: true,
            confirmButtonText: this.$t('ok'),
            cancelButtonText: this.$t('cancel'),
            iconClass: 'el-icon-delete'
          }).then(() => {
            this.$service.delete('/system/orgs/'+id)
              .then(r => {
                if (r.data.code === '000000') {
                  this.loadData();
                  this.$message({
                    showClose: true,
                    message: this.$t('text.success'),
                    type: 'success'
                  });
                } else {
                  this.$message({
                    showClose: true,
                    message: r.data.msg,
                    type: 'error'
                  });
                }
              }).catch(err => {
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
        }
      }
    }
</script>

<style lang="scss" scoped>

</style>
