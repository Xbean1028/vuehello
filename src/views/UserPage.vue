<template>
  <div>
    <p>我是用户信息页面</p>
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">用户信息</div
      ></el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 80%" height="350">
      <el-table-column prop="name" label="用户名"> </el-table-column>
      <el-table-column prop="id" label="用户id" > </el-table-column>
      <el-table-column prop="email" label="Email" > </el-table-column>
      <el-table-column prop="tel" label="电话" > </el-table-column>
      <el-table-column prop="pass" label="密码" ></el-table-column>

      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="height:300px"></div>
  </div>
</template>

<script>
export default {
  name: "UserPage",
  data() {
    return {
      tableData: [
        {
          name: "王小虎",
          id: "test1",
          email: "test1@163.com",
          tel: "12306",
          pass: 200333,
        },
        {
          name: "王小虎",
          id: "test1",
          email: "test1@163.com",
          tel: "12306",
          pass: 200333,
        },
        {
          name: "王小虎",
          id: "test1",
          email: "test1@163.com",
          tel: "12306",
          pass: 200333,
        },
      ],
    };
  },
  beforeRouteEnter: (to, from, next) => {
    console.log("进入用户信息界面");
    next();
  },
  beforeRouteLeave: (to, from, next) => {
    console.log("离开用户信息界面");
    next();
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  /* &:last-child {
      margin-bottom: 0;
    } */
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.el-table {
  margin: auto;
}
</style>
