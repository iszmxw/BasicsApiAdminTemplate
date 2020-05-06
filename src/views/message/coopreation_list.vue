<template>
  <div class="app-container">
    <el-badge :value="num" class="item">
      <el-button type="primary">合作列表</el-button>
    </el-badge>

    <el-table :data="coopreation_list" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="id" width="80">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column align="center" label="称呼" width="80">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="手机号码">
        <template slot-scope="scope">{{ scope.row.mobile }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="预计投资金额">
        <template slot-scope="scope">{{ scope.row.price }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="投放场景">
        <template slot-scope="scope">{{ scope.row.scene }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="城市">
        <template slot-scope="scope">{{ scope.row.area }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="IP地址">
        <template slot-scope="scope">{{ scope.row.ip }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="地址">
        <template slot-scope="scope">{{ scope.row.address }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="留言时间">
        <template slot-scope="scope">{{ scope.row.created_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 1" type="success" disabled>已查阅</el-button>
          <el-button v-else type="danger" @click="handleLock(scope)">待处理</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getCooperationList"
    />
  </div>
</template>

<script>
import { getCooperationList, editCooperationStatus } from '@/api/message'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      total: 0,
      num: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      coopreation_list: []
    }
  },
  created() {
    this.getCooperationList()
  },
  methods: {
    async getCooperationList() {
      const res = await getCooperationList(this.listQuery)
      if (res.code === 20000) {
        this.coopreation_list = res.data.list.data
        this.total = res.data.list.total
        this.num = res.data.num
      }
    },
    handleLock({ $index, row }) {
      this.$confirm('确定吗?', '温馨提示', {
        confirmButtonText: 'OK',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await editCooperationStatus({ id: row.id })
          if (res.code === 20000) {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.getCooperationList()
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
