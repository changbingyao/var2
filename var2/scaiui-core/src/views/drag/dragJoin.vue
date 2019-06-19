<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="2">
        <div class="drage-box">
          <sTrageBox v-model="items1"></sTrageBox>
        </div>
      </el-col>
      <el-col :span="22">
        <sDragJoin ></sDragJoin>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'join',
    data () {
      return {
        blocks: [
          {
            x: 0,
            y: 0,
            w: 100,
            h: 30,
          },
          {
            x: 70,
            y: 30,
            w: 300,
            h: 90,
          },
          {
            x: 50,
            y: 69,
            w: 200,
            h: 300,
          },
        ],
        droppedItem: [],
        items1: [
          {
            id: 1,
            label: '饼图',
            name: 'PieChart',
            data: {}
          },
          {
            id: 1,
            label: '饼图',
            name: 'PieChart',
            data: {}
          }
        ]
      }
    },
    methods: {
      drop (event) {

        // let newA = this.value.concat([JSON.parse(event.dataTransfer.getData('text'))])
        console.log('newA', JSON.parse(event.dataTransfer.getData('text')))
        // this.$emit('change', newA)
        // event.dataTransfer.clearData()
      },
      onResize: function (x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
      },
      onDrag: function (x, y) {
        this.x = x
        this.y = y
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
      // const opedMenuId = 0
      // this.$refs.asideMenu.openMenu(opedMenuId)
    },
    computed: {
      user() {
        // return this.$store.state.auth.data.user || {}
      },
      permissions() {
        // return this.$store.getters.permissions || {}
      }
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

  .drop-box {
    height: calc(100vh - 100px);
    padding: 1rem;
    border: 1px solid #000;
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





