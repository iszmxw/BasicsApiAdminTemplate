<template>
  <div class="app-container">
    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="角色ID" width="220">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column align="center" label="角色名称" width="220">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="描述">
        <template slot-scope="scope">{{ scope.row.desc }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="创建时间">
        <template slot-scope="scope">{{ scope.row.created_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑权限</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑角色':'添加角色'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="角色名称">
          <el-input v-model="role.name" placeholder="角色名称" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="role.desc"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="角色描述"
          />
        </el-form-item>
        <el-form-item label="权限节点">
          <el-tree
            ref="tree"
            :data="routeList"
            show-checkbox
            node-key="id"
            :default-expand-all="true"
            :default-checked-keys="defaultChecked"
            :props="defaultProps"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">{{ $t('permission.cancel') }}</el-button>
        <el-button type="primary" @click="confirmRole">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { getRoleRoutes, getRoles, updateRole } from '@/api/role'

export default {
  data() {
    return {
      role: Object.assign({}),
      routes: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 所有路由
      routeList: [],
      // 根据角色id查询所拥有的路由
      routeListQuery: {
        id: null
      },
      // 默认选中的节点展示的时候用
      defaultChecked: []
    }
  },
  computed: {
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getRoles()
  },
  methods: {
    getCheckedNodes() {
      const ReNodes = this.$refs.tree.getCheckedKeys()
      // 更新角色的权限节点
      this.role.routes = ReNodes
    },
    async getRoleRoutes() {
      const res = await getRoleRoutes(this.routeListQuery)
      // 获取系统所有路由节点
      this.routeList = res.data.all_route_list
      // 设置用户默认选中的节点
      this.defaultChecked = res.data.defaultChecked
    },
    async getRoles() {
      const res = await getRoles()
      // 获取系统所有角色列表
      this.rolesList = res.data.data
    },
    handleEdit(scope) {
      // 编辑框弹出
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.role = deepClone(scope.row)
      this.routeListQuery.id = scope.row.id
      this.getRoleRoutes(this.routeListQuery)
    },
    async confirmRole() {
      // 打印当前选中的节点
      this.getCheckedNodes()
      const res = await updateRole(this.role)
      // 修改成功提示
      if (res.code === 20000) {
        const { desc, id, name } = this.role
        this.dialogVisible = false
        this.$notify({
          title: 'Success',
          dangerouslyUseHTMLString: true,
          message: `
            <div>角色ID: ${id}</div>
            <div>角色名称: ${name}</div>
            <div>描述: ${desc}</div>
          `,
          type: 'success'
        })
        // 重新加载角色列表数据
        this.getRoles()
      }
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
