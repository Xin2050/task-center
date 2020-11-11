class Machine {
    constructor(public name:string) {};
    price:number;
    measure:{
        weight:number;
        height:number;
        long:number;
    };
    ports:Array<String> = [];
    addPort(port:string):Machine{
        this.ports.push(port);
        return this
    }
    printAllPorts():void{
        this.ports.forEach(p=>console.log(p));
    }
    turnOn():void{
        console.log("I can run");
    }
    turnOff():void{
        console.log("I'm off");
    }
    print(afterPrintCallBackFunction: (data:string) => void ):void{
        const page = "this is a page that I printed"
        console.log(page);
        afterPrintCallBackFunction(page);
    }
}
class MacBook extends Machine{
    constructor(name:string) {
        super(name);
    }
    turnOff():void{
        console.log("mac off");
    }
    runMacOS():void{
        console.log("I can run MacOS");
    }
}
const mac = new MacBook("Mac Book Pro 2020 13'");
console.log(mac.name);
mac.addPort("lighting").addPort("3.5").addPort("power");
mac.printAllPorts();
mac.turnOn();
mac.print((data)=>{
    console.log(data.toUpperCase());
})
mac.runMacOS();
mac.turnOff();

