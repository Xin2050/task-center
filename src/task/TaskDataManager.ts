import { ITaskData, ITaskDataManager, ITaskResult, TaskStatus} from "../interfaces/tasks";
import TaskData, {IDataFormat} from "./TaskData";


export class TaskDataManager implements ITaskDataManager{
    private static instance:ITaskDataManager;
    private taskData:Map<number,ITaskData>;

    private constructor(){
        this.initData();
    }
    private initData(){
        //Load meta data
        const metaData = TaskData.getData();
        //processing data
        this.taskData = new Map();
        metaData.forEach((v,k)=>{
            this.taskData.set(k,{
                id:k,
                data:v,
                status:TaskStatus.Ready,
                result:[]
            })
        })
    }


    public static getInstance():ITaskDataManager{
        if(!TaskDataManager.instance) {
            TaskDataManager.instance = new TaskDataManager();
        }
        return TaskDataManager.instance;
    }

    public getDataMap():Map<number,ITaskData>{
        return this.taskData
    }

    public getData(key:number):ITaskData{
        const v = this.taskData.get(key);
        if(v){
            return v;
        }else{
            throw Error("id not found in Data!")
        }
    }
    public updateStatus(key:number,status:TaskStatus){
        const v = this.taskData.get(key);
        if(v){
            v.status = status;
        }else{
            throw Error("id not found in Data!");
        }
    }
    public setResult(key:number,rs:ITaskResult){
        const v = this.taskData.get(key);

        if(v){
            v.result.push(rs)
        }else{
            throw Error(`id ${key} not found in Data!`);
        }

    }
    public getNextData():IDataFormat|undefined{
        //undefined means: no data need to be send, all done;
        for( let v of this.taskData.values()){
            if(v.status===TaskStatus.Ready){
                return v.data;
            }
        }
        for(let v of this.taskData.values()){
            if(v.status===TaskStatus.Error){
                return v.data;
            }
        }
        return undefined;
    }

}



