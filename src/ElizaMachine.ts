import data from "./data.json";

const elizaResponses = data.response;
const keywords = data.keywords;

const removeKeyFromResponse = (userInput: string, key: string) => userInput.substring(userInput.toLowerCase().indexOf(key.toLowerCase()) + key.length)

const findKeyWordIndex = (userInput: string) => keywords.findIndex((e) => userInput.toLowerCase().includes(e.key.toLowerCase()))

const phrase = (userInput: string, index : number): string => {

    const foundKeyword = keywords[index];
    const range = foundKeyword.end - foundKeyword.id + 1;
    const choice = foundKeyword.id + Math.floor(Math.random() * range);
   

    let temp = elizaResponses[choice];

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

    if (index === -1) {

        if (userInput.length < 10) {
            return `OK... "${userInput}". Tell me more.`;
        }

        if (userInput.length < 15) {
            return "Tell me more...";
        }
    }

    return phrase(userInput, index);
}