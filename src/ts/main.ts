import {hello} from "./greet";

function showHello(divName:string, name: string) {
        const elt = document.getElementById(divName);
        elt.innerText = hello(name);
}

showHello("gd", "Typescriptsssssssssssssssss");