import {Server, Socket} from "net";
import {ServerType} from "../interfaces/";

const colors = require('colors');
const net = require("net");


export interface IServer{

}

export class TaskServer implements IServer {
    server: Server;



    constructor(public port: number) {
       this.initServer();
    }

    private initServer() {
        this.server = net.createServer(function (socket: Socket) {
            console.log(colors.red(`🚀 Server is Activated.`));
            socket.on('connect', () => {
                console.log(colors.bgYellow(`🚀 Server is connect.`));
            })
                .on('data', (data:Buffer) => {

                    console.log(colors.blue(`🚀 Server get Data:${data} 
                    from :${socket.remoteAddress}:${socket.remotePort} ,${socket.remoteFamily}\``));

                    socket.write(JSON.stringify({test:"test1"}))

                })
                .on("close", () => {
                    console.log(colors.red("Server disConnected"));
                })
        });
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(colors.green(`🚀 Server is Listen at ${this.port}:`));
        })
    }

    stop() {
        this.server.close(() => {
            console.log(colors.green(`🚀 Server is Stopped!`));
        });
    }


}
