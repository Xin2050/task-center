import {TaskClient} from "../Client/Client";
import {TaskServer} from "../server/Server";
import {MainServer} from "../server/MainServer";
import {Socket} from "net";

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
export enum ServerState{
    Busy="Busy",
    Available="Available",
    Closed="Closed",
    Lost="Lost",
    Error="Error",
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
export type SendDataCallbackType= (socket:Socket)=>(data: any) => void;


export interface IRunAble{

    setStartCallBack(callback: () => void):void;
    setStopCallBack(callback: () => void):void;
    setConnectedCallBack(callback: () => void):void;
    stop():void;
    start():void;
    ///send(data:Buffer|string):void;

}

export interface IClient {
    address: string;
    state:ServerState
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



