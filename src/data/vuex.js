import {createStore} from "vuex"

const store=createStore({
    state(){
        return{
            // dashboard chart options
            fullChartOption:{},
            incomeChartOption:{},
            expenseChartOption:{},
            surplusChartOption:{},
            // budegt plans
            plans:[],
            // prompt message
            promptMsg:"defalt alert!",
            promptStatus:false,
            promptCount:1
        }
    },
    getters:{
        fullChart(state){
            return state.fullChartOption
        },
        incomeChart(state){
            return state.incomeChartOption
        },
        expenseChart(state){
            return state.expenseChartOption
        },
        surplusChart(state){
            return state.surplusChartOption
        },
        plans:(state)=>(from,to)=>{
            return state.plans.slice(from,to)
        }
    },
    mutations:{
        updatePlan(state,id,plan){
            state.plans.forEach((item,index)=>{
                if(item.id===id)
                    state.plans[index]=plan
            })
        },
        deletePlan(state,id){
            state.plans.forEach((item,index)=>{
                if(item.id===id)
                    state.plans.splice(index,1)
            })
        },
        addPlan(state,plan){
            state.plans.push(plan)
        }
    },
})

export default store;