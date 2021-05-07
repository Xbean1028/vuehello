<template>
  <div>
    <p>我是Drive页面</p>
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">我的设备</div></el-col
      >
    </el-row>
    <el-table :data="tableData" border style="width: 80%" height="350">
      <el-table-column prop="dev_id" label="设备id">
      </el-table-column>
      <el-table-column prop="user_id" label="用户id">
      </el-table-column>
      <el-table-column prop="insert_time" label="添加时间">
      </el-table-column>
      <el-table-column prop="dev_state" label="设备状态" >
      </el-table-column>
      <el-table-column
        prop="isdelete"
        label="逻辑删除"
        width="100"
      ></el-table-column>

      <el-table-column label="操作" width="100">
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
  name: "DrivePage",
  data() {
    return {
      tableData: [
        {
          dev_id: "dev1",
          user_id: "test1",
          insert_time: "2021-05-01 19:20:30",
          dev_state: "0",
          isdelete: 0,
        },
        {
          dev_id: "dev2",
          user_id: "test1",
          insert_time: "2021-05-01 19:20:30",
          dev_state: "0",
          isdelete: 0,
        },
        {
          dev_id: "dev3",
          user_id: "test1",
          insert_time: "2021-05-01 19:20:30",
          dev_state: "0",
          isdelete: 0,
        },
      ],
    };
  },
  beforeRouteEnter: (to, from, next) => {
    console.log("进入设备管理界面");
    next();
  },
  beforeRouteLeave: (to, from, next) => {
    console.log("离开设备管理界面");
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
