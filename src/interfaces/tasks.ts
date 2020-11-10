
import {DetailTaskActionType, IDataFormat} from "../task/TaskData";


export enum TaskStatus {
    Ready,
    Processing,
    Retrying,
    Done,
    MultipleResult,
    Error,
}

export interface ITaskDataManager {
    getData(key:number):ITaskData;
    updateStatus(key:number,status:TaskStatus):void;
    getDataMap():Map<number,ITaskData>;
    setResult(key:number,rs:ITaskResult):void;
    getNextData():IDataFormat|undefined;
}

export interface ITaskData{
    readonly id:number,
    readonly data:IDataFormat,
    status:TaskStatus,
    result:ITaskResult[]
}
export interface ITaskResult{
    ts:number,
    exeBy?:string,
    rs:boolean,
    data:any,
    id:number,
    action:DetailTaskActionType
}


