<template>
  <el-main>
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>添加设备</span>
      </div>
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
        class="form"
      >
        <el-form-item label="门店名称*">
          <el-input v-model="form.site_title" />
        </el-form-item>
        <el-form-item label="门店类型*">
          <el-input v-model="form.site_description" />
        </el-form-item>
        <el-form-item label="归属用户*">
          <el-input v-model="form.site_url" />
        </el-form-item>
        <el-form-item label="门店图片">
          <el-input v-model="form.icp" />
        </el-form-item>
        <el-form-item label="店主电话">
          <el-input v-model="form.icp" />
        </el-form-item>
        <el-form-item label="省市区">
          <el-input v-model="form.icp" />
        </el-form-item>
        <el-form-item label="一键导航">
          <el-input v-model="form.icp" />
        </el-form-item>
        <el-form-item label="门店描述">
          <el-input
            v-model="form.footer_info"
            type="textarea"
            rows="10"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >保存更改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-main>
</template>

<script>
import { config, save_config } from '@/api/device'

export default {
  data() {
    return {
      form: {}
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      config().then(res => {
        if (res.code === 20000) {
          this.form = res.data
        }
      })
    },
    onSubmit() {
      save_config(this.form).then(res => {
        if (res.code === 20000) {
          this.$notify({
            title: '提示',
            message: res.message,
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
  padding: 32px;
  position: relative;
}
.form {
  background: #fff;
  padding: 32px;
}
</style>
