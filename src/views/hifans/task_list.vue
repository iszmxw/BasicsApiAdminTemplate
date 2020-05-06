<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="float:left">吸粉任务列表</span>
          <span style="float:right">
            <el-form>
              <el-form-item>
                <el-switch v-model="listQuery.all" active-text="显示全部数据" inactive-text="显示正常数据" @change="getTaskList" />
              </el-form-item>
              <el-form-item>
                <el-col :span="15">
                  <el-input v-model="listQuery.name" clearable placeholder="请输入公众号名称">
                    <i slot="prefix" class="el-input__icon el-icon-search" />
                  </el-input>
                </el-col>
                <el-col class="line" :span="-1">&nbsp;&nbsp;</el-col>
                <el-col :span="3">
                  <el-button type="primary" @click="getTaskList()">搜索</el-button>
                </el-col>
              </el-form-item>
            </el-form>
          </span>
        </div>
        <div>
          <el-table :data="hifansList" border :row-class-name="tableRowClassName">
            <el-table-column align="center" label="ID" width="80" fixed="left">
              <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column align="header-center" label="公众号名称" fixed="left">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column align="header-center" label="客户用户名" fixed="left" width="110">
              <template slot-scope="scope">{{ scope.row.username }}</template>
            </el-table-column>
            <el-table-column align="header-center" label="公众号头像" width="100">
              <template slot-scope="scope">
                <img :src="scope.row.head_img" width="80" alt="公众号头像">
              </template>
            </el-table-column>
            <el-table-column align="header-center" label="公众号二维码" width="100">
              <template slot-scope="scope">
                <img :src="scope.row.qrcode_path" width="80" alt="公众号二维码">
              </template>
            </el-table-column>
            <el-table-column align="header-center" label="任务价格">
              <template slot-scope="scope">
                <span>{{ scope.row.price / 100 }}</span>
                <el-button
                  type="text"
                  @click="handlePrice(scope.row)"
                >修改</el-button>
              </template>
            </el-table-column>
            <el-table-column label="共享设备" width="300">
              <template slot-scope="scope">
                <el-tag
                  v-for="(item,index) in scope.row.device_category"
                  :key="index"
                  type="success"
                >{{ item.name }}</el-tag>
                <el-button
                  type="text"
                  @click="handleDeviceCategory(scope.row)"
                >修改</el-button>
              </template>
            </el-table-column>
            <el-table-column label="性别" width="120">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.sex === 0">不限</el-tag>
                <el-tag v-if="scope.row.sex === 1">男</el-tag>
                <el-tag v-if="scope.row.sex === 2">女</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="地区" width="300" :show-overflow-tooltip="true" align="center">
              <template slot-scope="scope">
                <el-tag
                  v-for="(item,index) in scope.row.area"
                  :key="index"
                  type="primary"
                  disable-transitions
                >{{ item.name }}</el-tag>&nbsp;
              </template>
            </el-table-column>
            <el-table-column label="场景" width="300">
              <template slot-scope="scope">
                <el-tag
                  v-for="(item,index) in scope.row.device_scene"
                  :key="index"
                  type="warning"
                >{{ item.name }}&nbsp;&nbsp;</el-tag>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="状态" width="100">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status === 0" type="info" size="small" round>等待开启</el-tag>
                <el-tag
                  v-if="scope.row.status === 1 && scope.row.deleted_at === null"
                  type="success"
                  size="small"
                  round
                >开启中</el-tag>
                <el-tag v-if="scope.row.status === 2" type="info" size="small" round disabled>已移除</el-tag>
                <el-tag
                  v-if="scope.row.deleted_at !== null"
                  type="info"
                  size="small"
                  round
                  disabled
                >取消授权</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="header-center" label="创建时间">
              <template
                slot-scope="scope"
              >{{ scope.row.created_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
            </el-table-column>
            <el-table-column align="center" label="操作" fixed="right" width="100">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.status == 1 && scope.row.deleted_at === null"
                  type="danger"
                  size="small"
                  @click="handleLock(scope)"
                >暂停</el-button>
                <el-button
                  v-if="scope.row.status == 0 && scope.row.deleted_at === null"
                  type="success"
                  size="small"
                  @click="handleLock(scope)"
                >开启</el-button>
                <el-button v-if="scope.row.deleted_at !== null" type="info" size="small">取消授权</el-button>
                <el-button v-if="scope.row.status == 2" type="info" size="small">已移除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-dialog title="修改任务价格" :visible.sync="dialogVisiblePrice" width="30%" :show-close="false" :close-on-click-modal="false">
            <el-input v-model="form.price" type="number" placeholder="请输入价格" />
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisiblePrice = false">取 消</el-button>
              <el-button type="primary" @click="handlePriceEdit">确 定</el-button>
            </span>
          </el-dialog>

          <el-dialog title="修改共享设备" :visible.sync="dialogVisibleCategory" width="30%" :show-close="false" :close-on-click-modal="false">
            <el-select v-model="selected_category_form.category" multiple placeholder="请选择">
              <el-option
                v-for="item in category_list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              />
            </el-select>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisibleCategory = false">取 消</el-button>
              <el-button type="primary" @click="handleDeviceCategoryEdit">确 定</el-button>
            </span>
          </el-dialog>

          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getTaskList"
          />
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { getTaskList, editTaskStatus, edit_price, getCategory, edit_task_category } from '@/api/hifans'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      dialogVisiblePrice: false,
      dialogVisibleCategory: false,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        name: null,
        all: false
      },
      form: {
        id: null,
        price: 0
      },
      category_list: [],
      selected_category_form: {
        id: null,
        category: {}
      },
      hifansList: [],
      dialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  created() {
    this.getTaskList()
  },
  methods: {
    async getTaskList() {
      const res = await getTaskList(this.listQuery)
      this.hifansList = res.data.data
      this.total = res.data.total
    },
    handleLock({ $index, row }) {
      this.$confirm('您确定了吗?', '温馨提示', {
        confirmButtonText: 'OK',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await editTaskStatus({ id: row.id })
          if (res.code === 20000) {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.getTaskList()
          }
        })
        .catch(err => { console.error(err) })
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
          this.getTaskList()
          this.dialogVisiblePrice = false
        }
      })
    },
    handleDeviceCategory(data) {
      getCategory({ id: data.id }).then(res => {
        if (res.code === 20000) {
          this.dialogVisibleCategory = true
          this.category_list = res.data.category_list
          this.selected_category_form.id = data.id
          this.selected_category_form.category = res.data.selected_category
        }
      })
    },
    handleDeviceCategoryEdit() {
      edit_task_category(this.selected_category_form).then(res => {
        if (res.code === 20000) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.getTaskList()
          this.dialogVisibleCategory = false
        }
      })
    },
    tableRowClassName({ row }) {
      if (row.status === 2 || row.deleted_at !== null) {
        return 'warning-row'
      } else {
        return ''
      }
    }
  }
}
</script>

