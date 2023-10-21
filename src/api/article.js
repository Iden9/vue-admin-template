import request from "../utils/request"

export const getArticle = () =>request({
    method:"get",
    url:"/article"
})


export const ReditArticle = (data) =>request({
    method:"put",
    url:"/editarticle",
    data,
})

export const ReqDelArticle = (id) =>request({
    method:"delete",
    url:`/article/${id}`,
})