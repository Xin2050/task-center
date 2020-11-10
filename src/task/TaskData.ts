
import faker from 'faker';
import {ITaskResult} from "../interfaces/tasks";
import TestTask from "../test/TestTask";
import {TaskDataManager} from "./TaskDataManager";

/*
load your data. set your onw data format
 */

export interface IDataFormat {
    readonly id:number;
    readonly name: string;
    readonly address: string;
    readonly phone: string;
    readonly creditCardNumber:string;
}


class TaskData {

    static getData() :Map<number,IDataFormat> {
        const TestData = new Map<number,IDataFormat> ();

        for(let i=0;i<10;i++){
            TestData.set(i,{
                id:i,
                name:faker.name.firstName(),
                address:faker.address.streetAddress(),
                phone:faker.phone.phoneNumber(),
                creditCardNumber:faker.finance.creditCardNumber()
            })
        }
        return TestData;
    }

}

export const enum DetailTaskActionType{
    Nothing="Nothing",//this is for do nothing, do not change
    First="First", //this is hard code , do not change, below will be your action type
    Login="Login",
    MainTask ="MainTask",
    SecondTask="SecondTask",
}




export interface IAction{
    id:number;
    name:DetailTaskActionType;
    isNeedRequireData:boolean;
    isNeedUpdateResult:boolean
}
class Node{
    next:Node |null = null;
    constructor(public action:IAction) {
    }
}

export class LinkedActionList {
    head: Node |null = null;

    private static instance:LinkedActionList;
    private constructor(){
        //Load your Action in order
        const mylist:IAction[] = TestTask.getTaskActionArray()
        for(let a of mylist){
            this.add(a);
        }
    }
    public static getInstance():LinkedActionList{
        if(!LinkedActionList.instance){
            LinkedActionList.instance = new LinkedActionList();
        }
        return LinkedActionList.instance;
    }


    add(action:IAction):LinkedActionList{
        const node = new Node(action);
        if(!this.head){
            this.head = node;
            return this;
        }
        let tail = this.head;
        while(tail.next){
            tail = tail.next;
        }
        tail.next = node;
        return this;
    }

    getFirstAction():IAction{
        if(!this.head){
            throw new Error("Action List is empty")
        }
        return this.head.action;
    }
    isLast(action:DetailTaskActionType):boolean{
        if(!this.head){
            throw new Error("Action List is empty");
        }
        let node:Node|null = this.head;
        while(node){
            if(node.action.name===action){
                return !node.next;
            }
            node = node.next;
        }
        throw new Error("Action name is not found");
    }
    getAction(action:DetailTaskActionType):IAction{
        if(!this.head){
            throw new Error("Action List is empty");
        }
        let node:Node|null = this.head;
        while(node){
            if(node.action.name===action){
                return node.action;
            }
            node = node.next;
        }
        throw new Error("actionName is not found");
    }
    getNextAction(action:DetailTaskActionType):IAction{
        if(!this.head){
            throw new Error("Action List is empty")
        }
        let node:Node|null = this.head;
        if(action===DetailTaskActionType.First){
            return node.action;
        }
        while(node){
            if (node.action.name===action){
                if(node.next?.action){
                    return node.next.action
                }else{
                    throw new Error("Action List is no NextAction")
                }
            }
            node = node.next;
        }
        throw new Error("actionName is not found");
    }


}



export const TaskActionExecuter:(action:string,payload:any)=> Promise<any> = (action,payload)=>{
    switch (action){
        case DetailTaskActionType.Login:
            return TestTask.login(payload);
        case DetailTaskActionType.MainTask:
            return TestTask.mainTask(payload);
        default:
            return emptyPromise;
    }

}

export const emptyPromise = new Promise((resolve)=>{
    resolve(null);
})

export default TaskData;

// const list = LinkedActionList.getInstance();
//
// console.log(list.getAction(DetailTaskActionType.MainTask));