<style>
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
.component-item {
  min-height: 100px;
}
.header_image {
  display: block;
  width: 40px;
  height: 40px;
}

.chart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;
}

.el-table .warning-row {
  color: #dddddd !important;
  background: rgba(255, 255, 255, 0.7);
}

.el-table .warning-row img {
  -webkit-filter: grayscale(1); /* Webkit */
  filter: gray; /* IE6-9 */
  filter: grayscale(1); /* W3C */
}

.el-table .warning-row .el-tag--success {
  background-color: rgba(19, 206, 102, 0.14);
  border-color: rgba(19, 206, 102, 0.21);
  color: rgba(176, 206, 189, 0.5);
}

.el-table .warning-row .el-button--info {
  color: rgba(255, 255, 255, 0.92);
  background-color: rgba(144, 147, 153, 0.22);
  border-color: rgba(144, 147, 153, 0.22);
}

.el-table .warning-row .el-button--danger {
  color: rgba(255, 255, 255, 0.4);
  background-color: rgba(255, 73, 73, 0.4);
  border-color: rgba(255, 73, 73, 0.4);
}

.el-table .warning-row .el-tag {
  color: rgba(24, 144, 255, 0.4);
}

.el-table .warning-row .el-tag--warning {
  background-color: rgba(255, 186, 0, 0.1);
  border-color: rgba(255, 186, 0, 0.2);
  color: rgba(255, 186, 0, 0.3);
}
</style>

