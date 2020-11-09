import {Socket} from "net";
import {ServerState, IRunAble, ServerType} from "../interfaces/";
import AClient from "./AClient";

const colors = require('colors');
const net = require("net");




export class TaskClient extends AClient{
    client: Socket;

    constructor(public port: number,
                public serverAddress: string
                ) {
        super(port,serverAddress);
    };

    dataCallBack:(data:any)=>void = (data)=>{
        console.log(colors.bgMagenta(`✉️  Client get Data:${data} from :${this.getServerName()} `));

        // Directly send a data back to server, gonna create a non-stop loop.
        // this.client.write("I got your send data!");
    }

    send(data:any){

        if(this.client.writable){
            this.client.write(JSON.stringify(data));
        }

    }





}
