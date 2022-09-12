<template>
    <div>
        <el-form :inline="true" class="demo-form-inline">          
            <el-form-item>
                <el-button type="primary" @click="addRole">Add Role</el-button>
            </el-form-item>
        </el-form>
       
       
        <el-table :data="list" border style="width: 100%">
            <el-table-column prop="roleId" label="ID" width="180" />
            <el-table-column prop="roleName" label="Name" width="180" />
            <el-table-column prop="authority" label="Edit">
                <template #default="scope">
                    <el-button
                        link
                        @click="changeRole(scope.row)"
                        color="#626aef" :dark="isDark" plain>                      
                    
                    Edit Authority
                    </el-button>
            
                </template>

            </el-table-column>

         

        </el-table>
    </div>
</template>

<script lang="ts">
import { defineComponent, DefineComponent, onMounted, reactive, toRefs } from 'vue';   
import { getRoleList } from '@/request/api';
import { InitData,ListInt } from '@/type/role';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter} from 'vue-router';
export default defineComponent({
    setup() {
        const data = reactive(new InitData())
        const router = useRouter()
        onMounted(() => {
            getRoleList().then(res => {
                console.log(res)
                data.list = res.data
            })
        })
        const addRole = () => {
            ElMessageBox.prompt('Please input your role', 'Add', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            })
            //value is what you input in the box 
            .then(({ value }) => {
                if (value) {
                    data.list.push({roleId:data.list.length+1,roleName:value,authority:[]})                   
                }               
                ElMessage({
                    type: 'success',
                    message: `${value} added successfully`,
                })
            })


            .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Input canceled',
            })
            })
        }

        const changeRole = (row: ListInt) => {
            router.push({
                name: "authority",
                params: {
                    id: row.roleId,
                    authority: row.authority

                }
                
            })
            
        }
        return {
            ...toRefs(data),addRole,changeRole,
        }
    }
})

</script>

<style lang="scss" scoped>

</style>