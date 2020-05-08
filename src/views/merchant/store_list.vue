<template>
  <div class="main">
    <el-card class="box-card">

      <div slot="header" class="clearfix">
        <span>门店列表</span>
        <span style="float:right">
          <router-link to="/merchant/store_site">
            <el-button type="primary">添加门店</el-button>
          </router-link>
        </span>
      </div>

      <el-table
        :data="merchantList"
        style="width: 100%;margin-top:30px;"
      >
        <el-table-column
          align="center"
          label="门店ID"
          width="80"
        >
          <template slot-scope="scope">{{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column
          align="header-center"
          label="商户名称"
        >
          <template slot-scope="scope">
            {{ scope.row.company }}
          </template>
        </el-table-column>
        <el-table-column
          align="header-center"
          label="省市区"
        >
          <template slot-scope="scope">
            {{ scope.row.username }}
          </template>
        </el-table-column>
        <el-table-column
          align="header-center"
          label="店铺位置"
        >
          <template slot-scope="scope">
            {{ scope.row.mobile }}
          </template>
        </el-table-column>
        <el-table-column
          align="header-center"
          label="门店类型"
        >
          <template slot-scope="scope">
            {{ scope.row.mobile }}
          </template>
        </el-table-column>
        <el-table-column
          align="header-center"
          label="手机号"
        >
          <template slot-scope="scope">
            {{ scope.row.mobile }}
          </template>
        </el-table-column>
        <el-table-column
          align="header-center"
          label="所属账号"
        >
          <template slot-scope="scope">
            {{ scope.row.username }}
          </template>
        </el-table-column>
        <el-table-column
          align="header-center"
          label="状态"
          width="90"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status == 1"
              type="success"
              disabled
            >
              正常</el-button>
            <el-button
              v-else
              type="danger"
              disabled
            >冻结</el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="header-center"
          label="创建时间"
        >
          <template slot-scope="scope">
            {{ scope.row.created_at | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="250"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleEdit(scope.row)"
            >
              编辑</el-button>
            <el-button
              v-if="scope.row.status == 1"
              type="danger"
              size="small"
              @click="handleLock(scope)"
            >冻结</el-button>
            <el-button
              v-else
              type="success"
              size="small"
              @click="handleLock(scope)"
            >解冻</el-button>
            <el-button
              type="primary"
              size="small"
              @click="handleEdit(scope.row)"
            >门店设备</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </el-card>
  </div>
</template>

<script>
import {
  getList,
  edit,
  lockStatus
} from '@/api/merchant'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  components: {
    Pagination
  },
  data() {
    return {
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      merchant: {
        id: '',
        name: '',
        mobile: '',
        fee: '',
        password: ''
      },
      merchantList: [],
      dialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await getList(this.listQuery)
      this.merchantList = res.data.data
      this.total = res.data.total
    },
    handleEdit(data) {
      this.merchant.id = data.id
      this.merchant.name = data.company
      this.merchant.name = data.company
      this.merchant.mobile = data.mobile
      this.merchant.fee = data.fee
      this.dialogVisible = true
    },
    async handleOk() {
      const res = await edit(this.merchant)
      if (res.code === 20000) {
        this.$message({
          type: 'success',
          message: res.message
        })
        this.dialogVisible = false
        this.getList()
      }
    },
    handleLock({
      $index,
      row
    }) {
      this.$confirm('确定要冻结该商户吗?', '温馨提示', {
        confirmButtonText: 'OK',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await lockStatus({
            id: row.id
          })
          if (res.code === 20000) {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.getList()
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style scoped>
.main {
  padding: 32px;
}
</style>
