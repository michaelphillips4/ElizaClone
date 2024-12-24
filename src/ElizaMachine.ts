import data from "./data.json";

const elizaResponses = data.response;
const keywords = data.keywords;

const removeKeyFromResponse = (userInput: string, key: string) => userInput.substring(userInput.toLowerCase().indexOf(key.toLowerCase()) + key.length)

const findKeyWordIndex = (userInput: string) => { 
   // userInput = userInput + " ";
   return  keywords.findIndex((e) => {

   const found = userInput.toLowerCase().includes(e.key.toLowerCase() ) ;
   if(found) console.log("matched key " + e.key,e);
   return found }
)
}

const getRandomInt = (min:number, max:number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const phrase = (userInput: string, index : number): string => {

    const foundKeyword = keywords[index];
    const next = getRandomInt(foundKeyword.id,foundKeyword.end); 
    console.log(`Phrase ${next}`,foundKeyword)

    let temp = elizaResponses[next];

    if (temp.endsWith("<*")) {
        temp = temp.replace("<*", ` ${removeKeyFromResponse(userInput.toLowerCase(), foundKeyword.key.toLowerCase())}?`);
    }

    if (temp.endsWith("<@")) {
        temp = temp.replace("<@", ` ${removeKeyFromResponse(userInput.toLowerCase(), foundKeyword.key.toLowerCase())}.`);
    }

    return temp;
}

export function getElizaResponseToInput(userInput: string): string {

    userInput = userInput.trim();

    if (userInput === "") {
        return "I can't help, if you will not chat with me!";
    }

    let index = findKeyWordIndex(userInput)

    console.log("key word index " + index);   


    if (index === -1) {

        const part = [
            "Tell me more... ",
            "Please continue...",
            "Interesting...",
            "Do Continue...","Ok...",
            "I see...",
            "Come come elucidate your thoughts...",
            "I am not sure I understand you fully...",
            "What do you think..."]
    
        const r = getRandomInt(0, part.length -1)

        if (userInput.length < 10) {
            return `OK... "${userInput}". ${part[r]}`;
        }

        if (userInput.length < 15) {
            return `${part[r]} "${userInput}".`;
        }

       return part[r];
    }

    return phrase(userInput, index);
}
