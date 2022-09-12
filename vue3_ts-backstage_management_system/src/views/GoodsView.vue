<template>
    <div>
        <div class="select-box">
            <el-form :inline="true" :model="selectData" class="demo-form-inline">
            <el-form-item label="title">
                <el-input v-model="selectData.title" placeholder="input" />
            </el-form-item>
            <el-form-item label="introduce">
                <el-input v-model="selectData.introduce" placeholder="input" />
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="onSubmit">Query</el-button>
            </el-form-item>
        </el-form>
        </div>
       
        <el-table :data="dataList.comList" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="180" />
            <el-table-column prop="title" label="Name" width="180" />
            <el-table-column prop="introduce" label="Introduce" />
        </el-table>
        <el-pagination @current-change="currentChange" 
        @size-change = 'sizeChange' 
        layout="prev, pager, next" 
        :total="selectData.count*2" />
      
    </div>
</template>

<script lang="ts">
import { computed } from '@vue/reactivity';
import { pa } from 'element-plus/es/locale';
import { DefineComponent, onMounted, reactive, toRefs,watch } from 'vue';
import { getGoodsList } from '../request/api';
import {InitData, ListInt} from '../type/goods'
export default {
    setup() {
        const data = reactive(new InitData)
        onMounted(() => {
            getGoods()
        })
        const getGoods = () => {
            getGoodsList().then((res) => {
            data.list = res.data
            data.selectData.count = res.data.length
        })
        }
        
        const dataList = reactive({
            comList:computed(()=>{
                return data.list.slice((data.selectData.page-1)*data.selectData.pagesize,data.selectData.page*data.selectData.pagesize)
            })
        })
        const currentChange = (page:number)=>{
            data.selectData.page = page
        }
        const sizeChange = (pagesize:number) =>{
            data.selectData.pagesize = pagesize
        }
        const onSubmit=()=>{
            let arr:ListInt[] = [] // define an array to show the data that is showed after inquery 
            if(data.selectData.title || data.selectData.introduce){
                if(data.selectData.title){
                    arr = data.list.filter((value)=>{
                        return value.title.indexOf(data.selectData.title) !== -1
                    })
                }
                if(data.selectData.introduce){
                    arr = data.list.filter((value)=>{
                        return value.introduce.indexOf(data.selectData.introduce) !== -1
                    })
                }
            }else{
                arr=data.list
            }
            data.selectData.count=arr.length
            data.list = arr
        }
        watch([()=>data.selectData.title,()=>data.selectData.introduce],
        ()=>{
            if(data.selectData.title ==="" && data.selectData.introduce === ""){
                getGoods()
            }

        })

         

        
        return {...toRefs(data),currentChange,sizeChange,dataList,onSubmit}
    }
}
</script>

<style lang="scss" scoped>

</style>