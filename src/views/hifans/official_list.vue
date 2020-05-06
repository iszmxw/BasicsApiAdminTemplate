<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="float:left">公众号列表</span>
          <span style="float:right">
            <el-form>
              <el-form-item>
                <el-col :span="15">
                  <el-input v-model="listQuery.name" clearable placeholder="公众号名称">
                    <i slot="prefix" class="el-input__icon el-icon-search" />
                  </el-input>
                </el-col>
                <el-col class="line" :span="-1">&nbsp;&nbsp;</el-col>
                <el-col :span="3">
                  <el-button type="primary" @click="getOfficialList()">搜索</el-button>
                </el-col>
              </el-form-item>
            </el-form>
          </span>
        </div>
        <div>
          <el-table :data="hifansList" border>
            <el-table-column align="center" label="ID" width="80">
              <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column align="header-center" label="公众号名称">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column align="header-center" label="归属用户">
              <template slot-scope="scope">
                <span v-if="scope.row.user_status === '1'">
                  {{ scope.row.username }}
                </span>
                <span v-else>
                  {{ scope.row.username }}
                  <br>
                  <el-button type="danger" round disabled>已被冻结</el-button>
                </span>
              </template>
            </el-table-column>
            <el-table-column align="header-center" label="是否认证">
              <template slot-scope="scope">
                <el-button v-if="scope.row.verify_type_info === -1" type="info" round disabled>未认证</el-button>
                <el-button v-else type="success" round disabled>已认证</el-button>
              </template>
            </el-table-column>
            <el-table-column align="header-center" label="状态">
              <template slot-scope="scope">
                <el-button v-if="scope.row.status == 0" type="info">待使用</el-button>
                <el-button v-else-if="scope.row.status == 1" type="success">已使用</el-button>
              </template>
            </el-table-column>
            <el-table-column align="header-center" label="公众号二维码">
              <template slot-scope="scope">
                <img :src="scope.row.qrcode_path" alt="公众号二维码" width="100">
              </template>
            </el-table-column>
            <el-table-column align="header-center" label="首次授权时间">
              <template
                slot-scope="scope"
              >{{ scope.row.created_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
            </el-table-column>
            <el-table-column align="header-center" label="更新时间">
              <template
                slot-scope="scope"
              >{{ scope.row.updated_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
            </el-table-column>
            <el-table-column align="center" label="授权状态" width="150">
              <template slot-scope="scope">
                <span v-if="scope.row.deleted_at === null">
                  <el-button type="success" round disabled>已授权</el-button>
                </span>
                <span v-else>
                  <el-button type="info" round disabled>已取消授权</el-button>
                  <br>
                  {{ scope.row.deleted_at | parseTime('{y}-{m}-{d} {h}:{i}') }}
                </span>
              </template>
            </el-table-column>
          </el-table>

          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getOfficialList"
          />
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { getOfficialList, editStatus } from '@/api/hifans'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        name: null
      },
      merchant: {
        id: '',
        name: '',
        mobile: '',
        password: ''
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
    this.getOfficialList()
  },
  methods: {
    async getOfficialList() {
      const res = await getOfficialList(this.listQuery)
      this.hifansList = res.data.data
      this.total = res.data.total
    },
    handleLock({ $index, row }) {
      this.$confirm('确定要冻结该客户吗?', '温馨提示', {
        confirmButtonText: 'OK',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await editStatus({ id: row.id })
          if (res.code === 20000) {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.getOfficialList()
          }
        })
        .catch(err => { console.error(err) })
    }
  }
}
</script>

<style scoped>
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
</style>
