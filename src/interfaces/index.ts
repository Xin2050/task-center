import {TaskClient} from "../Client/Client";
import {TaskServer} from "../server/Server";
import {MainServer} from "../server/MainServer";

export enum TaskStatus {
    Prepare,
    Dispatched,
    Done,
    Error,
    Retry,
    Running
}
export enum ServerType{
    MainServer = "MainServer",
    Server="Server",
    Client="Client"
}
export enum ClientState{
    Busy="Busy",
    Available="Available",
    Closed="Closed",
    Lost="Lost"
}
export interface ServerAddress {
    readonly ip: string;
    readonly port: number
}

export interface IServerConfig{
    mainServer:ServerAddress;
    servers: ServerAddress[];
}
export interface ISingleRunner{
    serverDefinition:ServerDefinition;
    instance:TaskClient|TaskServer|MainServer
}
export interface ServerDefinition{
    type:ServerType;
    address:string;
    port:number;
}

export interface IRunnerAble{
    stop():void;
    start():void;
    afterStart(callback:(data:any)=>void):void;
    setDataCallBack(dataCallBack?:(data:any)=>void):void;
}

export interface IClient {
    address: string;
    state:ClientState
}

export interface ITodoItem {
    id: number;
    status: TaskStatus;
    updateAT:Date;
    runAt:IClient
}


export type TodoListType = ITodoItem[];

export interface ITask{
    start():void;
    getStatue():TaskStatus
}



