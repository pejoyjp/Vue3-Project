import service from ".";
interface loginData{
    username: string,
    password: string,

}
//login API
export function login(data:loginData) {
    return service({
        url: "/login",
        method: "post",
        data
        
    })
}

//Product List API
export function getGoodsList() {
    return service({
        url: "/getGoodsList",
        method:"get"
    })
}
//user API
export function getUserList() {
    return service({
        url: "/getUserList",
        method:"get"
    })
}
//role API
export function getRoleList() {
    return service({
        url: "/getRoleList",
        method:"get"
    })
}
//authority API
export function getAuthorityList() {
    return service({
        url: "/getAuthorityList",
        method:"get"
    })
}