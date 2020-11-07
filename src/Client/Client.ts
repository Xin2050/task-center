import {Server, Socket} from "net";
import {ClientState, IRunnerAble, ServerType} from "../interfaces/";

const colors = require('colors');
const net = require("net");


export interface IClient extends IRunnerAble{

}

export class TaskClient implements IClient {
    client: Socket;

    constructor(public port: number,
                public serverAddress: string,
                public dataCallBack?:(data:any)=>void) {};

    public setDataCallBack(dataCallBack?:(data:any)=>void){
        this.dataCallBack = dataCallBack;
    }

    connect():Promise<ClientState> {
        if(!this.dataCallBack){
            this.dataCallBack = ()=>{
                console.log(colors.bgMagenta("Your Have to Set a Data Call Back Function to this client"));
            }
        }
        return new Promise((resolve,reject)=>{
            this.client = net.createConnection({port: this.port, host: this.serverAddress}, () => {
                console.log(colors.bgMagenta(`🚀 Client ${this.client.localAddress}:${this.client.localPort} is Connect Server: ${this.serverAddress}:${this.port}:`));
                resolve(ClientState.Available);
            }).on('data', (data: Buffer) => {
                console.log( colors.bgYellow(`${this.client.localAddress}:${this.client.localPort}`),
                    colors.bgYellow(`✉️ Client get Data:${data}`));
                if(this.dataCallBack) {
                    this.dataCallBack("finished data");
                }else{
                    console.log("No Data Callback");
                }
            }).on('close', () => {
                console.log(colors.bgMagenta(`🚀 Client ${this.client.localAddress}:${this.client.localPort} is disConnected from Server`));
            }).on("error",(error:any)=>{
                console.log(colors.bgMagenta(`🚀 Client ${this.client.localAddress}:${this.client.localPort} has Error :${error}`));
                reject(ClientState.Lost);
            })
        })

    }

    send(data:any){
        if(this.client.writable){
            this.client.write(JSON.stringify(data));
        }
    }

    afterStart(callback: (data: any) => void): void {

    }

    start(): void {
    }

    stop(): void {
    }

}
