<template>
  <div class="common-layout">
    <el-container>

      <el-header height = "80px">
          <el-row :gutter="20">
          <el-col :span="4"><img src = "../assets/logo.png" class="logo"></el-col>
          <el-col :span="16"><h2>Backstage Management System</h2></el-col>
          <el-button type="primary" class = "signOut" @click="deleteToken">Sign Out</el-button>
       
          </el-row>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="active"
        text-color="#fff"
        router
      >
      <!--router: start the router， el-menu-item index : redirect -->
             
        <el-menu-item :index="item.path" v-for="item in list" :key="item.path">
          <span>{{item.meta.title}}</span>
        </el-menu-item>
       
      </el-menu>

        </el-aside>
        <el-main>
          <!--set the router-outlet -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter,useRoute } from 'vue-router';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const deleteToken = () => {
      localStorage.removeItem('token')
      router.push('/login')
    }
    //get router of all pages 
    console.log(router.getRoutes())
    const list = router.getRoutes().filter(v => v.meta.isShow)//get an array that saves the router
    return {
      list, active: route.path,deleteToken,
      
    }
  
  },
  components: {

  },
});
</script>
<style lang="scss" scoped>

.el-header{
  height: 80px;
  background-color: darkgray;
  .logo{
  height: 80px;
  }
h2 , .quit-login{
  text-align: center;
  height: 80px;
  line-height: 80px;
  color: white;
}
.signOut{
  height: 40px;
  margin-top: 15px;
}
}
.el-aside{
  .el-menu{
    height: calc(100vh - 80px);
  }
}

</style>