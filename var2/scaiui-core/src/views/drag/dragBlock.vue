<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="input-box">
          <sTrageBox v-model="items"/>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="drage-box">
          <sTrageBox v-model="items1"></sTrageBox>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="drage-box">
          <sTrageBox v-model="items3" :itemStyle="item3Style"></sTrageBox>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'drage',
    data () {
      return {
        droppedItem: [],
        items: [{
          id: 1,
          label: '模块五'
        }],
        items1: [
          {
            id: 1,
            label: '模块一'
          },
          {
            id: 2,
            label: '模块二'
          },
          {
            id: 3,
            label: '模块三'
          }
        ],
        items3: [
          {
            id: 4,
            label: '模块四'
          },
        ],
        item1Style: {
          'font-size': '16px',
          'background-color': 'red',
          color: '#eee',
          padding: '5px 10px'
        },
        item3Style: {
          'font-size': '12px',
          'background-color': 'green',
          color: '#eee',
          padding: '5px 10px'
        },
        tooltipStyle:{
          border:'2px solid ',
          'font-size':'29px'
        },
        chartWidth:{
          width:400
        }
      }
    },
    mounted() {
    },
    methods: {
      rightDrop (event) {
        this.droppedItem.push(JSON.parse(event.dataTransfer.getData('text')))
        this.items.splice(JSON.parse(event.dataTransfer.getData('index')), 1)
        event.dataTransfer.clearData()
      },
      leftDrop (event) {
        this.items.push(JSON.parse(event.dataTransfer.getData('text')))
        this.droppedItem.splice(JSON.parse(event.dataTransfer.getData('index')), 1)
        event.dataTransfer.clearData()
      },
      dragstart (event, item, index) {
        event.dataTransfer.setData('text', JSON.stringify(item));
        event.dataTransfer.setData('index', JSON.stringify(index));
      },
      dragend (event) {
        event.dataTransfer.clearData()
      }
    },
  }
</script>

<style scoped lang="scss">
  .drage-box{
    height: calc(100vh - 100px);
    padding: 1rem;
    background-color: #eee;
    margin-top: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

    .input-box {
      margin-top: 1rem;
      height: 30px;
      width: 100%;
      background-color: indianred;
      overflow: hidden;
      padding: 10px;
    }
  .el-tree {
    background-color: #eee;
  }



</style>





