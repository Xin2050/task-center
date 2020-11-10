import ARunAble from "../interfaces/ARunAble";
import {IRunAble, SendDataCallbackType, ServerState} from "../interfaces/";
import {Server, Socket} from "net";
import colors from 'colors';
import net from 'net';
const {exec} = require("child_process");

abstract class AServer extends ARunAble implements IRunAble {
    private server: Server;
    constructor(public port: number) {
        super();

    }
    abstract dataCallBack:  (socket:Socket)=>(data: any) => void;

    startCallBack: () => void = () => {
        console.log(colors.green(`🚀 Server is Listen at ${this.port}:`));
    };
    connectedCallBack:()=> void = ()=> {
        console.log(colors.bgYellow(`🚀 Server is connect.`));
    }

    stopCallBack:()=>void = ()=>{
        console.log(colors.bgYellow(`🚀 Connection is disconnected.`));
    }

    start():void{
        if(this.dataCallBack && this.startCallBack && this.stopCallBack && this.connectedCallBack){
            this.serverState = this.connect();
        }else{
            throw Error("You have to set all the call back functions!")
        }

    }
    stop() {
        this.server.close(this.stopCallBack);
    }
    connect():ServerState{
        const connectListener = (socket: Socket) =>{
            socket.on('connect', this.connectedCallBack)
                .on('data',this.dataCallBack(socket))
                .on("close", this.stopCallBack)
        }
        try {
            this.server = net.createServer(connectListener);
            this.server.listen(this.port, this.startCallBack).on('error',(e:any)=>{
                if (e.code === 'EADDRINUSE') {
                    console.log(colors.red("Port in used, restart...."));
                    exec(`kill $(lsof -t -i:${this.port})`,()=>{
                        setTimeout(() => {
                            this.server.close();
                            this.server.listen(this.port);
                        }, 1000);
                    })
                }
            })
            return ServerState.Available;
        }catch (e){
            console.log(colors.red("Server start failed!"));
            return(ServerState.Error);
        }
    }


}


export default AServer;