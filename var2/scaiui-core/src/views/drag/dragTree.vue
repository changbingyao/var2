<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="drage-box">
            <DragTree></DragTree>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="drage-box">
          <sTrageBox v-model="items1"></sTrageBox>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
      name: "tree",
      data() {
        return {
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
          treeData: [{
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
              label: '二级 3-2',
              children: [{
                id: 11,
                label: '三级 3-2-1'
              }, {
                id: 12,
                label: '三级 3-2-2'
              }, {
                id: 13,
                label: '三级 3-2-3'
              }]
            }]
          }]

        }
      },
      methods: {
        handleDragStart(node, ev) {
          console.log('drag start', node);
        },
        handleDragEnter(draggingNode, dropNode, ev) {
          console.log('tree drag enter: ', dropNode.label);
        },
        handleDragLeave(draggingNode, dropNode, ev) {
          console.log('tree drag leave: ', dropNode.label);
        },
        handleDragOver(draggingNode, dropNode, ev) {
          console.log('tree drag over: ', dropNode.label);
        },
        handleDragEnd(draggingNode, dropNode, dropType, ev) {
          console.log('tree drag end: ', dropNode && dropNode.label, dropType);
        },
        handleDrop(draggingNode, dropNode, dropType, ev) {
          console.log('tree drop: ', dropNode.label, dropType);
        },
        allowDrop(draggingNode, dropNode, type) {
          if (dropNode.data.label === '二级 3-1') {
            return type !== 'inner';
          } else {
            return true;
          }
        },
        allowDrag(draggingNode) {
          return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
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
