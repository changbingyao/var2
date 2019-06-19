<template>
  <div>
    <cus-tree
      :load="load"
      :lazy="lazy"
      :props="props"
      node-key="id"
      draggable
      @dragstart.native.prevent="dragstart"
      @handleDragStart="handleDragStart"/>
    <!--@node-drag-start.self="nodeDragstart"-->
    <!--@node-drag-end.self="nodeDragend"-->
    <!--@node-drag-over="nodeDragover"-->
    <!--@node-drag-leave="nodeDragleave"-->
    <!--@node-drag-enter.capture="nodeDragenter"-->
  </div>
</template>

<script>
  import cusTree from  './elTree/src/tree'
  export default{
    name: "tree",
    props: {
      data: {
        type: Array
      },
      load: Function,
      lazy: Boolean,
      props: Object
    },
    components: {
      cusTree
    },
    extends: {
      mixins: cusTree
    },
    data() {
      return {}
    },
    methods: {
      handleDragStart(val) {
        console.log('handleDragStart99', val)
        this.$emit('drag-event', val)
      },
      dragstart($event, item, index) {
        console.log('dragstart', $event, item, index)
        this.$emit('handleDragend')
      },
      nodeDragstart($event, item, index) {
        console.log('nodeDragstart', $event, item, index)
      },
      nodeDragend($event, item, index) {
        console.log('nodeDragsend', $event, item, index)

      },
      nodeDragover($event, item, index) {
        console.log('nodeDragover', $event, item, index)
        return false
      },
      nodeDragleave($event, item, index) {
        console.log('nodeDragleave', $event, item, index)
      },
      nodeDragenter($event, item, index) {
        console.log('nodeDragenter', $event, item, index)
        return false
      },
    }
  }
</script>

<style scoped>

</style>
