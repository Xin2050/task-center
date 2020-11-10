import {Socket} from "net";
import {ClientActionType, IMessage, ServerActionType, ServerState} from "../interfaces/";
import AClient from "./AClient";
import {DetailTaskActionType, TaskActionExecuter} from "../task/TaskData";

const colors = require('colors');
const net = require("net");

const NOTHING:IMessage = {
    type:ServerActionType.NOTHING,
    payload: {
        action:DetailTaskActionType.Nothing,
        data:{}
    },
    sendBack:false
}

export class TaskClient extends AClient{
    client: Socket;


    constructor(public port: number,
                public serverAddress: string
                ) {
        super(port,serverAddress);
    };

    dataCallBack:(data:any)=>void = (data)=>{
        console.log(colors.bgMagenta(`✉️  Client get Data:${data} from :${this.getServerName()} `));
        data = JSON.parse(data);
        const rsdata:IMessage = this.responseAction(data)
        if(rsdata.sendBack){
            this.client.write(JSON.stringify(rsdata));
        }
        // Directly send a data back to server, gonna create a non-stop loop.
        // this.client.write("I got your send data!");
    }

    send(data:IMessage){
        if(this.client.writable){
            this.client.write(JSON.stringify(data));
        }
    }

    responseAction(message:IMessage):IMessage{
        const {type,payload,sendBack} = message;
        switch (type){
            case ServerActionType.ResponseStatusCheck:
                if(payload.data===ServerState.Available){
                    return {
                        type:ClientActionType.RequireAction,
                        payload:{
                            action:DetailTaskActionType.First, //run first action
                            data:{}
                        },
                        sendBack:true
                    }
                }else{
                    return NOTHING
                }
            case ServerActionType.ExecuteAction:
                this.setStatus(ServerState.Executing);
                TaskActionExecuter(payload.action ,payload.data).then((resolve:any) => {
                    this.setStatus(ServerState.Preparing);
                    //send result back to server
                    this.send({
                        type:ClientActionType.ReturnResult,
                        payload:{
                            action:resolve.action,
                            data:resolve
                        },
                        sendBack:true
                    })
                });
                return NOTHING;

            case ServerActionType.NOTHING:
                return NOTHING;
            default:
                return NOTHING;
        }

    }




}
