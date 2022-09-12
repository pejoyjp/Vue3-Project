export interface ListInt{
    id: number
    nickName: string
    role: RoleInt[]
    userName:string

}
interface RoleInt{
    role: number
    roleName:string
}
interface SelectDataInt{
    role: number
    nickName:string
}
interface RoleListInt{
    authority: number[]
    roleId: number
    roleName:string
}
interface AcitveInt{
    id: number
    nickName: string
    role: number[]
    userName: string
}
export class InitData{
    selectData: SelectDataInt = {
        nickName: "",
        role: 0
    }
    list: ListInt[] = []//接受用户信息的列表
    roleList: RoleListInt[] = []
    isShow = false
    active:AcitveInt = {
        id: 0,
        nickName: "",
        role: [],
        userName:""
    }

    
}