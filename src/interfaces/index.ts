import {TaskClient} from "../Client/Client";
import {TaskServer} from "../server/Server";
import {MainServer} from "../server/MainServer";
import {Socket} from "net";
import {DetailTaskActionType} from "../task/TaskData";

export enum ServerType{
    MainServer = "MainServer",
    Server="Server",
    Client="Client"
}
export enum ServerState{

    Available="Available",
    Preparing ="Preparing",
    ReadyForExecute = "ReadyForExecute",
    Executing = "Executing",
    Done = "Done",
    Closed="Closed",
    Lost="Lost",
    Error="Error"
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

export enum ClientActionType{
    CheckServerStatus="CheckServerStatus",
    RequireAction = "RequireAction",
    ReturnResult = "ReturnResult",
    NOTHING= "CNOTHING",
    Processing = "Processing",
}
export enum ServerActionType{
    ExecuteAction="ExecuteAction",
    ResultReceived = "ResultReceived",
    ResponseStatusCheck = "ResponseStatusCheck",
    NOTHING= "SNOTHING"
}
export interface IPayload{
    action:DetailTaskActionType,
    data:any
}
export interface IMessage{
    type:ClientActionType|ServerActionType;
    payload: IPayload,
    sendBack:boolean
}

