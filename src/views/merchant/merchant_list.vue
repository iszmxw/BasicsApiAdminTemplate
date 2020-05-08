<template>
  <div class="app-container">
    <el-button type="primary">合作商户列表</el-button>

    <el-table :data="merchantList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="商户ID" width="80">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="商户名称">
        <template slot-scope="scope">{{ scope.row.company }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="商户账号">
        <template slot-scope="scope">{{ scope.row.username }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="手机号">
        <template slot-scope="scope">{{ scope.row.mobile }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="余额">
        <template slot-scope="scope">{{ scope.row.amount / 100 }} 元</template>
      </el-table-column>
      <el-table-column align="header-center" label="提现手续" width="80">
        <template slot-scope="scope">{{ scope.row.fee }} %</template>
      </el-table-column>
      <el-table-column align="header-center" label="状态" width="90">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="success" disabled>正常</el-button>
          <el-button v-else type="danger" disabled>冻结</el-button>
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="注册时间">
        <template slot-scope="scope">{{ scope.row.created_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
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

    <el-dialog :visible.sync="dialogVisible" title="编辑合作商户">
      <el-form :model="merchant" label-width="120px" label-position="left">
        <el-form-item label="商户名称">
          <el-input v-model="merchant.name" placeholder="商户名称" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="merchant.mobile" placeholder="手机号" />
        </el-form-item>
        <el-form-item label="修改手续费费率">
          <el-input v-model="merchant.fee" placeholder="费率">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="重置商户密码">
          <el-input v-model="merchant.password" placeholder="密码" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="handleOk">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, edit, lockStatus } from '@/api/merchant'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
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
    handleLock({ $index, row }) {
      this.$confirm('确定要冻结该商户吗?', '温馨提示', {
        confirmButtonText: 'OK',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await lockStatus({ id: row.id })
          if (res.code === 20000) {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.getList()
          }
        })
        .catch(err => { console.error(err) })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
