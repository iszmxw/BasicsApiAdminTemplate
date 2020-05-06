<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="float:left">吸粉客户列表</span>
          <span style="float:right">
            <el-form>
              <el-form-item>
                <el-col :span="15">
                  <el-input v-model="listQuery.username" clearable placeholder="请输入手机号码">
                    <i slot="prefix" class="el-input__icon el-icon-search" />
                  </el-input>
                </el-col>
                <el-col class="line" :span="-1">&nbsp;&nbsp;</el-col>
                <el-col :span="3">
                  <el-button type="primary" @click="getUserList()">搜索</el-button>
                </el-col>
              </el-form-item>
            </el-form>
          </span>
        </div>
        <div>
          <el-table :data="hifansList" border>
            <el-table-column align="center" label="客户ID" width="80">
              <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column align="header-center" label="客户手机号码">
              <template slot-scope="scope">{{ scope.row.mobile }}</template>
            </el-table-column>
            <el-table-column align="header-center" label="客户绑定的公众号" width="180">
              <template slot-scope="scope">
                <div v-if="scope.row.official.length > 0">
                  <el-tag
                    v-for="(item,index) of scope.row.official"
                    :key="index"
                    class="tag-padding"
                  >{{ item.name }}</el-tag>
                </div>
                <div v-else>
                  <el-tag type="danger">暂未绑定公众号</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="header-center" label="钱包余额" width="100">
              <template slot-scope="scope">{{ scope.row.amount / 100 }}</template>
            </el-table-column>
            <el-table-column align="header-center" label="推广提成" width="100">
              <template slot-scope="scope">{{ scope.row.commission / 100 }}</template>
            </el-table-column>
            <el-table-column align="header-center" label="提成比例" width="100">
              <template slot-scope="scope">{{ scope.row.fee }}%</template>
            </el-table-column>
            <el-table-column align="header-center" label="状态">
              <template slot-scope="scope">
                <el-button v-if="scope.row.status == 1" type="success" disabled>正常</el-button>
                <el-button v-else type="danger" disabled>冻结</el-button>
              </template>
            </el-table-column>
            <el-table-column align="header-center" label="注册时间">
              <template
                slot-scope="scope"
              >{{ scope.row.created_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.status == 1"
                  type="danger"
                  size="mini"
                  @click="handleLock(scope)"
                >冻结</el-button>
                <el-button v-else type="success" size="mini" @click="handleLock(scope)">解冻</el-button>
                <el-button type="primary" size="mini" @click="handleEditConfirm(scope)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-dialog title="编辑客户信息" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form">
              <el-form-item label="手机号码" :label-width="formLabelWidth">
                <el-input v-model="form.mobile" disabled />
              </el-form-item>
              <el-form-item label="公众号" :label-width="formLabelWidth">
                <div v-if="form.official.length > 0">
                  <el-tag
                    v-for="(item,index) of form.official"
                    :key="index"
                    class="tag-padding"
                  >{{ item.name }}</el-tag>
                </div>
                <div v-else>
                  <el-tag type="danger">暂未绑定公众号</el-tag>
                </div>
              </el-form-item>
              <el-form-item label="钱包余额" :label-width="formLabelWidth">
                <el-input v-model="form.amount" placeholder="钱包余额" disabled>
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
              <el-form-item label="推广提成" :label-width="formLabelWidth">
                <el-input v-model="form.commission" placeholder="推广提成" disabled>
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
              <el-form-item label="提成比例" :label-width="formLabelWidth">
                <el-input v-model="form.fee" placeholder="提成比例">
                  <template slot="append">%</template>
                </el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleEditOk">确 定</el-button>
            </div>
          </el-dialog>

          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getUserList"
          />
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { getUserList, editStatus, editUserInfo } from '@/api/hifans'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        username: null
      },
      hifansList: [],
      dialogFormVisible: false,
      form: {
        id: null,
        mobile: '',
        official: [],
        amount: '',
        commission: '',
        fee: ''
      },
      formLabelWidth: '80px'
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const res = await getUserList(this.listQuery)
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
            this.getUserList()
          }
        })
        .catch(err => { console.error(err) })
    },
    handleEditConfirm({ $index, row }) {
      this.form.id = row.id
      this.form.mobile = row.mobile
      this.form.official = row.official
      this.form.amount = row.amount / 100
      this.form.commission = row.commission / 100
      this.form.fee = row.fee
      this.dialogFormVisible = true
    },
    handleEditOk() {
      editUserInfo(this.form).then(res => {
        if (res.code === 20000) {
          this.getUserList()
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: res.message
          })
        }
      })
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
.tag-padding {
  margin: 2px;
}
</style>
