<template>
    <div class="home">
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="field">
            <el-tree
              :data="data2"
              show-checkbox
              node-key="id"
              @check-change="getCheckedNodes"
              :props="defaultProps">
            </el-tree>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="field">
            <el-input v-model="inputData"></el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="field charts-panel">
            <div v-for="item in 16" class="chart-box"></div>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "charts",
        data() {
          return {
            inputData: '',
            data2: [{
              id: 1,
              label: '一级 1',
              children: [{
                id: 4,
                label: '二级 1-1',
                children: [{
                  id: 9,
                  label: '三级 1-1-1'
                }, {
                  id: 10,
                  label: '三级 1-1-2'
                }]
              }]
            }, {
              id: 2,
              label: '一级 2',
              children: [{
                id: 5,
                label: '二级 2-1'
              }, {
                id: 6,
                label: '二级 2-2'
              }]
            }, {
              id: 3,
              label: '一级 3',
              children: [{
                id: 7,
                label: '二级 3-1'
              }, {
                id: 8,
                label: '二级 3-2'
              }]
            }],
            defaultProps: {
              children: 'children',
              label: 'label'
            }
          }
        },
        methods: {
          getCheckedNodes(val) {
            console.log(val, this.inputData)
            this.inputData = val.label
            console.log(val, this.inputData)
          }
        }
    }
</script>

<style scoped lang="scss">
  .field {
    height: calc(100vh - 100px);
    background-color: #eee;
    padding: 1rem;
    margin-top: 1rem;


    .el-tree {
      background-color: #eee;
    }
  }

  .charts-panel {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .chart-box {
      height: 30px;
      width: 30px;
      background-color: indianred;
      margin: 10px;

    }

  }




</style>

