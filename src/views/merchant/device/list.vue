<template>
  <div class="main">
    <el-card class="box-card">

      <div slot="header" class="clearfix">
        <span>设备列表</span>
        <span style="float:right">
          <router-link to="/merchant/device/add">
            <el-button type="primary">添加设备</el-button>
          </router-link>
        </span>
      </div>

      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column label="合作商户" width="200">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.company }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名设备称" />
        <el-table-column label="设备类型">
          <template slot-scope="scope">
            <span>{{ scope.row.category_name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="key" label="设备key" />
        <el-table-column prop="price" label="粉丝底价">
          <template slot-scope="scope">
            <span>{{ scope.row.price / 100 }}</span>
            <el-button
              type="text"
              @click="handlePrice(scope.row)"
            >修改</el-button>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.created_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleDetail(scope.row.id)">模板消息</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getData"
      />

      <el-dialog title="修改单粉价格" :visible.sync="dialogVisiblePrice" width="30%" :show-close="false" :close-on-click-modal="false">
        <el-input v-model="form.price" type="number" placeholder="请输入价格" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisiblePrice = false">取 消</el-button>
          <el-button type="primary" @click="handlePriceEdit">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog :visible.sync="dialogVisible" title="编辑模板" width="350px">
        <el-form :model="template" label-width="100px" label-position="left">
          <el-form-item label="标题">
            <el-input v-model="template.title" placeholder="标题" />
          </el-form-item>
          <el-form-item label="*消息类型">
            <el-select v-model="template.type" placeholder="请选择消息类型">
              <el-option
                v-for="item in options"
                :key="item.type"
                :label="item.name"
                :value="item.type"
              >{{ item.name }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="消息描述">
            <el-input v-model="template.desc" placeholder="消息描述" />
          </el-form-item>
          <el-form-item label="图片链接地址">
            <el-input v-model="template.thumb" placeholder="图片链接地址" />
          </el-form-item>
          <el-form-item label="跳转URL">
            <el-input v-model="template.url" placeholder="跳转URL" />
          </el-form-item>
          <el-form-item label="文本内容">
            <el-input v-model="template.content" placeholder="文本内容" />
          </el-form-item>
        </el-form>
        <div style="text-align:right;">
          <el-button type="primary" @click="dialogVisible=false">关闭</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { get_device, get_template, edit_price } from '@/api/device'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      total: 0,
      dialogVisiblePrice: false,
      dialogVisible: false,
      options: [{
        type: 1,
        name: '文本消息'
      }, {
        type: 2,
        name: '空消息'
      }, {
        type: 3,
        name: '图文消息'
      }],
      template: {
        id: '',
        device_id: '',
        title: '',
        type: '',
        desc: '',
        thumb: '',
        url: '',
        content: ''
      },
      form: {
        id: null,
        price: 0
      },
      listQuery: {
        page: 1,
        limit: 10
      },
      tableData: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      get_device(this.listQuery).then(response => {
        this.tableData = response.data.data
        this.total = response.data.total
      })
    },
    handlePrice(data) {
      this.dialogVisiblePrice = true
      this.form.id = data.id
      this.form.price = data.price / 100
    },
    handlePriceEdit() {
      edit_price(this.form).then(res => {
        if (res.code === 20000) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.getData()
          this.dialogVisiblePrice = false
        }
      })
    },
    handleDetail(id) {
      // 将要编辑的模板id
      this.template.device_id = id
      get_template(id).then(response => {
        if (response.code === 20000) {
          if (response.template) {
            this.template.id = response.template.id
            this.template.title = response.template.title
            this.template.type = parseFloat(response.template.type)
            this.template.desc = response.template.desc
            this.template.thumb = response.template.thumb
            this.template.url = response.template.url
            this.template.content = response.template.content
          } else {
            this.template.id = ''
            this.template.title = ''
            this.template.type = ''
            this.template.desc = ''
            this.template.thumb = ''
            this.template.url = ''
            this.template.content = ''
          }
        }
      })
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
.main {
  padding: 32px;
}
</style>

