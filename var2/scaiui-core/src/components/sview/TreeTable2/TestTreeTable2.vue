<template>
  <div>
    <!-- <el-tree
       :data="data5"
       show-checkbox
       node-key="id" height="30"
       default-expand-all
       :expand-on-click-node="false">
         <span class="custom-tree-node" slot-scope="{ node, data }">
             <el-select size="20" path="YN" v-model="data.value"></el-select>
             <el-input size="small" v-model="data.label" placeholder="标题"></el-input>
             <el-button
               type="text"
               size="mini"
               @click="() => append(node,data)">
               添加同级
             </el-button>
             <el-button
               type="text"
               size="mini"
               @click="() => appendChildren(node,data)">
               添加下级
             </el-button>
             <el-button
               type="text"
               size="mini"
               @click="() => remove(node, data)">
               Delete
             </el-button>
         </span>
     </el-tree>-->
    <sTreeTable2 :data="data5" expand-all ref="msgTreeTableRef">
      <el-table-column :label="$t('interface.dcType')" width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.value"
                    :placeholder="$t('placeholder.select',[$t('interface.dcType')])" clearable></el-input>
        </template>
      </el-table-column>
      <el-table-column :label="$t('interface.dcType')" width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.label"
                    :placeholder="$t('placeholder.select',[$t('interface.dcType')])" clearable></el-input>
        </template>
      </el-table-column>
      <el-table-column :label="$t('action')" min-width="90px">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="addRoot()" v-show="scope.$index==0"
                     class="el-icon-plus"></el-button>
          <el-button type="text" size="mini" @click="addChildren(scope.row)" class="el-icon-circle-plus"
          ></el-button>
          <el-button type="text" size="mini" class="el-icon-remove" @click="removeRow(scope.row)"
                     v-show="scope.$index>0"></el-button>
        </template>
      </el-table-column>
    </sTreeTable2>
    {{this.data5}}
  </div>
</template>

<script>
  import TreeTable2 from './TreeTable2'

  export default {
    name: "TestTreeTable2",
    data() {
      return {
        data5: [{label: '陕西', value: 'shanxi', children: [{label: '西安', value: 'xian'}]}, {
          label: '四川',
          value: 'sichuan',
          children: [{label: '成都', value: 'chengdu'}]
        }]
      }
    },
    components: {TreeTable2},
    methods: {
      addRoot: function () {
        /* this.$TableUtil.appendRoot(this.data5, {
           "value": '',
           "label": ''
         });*/

        if (!this.data5) {
          this.data5 = [];
        }
        this.data5.push({
          "value": '',
          "label": ''
        });
      },
      addChildren: function (row) {
        /*    this.$TableUtil.append(row, {
              "value": '',
              "label": ''
            })*/

        if (!row.children) {
          this.$set(row, "children", []);
        }
        row.children.push({
          "value": '',
          "label": ''
        });
      },
      removeRow: function (row) {
        //let parent = this.$TableUtil.removeRow(this.data5, row);
        let parent = this.$TableUtil.getParentArray(this.data5, row);
        if (parent) {
          let i = parent.indexOf(row);
          parent.splice(i, 1);
        }
      }
    }
  }
</script>

<style scoped>

</style>
