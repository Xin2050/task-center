import os from "os";


import {ISingleRunner, ServerAddress,
    ServerDefinition, ServerType} from "./interfaces/";
import {TaskClient} from "./Client/Client";
import {MainServer} from "./server/MainServer";
import {TaskServer} from "./server/Server";
import colors from 'colors';
import {ServerConfig} from "./index";


export class SingleRun{
    //this method could be called by adminport to setup a client's server
    public static setAServer(newServerAddress:ServerAddress):void{
        SingleRun.pointedServer = newServerAddress;
    }
    //just post to a default value for dev
    public static pointedServer:ServerAddress = {
        ip:"10.1.0.7",
        port:3000
    }
    public static instance:ISingleRunner

    static getInstance():ISingleRunner{
        if(!SingleRun.pointedServer){
            console.log(colors.bgRed("You have to setup a Server To Me!!"));
            throw new Error("No Client's Server Definition !!!");
        }

        if(!SingleRun.instance){
            //1. find who I am
            const serverDefinition = WhoAmI();
            let instance;
            switch (serverDefinition.type){
                case ServerType.Server:
                    instance = new TaskServer(serverDefinition.port);
                case ServerType.MainServer:
                    instance = new MainServer(serverDefinition.port);
                case ServerType.Client:
                    //should sent a Server to This client
                    instance = new TaskClient(SingleRun.pointedServer.port,
                        SingleRun.pointedServer.ip)
            }
            SingleRun.instance = {
                serverDefinition,instance
            }
        }
        return SingleRun.instance;
    }
}

function WhoAmI():ServerDefinition{
    const _ = require('lodash');
    const nt:NodeJS.Dict<os.NetworkInterfaceInfo[]> =  os.networkInterfaces();
    const addressList:string[] = []
    const keys = _.mapValues(nt,(item:os.NetworkInterfaceInfo[])=>{
        item.forEach((o)=>{
            addressList.push(o.address);
        })
    })

    if(addressList.includes(ServerConfig.mainServer.ip)){
        return {
            type:ServerType.MainServer,
            port:ServerConfig.mainServer.port,
            address:ServerConfig.mainServer.ip
        }
    }
    ServerConfig.servers.forEach((s) => {
        if(addressList.includes(s.ip)){
            return {
                type:ServerType.Server,
                port:s.port,
                address:s.ip
            }
        }
    })
    return {
        type:ServerType.Client,
        address:"",
        port:0
    }
}