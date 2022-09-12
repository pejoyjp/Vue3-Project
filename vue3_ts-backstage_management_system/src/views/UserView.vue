<template>
    <div>
        <el-form :inline="true" :model="selectData" class="demo-form-inline">
            <el-form-item label="name">
                <el-input v-model="selectData.nickName" placeholder="input name" />
            </el-form-item>

            <el-form-item label="role">
                

                <el-select v-model="selectData.role" class="m-2" size="large">
                    <el-option
                        :key="0"
                        label="all"
                        :value="0"
                    />
                    <el-option
                        v-for="item in roleList"
                        :key="item.roleId"
                        :label="item.roleName"
                        :value="item.roleId"
                    />
                </el-select>
              
                
            </el-form-item>

        

            <el-form-item>
            <el-button type="primary" @click="onSubmit">Query</el-button>
            </el-form-item>
        </el-form>
       
       
        <el-table :data="list" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="180" />
            <el-table-column prop="nickName" label="Name" width="180" />
            <el-table-column prop="role" label="role">
                <template #default="scope">
                    <el-button
                        link
                        type="primary"
                        size="small"
                        v-for="item in scope.row.role"
                        :key="item.role"
                    >
                    {{item.roleName}}
                    </el-button>
            
                </template>

            </el-table-column>

            <el-table-column prop="edit" label="edit">
                <template #default="scope">
                    <el-button
                    link
                    type="primary"
                    size="small"
                    @click="changeUser(scope.row)"
                    >
                    Edit
       
                    </el-button>
                </template>

            </el-table-column>

        </el-table>
    </div>

    
    <el-dialog v-model="isShow" title="Edit">
        <el-form :model="active">
        <el-form-item label="Name" :label-width="formLabelWidth">
            <el-input v-model="active.nickName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Role" label-width="50px">
            <el-select multiple v-model="active.role" placeholder="Please select a role">
                <el-option
                        v-for="item in roleList"
                        :key="item.roleId"
                        :label="item.roleName"
                        :value="item.roleId"
                    />
            </el-select>
        </el-form-item>
        </el-form>
       
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="updataUser">Updata</el-button>
            <el-button type="primary" @click="dialogFormVisible = false"
            >Cancel</el-button
            >
        </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { DefineComponent, onMounted, reactive, toRefs,ref,watch } from 'vue';
import { getUserList, getRoleList } from '@/request/api';
import { InitData,ListInt } from '@/type/user';
import { ITEM_RENDER_EVT } from 'element-plus/es/components/virtual-list/src/defaults';
import { valueEquals } from 'element-plus';
export default {
    setup() {

    

        const data=reactive(new InitData())
        onMounted(() => {
            getUser()
            getRole()
        })
        const getUser= () => {
            getUserList().then((res) => {
                console.log(res)
                data.list = res.data
            })
        } 
        const getRole= () => {
            getRoleList().then((res) => {
                console.log(res)
                data.roleList = res.data
            })
        } 
        const onSubmit = () => {
            let arr:ListInt[] = [] // define an array to accept what data need to be showed 
            if(data.selectData.nickName || data.selectData.role){
                if(data.selectData.nickName){
                    arr = data.list.filter((value)=>{
                        return value.nickName.indexOf(data.selectData.nickName) !== -1
                    })
                }
                if(data.selectData.role){
                    arr = (data.selectData.nickName ? arr : data.list).filter((value) => {
                        return value.role.find((item)=>item.role===data.selectData.role)
                    })
                }
            }else{
                arr=data.list
            }
            data.list = arr
        }

        const changeUser = (row:ListInt) => {
            console.log(row)                        
            data.active = {
                id: row.id,
                nickName: row.nickName,
                userName: row.userName,
                role: row.role.map((value:any) => value.role || value.roleId),                
            }
            data.isShow = true
            
            
        }

        const updataUser = () => {
            
            let obj: any = data.list.find((value) => value.id == data.active.id)
            obj.nickName = data.active.nickName
            obj.role = data.roleList.filter(value=>data.active.role.indexOf(value.roleId)!==-1)
            console.log(obj.role)
            data.list.forEach((item, i) => {
                if(item.id==obj.id){
                        data.list[i]=obj
                    }
                })
            data.isShow = false
           

            console.log(data.active)
            
        }

        watch([()=>data.selectData.nickName,()=>data.selectData.role],
        ()=>{
            if(data.selectData.nickName ==="" || data.selectData.role === 0){
                getUser()
            }

            })
        
        

        return {...toRefs(data),onSubmit,changeUser,updataUser,}
    }
}
</script>

<style lang="scss" scoped>



</style>