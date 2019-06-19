<template>
    <div class="exemple"><br><br>
      <!--列表功能-->
      <list-function :selectedIds="selectedIds"
                     @loadData="loadData"/><br>
      <!--列表主体-->
      <div>
        <el-row>
          <el-table
            ref="multipleTable"
            :data="userData.rows"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              type="index"
              width="55">
              <template slot-scope="scope">
                {{(scope.$index+1) + (currentPage-1) * pagelimit}}
              </template>
            </el-table-column>
            <el-table-column
              sortable
              label="日期"
              width="120"
              prop="crtDate">
              <template slot-scope="scope">
                {{scope.row.crtDate | dateFormate('YYYYMMDD')}}
              </template>
            </el-table-column>
            <el-table-column
              label="字段一"
              width="120"
              prop="userName">
            </el-table-column>
            <el-table-column
              prop="userCode"
              label="字段二"
              width="120">
            </el-table-column>
            <el-table-column
              prop="userId"
              label="字段三"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleCheck">详情</el-button>
                <el-button type="text" size="small" @click="handleEdit(true, scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row><br><br>
        <el-row type="flex" justify="end" v-if="userData.totalCount">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pagelimit"
            :page-sizes="[5, 10, 20, 30, 40]"
            layout="total, sizes, prev, pager, next"
            :total="userData.totalCount">
          </el-pagination>
        </el-row>
      </div>

      <!--新增编辑-->
      <div>
        <el-row>
          <el-dialog :title="isEdit ? '编辑用户' : '新增用户'" :visible.sync="dialogFormVisible" width="50%">
            <add-user v-model="dialogFormVisible"
                      :isEdit="isEdit"
                      @loadData="loadData"></add-user>
          </el-dialog>
        </el-row>
      </div>
    </div>
</template>

<script>
  import ListFunction from './components/ListFunction'
  import AddUser from './components/AddUser'
    export default {
      name: "SelectInput",
      components: {ListFunction, AddUser},
      data() {
        return {
          pagelimit: 10,
          selectedIds: [],
          isEdit: false,
          currentPage: 1,
          dialogFormVisible: false,
          dialogDetailVisible: false,
          userData: {},
          formLabelWidth: '120px'
        }
      },
      mounted() {
        this.loadData()
      },
      methods: {
        loadData(shadow = {}) {
          const userLimit = Object.assign({
            limit: this.pagelimit,
            offset: this.currentPage,
          }, shadow);
          this.$service.get('/system/users', {params: userLimit})
            .then(r => {
              if(r.data.code === '000000') {
                  this.userData = r.data.data
              }
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: '请求出错!' + err.data.msg,
                type: 'error'
              });
            })
        },
        handleSelectionChange(val) {
          this.selectedIds = [];
          val.map(item => {
            this.selectedIds.push(item.userId)
          })
          console.log('val', this.selectedIds)
        },
        handleSizeChange(val) {
          this.pagelimit = val
          this.loadData()
        },
        handleCurrentChange(val) {
          this.currentPage = val
          this.loadData()
        },
        handleCheck() {
          // this.dialogFormVisible =  true
        },
        handleEdit(isEdit, rowData) {
          this.dialogFormVisible =  true;
          this.isEdit = false
        }
      }
    }
</script>

<style scoped>

</style>
