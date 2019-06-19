<template>
  <div class="cell el-tooltip" style="padding-left: 0px;">
    {{textLabel}}
  </div>
</template>

<script>
  //import Axios from "axios"

  //Axios.defaults.baseURL = '/api';
  export default {
    name: "sText",
    data() {
      return {
        label: ''
      };
    },
    props: {
      option: {type: [String, Array]},
      value: {type: [Object, String]},
    },
    mounted() {
      this.loadData();
    },
    computed: {
      textLabel: function () {
        return this.label;
      }
    }
    ,
    methods: {
      loadData() {
        let optionData = null;
        if (this.option && typeof this.option === 'string') {
          let list = window.sessionStorage.getItem('_DICT_' + this.$i18n.locale + "_" + this.option);
          if (list) {
            optionData = JSON.parse(list);
            for (let i = 0; i < optionData.length; i++) {
              let e = optionData[i];
              if (e.value === this.value) {
                this.label = e.label;
                return;
              }
            }
            this.label = this.value;
          } else {
            this.$service.get(`/plist/${this.option}`, {params: {locale: this.$i18n.locale}}).then(r => {
              optionData = r.data.data;
              window.sessionStorage.setItem('_DICT_' + this.$i18n.locale + "_" + this.option, JSON.stringify(r.data.data));
              for (let i = 0; i < optionData.length; i++) {
                let e = optionData[i];
                if (e.value === this.value) {
                  this.label = e.label;
                  return;
                }
              }
              this.label = this.value;
              return;
            }).catch(error => {});
          }
        } else {
          if (this.option) {
            this.option.forEach(e => {
              if (e.value === this.value) {
                this.label = e.label;
                return;
              }
            });
          } else {
            this.label = this.value;
            return;
          }
        }
      }
    },
    watch: {
      'value'(val, old) {
        this.loadData();
      }
    },
  }
</script>

<style scoped>

</style>
