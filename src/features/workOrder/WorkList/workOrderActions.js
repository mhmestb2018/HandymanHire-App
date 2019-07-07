import { CREATE_JOB, UPDATE_JOB, DELETE_JOB } from "./WorkOrderConstants";

export const createJob =(job)=>{
    return{
        type:CREATE_JOB,
        payload:{
            job
        }
    }
}
export const updateJob =(job)=>{
    return{
        type:UPDATE_JOB,
        payload:{
            job
        }
    }
}
export const deleteJob =(job)=>{
    return{
        type:DELETE_JOB,
        payload:{
            job
        }
    }
}