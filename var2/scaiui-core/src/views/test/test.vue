<template>
  <div class="home">
          <sPieChart  :chartHeight="200" :chartWidth="300" :tooltipStyle="tooltipStyle"/>
  </div>
</template>

<script>
  export default {
    name: 'drage',
    data () {
      return {
        droppedItem: [],
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
        items2: [],
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
    methods: {
      axiosTest() {
        console.log('$http', this.$http)
        this.$http.post('users', {userName: 'niyn', password: '000000'}).then(r => {
          console.log('user')
        })
      },
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
    mounted() {
      this.axiosTest()
      // const opedMenuId = 0
      // this.$refs.asideMenu.openMenu(opedMenuId)
    }
  }
</script>

<style scoped>

  .drag-field,
  .drop-field, .drage-box{
    height: calc(100vh - 100px);
    padding: 1rem;
    background-color: #eee;
    margin-top: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .tree-box {
    height: calc(100vh - 100px);
    background-color: #eee;
    padding: 1rem;
    margin-top: 1rem;
  }
  .el-tree {
    background-color: #eee;
  }

  .item{
    width: 30%;
    height: 3rem;
    text-align: center;
    line-height: 3rem;
    font-size: .9rem;
    background-color: royalblue;
    color: #eee;
  }
  .item:hover{
    cursor: pointer;
  }

</style>






