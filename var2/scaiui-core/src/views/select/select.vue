<template>
  <div><br><br><br>
    <el-row>
      默认发送请求：
      <el-select v-model="testData"
                 @change="change"
                 path="YN"></el-select>
    </el-row>
    <br><br>
    <el-row>
      给定选项：
      <el-select v-model="testData"
                 @change="change"
                 :options="options"></el-select>
    </el-row>
  </div>
</template>

<script>
    export default {
      name: "selectView",
      data: function () {
        return {
          testData: [],
          options: [
            {value: "1", label: "test01", disabled: false},
            {value: "2", label: "test02", disabled: true},
            {value: "3", label: "test03", disabled: false},
            {value: "4", label: "test04", disabled: false}
          ]
        }
      },
      methods: {
        change(val) {
          console.log('change', val)
        }
      },
      watch: {

      },
    }
</script>

<style scoped>

</style>
