import data from "../Data/data.json";

// Keywords

const keyword = [];

keyword[0] = new key(" CAN YOU ", 1, 3);
keyword[1] = new key(" CAN I ", 4, 5);
keyword[2] = new key(" YOU ARE ", 6, 9);
keyword[3] = new key(" YOU'RE ", 6, 9);
keyword[4] = new key(" I DON'T ", 10, 13);
keyword[5] = new key(" I FEEL ", 14, 16);
keyword[6] = new key(" WHY DON'T YOU ", 17, 19);
keyword[7] = new key(" WHY CAN'T I ", 20, 21);
keyword[8] = new key(" ARE YOU ", 22, 24);
keyword[9] = new key(" I CAN'T ", 25, 27);
keyword[10] = new key(" I AM ", 28, 31);
keyword[11] = new key(" I'M ", 28, 31);
keyword[12] = new key(" YOU ", 32, 34);
keyword[13] = new key(" I WANT ", 35, 39);
keyword[14] = new key(" WHAT ", 40, 48);
keyword[15] = new key(" HOW ", 40, 48);
keyword[16] = new key(" WHO ", 40, 48);
keyword[17] = new key(" WHERE ", 40, 48);
keyword[18] = new key(" WHEN ", 40, 48);
keyword[19] = new key(" WHY ", 40, 48);
keyword[20] = new key(" NAME ", 49, 50);
keyword[21] = new key(" CAUSE ", 51, 54);
keyword[22] = new key(" SORRY ", 55, 58);
keyword[23] = new key(" DREAM ", 59, 62);
keyword[24] = new key(" ELIZA ", 63, 63);
keyword[25] = new key(" TODAY ", 63, 63);
keyword[26] = new key(" MAYBE ", 64, 68);
keyword[27] = new key(" NO ", 69, 73);
keyword[28] = new key(" YOUR ", 74, 75);
keyword[29] = new key(" ALWAYS ", 76, 79);
keyword[30] = new key(" THINK ", 80, 82);
keyword[31] = new key(" ALIKE ", 83, 89);
keyword[32] = new key(" YES ", 90, 92);
keyword[33] = new key(" FRIEND ", 93, 98);
keyword[34] = new key(" COMPUTER ", 99, 105);
keyword[35] = new key(" NO KEY FOUND ", 106, 112);
keyword[36] = new key(" REPEAT INPUT ", 113, 116);
keyword[37] = new key(" HELLO ", 117, 118);
keyword[37] = new key(" OKAY ", 83, 119);


function key(key, idx, end) {
    this.key = key; // phrase to match
    this.idx = idx; // first response to use
    this.end = end; // last response to use
    this.last = end; // response used last time
  }


  const punct = [".", "!", "?",];

class ElizaMachine
{

respond(sentance)
{
// does it contain a key word ?
const keyword = this.findKeyWord(sentance);

if(keyword)
{
    const c = this.getChoice(keyword,0);



}





}

findKeyWord(sentance)
{
   const searchText = ` ${sentance.toUpperCase()} `; 
   return keyword.reverse().find((e) => searchText.includes(e.key)) ;
}

getChoice(key,retryies)
{
    var idxmin = key.idx;
    var range = key.end - idxmin + 1;
    var choice = key.idx + Math.floor(Math.random() * range);
    if (choice === key.last && retryies < 5) {
        retryies++;
      this.getChoice(key,retryies);
    }
    key.last = choice;
    return data.response[choice];
}

getUnfoundPart(choice,keyword,sentance)
{   let result = choice;
    console.log(choice);
    if (choice.endsWith("*" ) || choice.endsWith("@"))
    {
      
        const text = sentance.toUpperCase() ; 
        var i = text.indexOf(keyword.key) + keyword.key.length ;
        var x = sentance.substring(i,text.length);
        punct.forEach((e) => {
           if(x.endsWith(e))
           { 
            x = x.slice(0, -1) ;
            }
        } );
       
        if (choice.endsWith("*" ) ) {

            result = choice.replace("<*", ` ${x}?`);
            
          } else {
            result  = choice.replace("<@", ` ${x}.`);
           
          }
       


    }
    console.log(result);
    return result;
}

}
export default ElizaMachine;