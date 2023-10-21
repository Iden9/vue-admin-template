import { getArticle } from "@/api/article";

const state = {
    getArticle:[]
}

const mutations = {
    GETARTICLE(state,getArticle){
        state.getArticle = getArticle
    }
}

const actions = {
    async getArticle({ commit }) {
        let result = await getArticle();
        if(result.code == 200){
            commit("GETARTICLE",result.data)
            return "ok";
        }else{
            return Promise.reject(new Error("faile"))
        }
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}