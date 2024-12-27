import data from "./data.json";

class Key {
  constructor(key, start, end) {
    this.key = key; // phrase to match
    this.start = start; // first response to use
    this.end = end; // last response to use
    this.last = end; // response used last time
  }
}
let maxConj = 19;

const punctuation = [".", ",", "!", "?", ":", ";", "&", '"', "@", "#", "(", ")"];
const conj1 = [];
const conj2 = [];
const conj3 = [];
const conj4 = [];

conj1[0] = "are";
  conj2[0] = "am";
  conj1[1] = "am";
  conj2[1] = "are";
  conj1[2] = "were";
  conj2[2] = "was";
  conj1[3] = "was";
  conj2[3] = "were";
  conj1[4] = "I";
  conj2[4] = "you";
  conj1[5] = "me";
  conj2[5] = "you";
  conj1[6] = "you";
  conj2[6] = "me";
  conj1[7] = "my";
  conj2[7] = "your";
  conj1[8] = "your";
  conj2[8] = "my";
  conj1[9] = "mine";
  conj2[9] = "your's";
  conj1[10] = "your's";
  conj2[10] = "mine";
  conj1[11] = "I'm";
  conj2[11] = "you're";
  conj1[12] = "you're";
  conj2[12] = "I'm";
  conj1[13] = "I've";
  conj2[13] = "you've";
  conj1[14] = "you've";
  conj2[14] = "I've";
  conj1[15] = "I'll";
  conj2[15] = "you'll";
  conj1[16] = "you'll";
  conj2[16] = "I'll";
  conj1[17] = "myself";
  conj2[17] = "yourself";
  conj1[18] = "yourself";
  conj2[18] = "myself";

  // array to post process correct our tenses of pronouns such as "I/me"

  conj3[0] = "me am";
  conj4[0] = "I am";
  conj3[1] = "am me";
  conj4[1] = "am I";
  conj3[2] = "me can";
  conj4[2] = "I can";
  conj3[3] = "can me";
  conj4[3] = "can I";
  conj3[4] = "me have";
  conj4[4] = "I have";
  conj3[5] = "me will";
  conj4[5] = "I will";
  conj3[6] = "will me";
  conj4[6] = "will I";

  // Keywords
  let keyword = [];
  keyword[0] = new Key("CAN YOU", 1, 3);
  keyword[1] = new Key("CAN I", 4, 5);
  keyword[2] = new Key("YOU ARE", 6, 9);
  keyword[3] = new Key("YOU'RE", 6, 9);
  keyword[4] = new Key("I DON'T", 10, 13);
  keyword[5] = new Key("I FEEL", 14, 16);
  keyword[6] = new Key("WHY DON'T YOU", 17, 19);
  keyword[7] = new Key("WHY CAN'T I", 20, 21);
  keyword[8] = new Key("ARE YOU", 22, 24);
  keyword[9] = new Key("I CAN'T", 25, 27);
  keyword[10] = new Key("I AM", 28, 31);
  keyword[11] = new Key("I'M", 28, 31);
  keyword[12] = new Key("YOU", 32, 34);
  keyword[13] = new Key("I WANT", 35, 39);
  keyword[14] = new Key("WHAT", 40, 48);
  keyword[15] = new Key("HOW", 40, 48);
  keyword[16] = new Key("WHO", 40, 48);
  keyword[17] = new Key("WHERE", 40, 48);
  keyword[18] = new Key("WHEN", 40, 48);
  keyword[19] = new Key("WHY", 40, 48);
  keyword[20] = new Key("NAME", 49, 50);
  keyword[21] = new Key("CAUSE", 51, 54);
  keyword[22] = new Key("SORRY", 55, 58);
  keyword[23] = new Key("DREAM", 59, 62);
  keyword[24] = new Key("ELIZA", 63, 63);
  keyword[25] = new Key("TODAY", 63, 63);
  keyword[26] = new Key("MAYBE", 64, 68);
  keyword[27] = new Key("NO", 69, 73);
  keyword[28] = new Key("YOUR", 74, 75);
  keyword[29] = new Key("ALWAYS", 76, 79);
  keyword[30] = new Key("THINK", 80, 82);
  keyword[31] = new Key("ALIKE", 83, 89);
  keyword[32] = new Key("YES", 90, 92);
  keyword[33] = new Key("FRIEND", 93, 98);
  keyword[34] = new Key("COMPUTER", 99, 105);
  keyword[35] = new Key("NO KEY FOUND", 106, 112);
  keyword[36] = new Key("REPEAT INPUT", 113, 116);
  keyword[37] = new Key("HELLO", 117, 118);
  keyword[37] = new Key("OKAY", 83, 119);

  const response = data.response;
  let maxKey = 36;
  let keyNotFound = maxKey - 1;
  let max2ndConj = 7;
  

class Eliza1972 {

 

  // Function to replaces all occurrences of substring substr1 with substr2 within string
  // if type == 0 straight string replacement
  // if type == 1 assumes padded strings and replaces whole words only
  // if type == 2 non case sensitive assumes padded strings to compare whole word only
  // if type == 3 non case sensitive straight string replacement


   replaceStr(input, substr1, substr2, type) {
    let temp = "";
    let index = -1;
    let result = input;
    if (type === 0) {
      if (input?.indexOf(substr1) >= 0) {
        index = input.indexOf(substr1);
      }
    } else if (type === 1) {
      if (input.indexOf(" " + substr1 + " ") >= 0) {
        index = input.indexOf(" " + substr1 + " ") + 1;
      }
    } else if (type === 2) {
      let inputUpper = input.toUpperCase();
      let substring1Upper = substr1.toUpperCase();
      if (inputUpper.indexOf(" " + substring1Upper + " ") >= 0) {
        index = inputUpper.indexOf(" " + substring1Upper + " ") + 1;
      }
    } else {
      let inputUpper = input.toUpperCase();
      let substring1Upper = substr1.toUpperCase();
      if (inputUpper.indexOf(substring1Upper) >= 0) {
        index = inputUpper.indexOf(substring1Upper);
      }
    }
    if (index >= 0) {
      temp += input.substring(0, index) + substr2;
      result = input.substring(index + substr1.length, input.length);
      if (result.length > 0) {
       return this.replaceStr(result, substr1, substr2, type);
      }
    }
    return temp + result;
  }

  // Function to pad a string.. head, tail & punctuation

  
  padString(strng) {
    let aString = " " + strng + " ";
    for (let i = 0; i < punctuation.length; i++) {
      aString = this.replaceStr(aString, punctuation[i], " " + punctuation[i] + " ", 0);
    }
    return aString;
  }

  // Function to strip padding

 unpadString(strng) {
    let aString = strng;
    aString = this.replaceStr(aString, "  ", " ", 0); // compress spaces
    if (strng.charAt(0) === " ") {
      aString = aString.substring(1, aString.length);
    }
    if (strng.charAt(aString.length - 1) === " ") {
      aString = aString.substring(0, aString.length - 1);
    }
    for (let i = 0; i < punctuation.length; i++) {
      aString = this.replaceStr(aString, " " + punctuation[i], punctuation[i], 0);
    }
    return aString;
  }

  // Dress Input formatting i.e leading & trailing spaces and tail punctuation

  #ht = 0; // head tail steering

 strTrim(value) {
    
    let aString = "";
    let loc = 0;
    if (this.ht === 0) {
      loc = 0;
    } // head clip
    else {
      loc = value.length - 1;
    } // tail clip  ht = 1
    if (value.charAt(loc) === " ") {
      aString = value.substring(-(this.ht - 1), value.length - this.ht);
      aString = this.strTrim(aString);
    } else {
      var flg = false;
      for (let i = 0; i <= 5; i++) {
        flg = flg || value.charAt(loc) === punctuation[i];
      }
      if (flg) {
        aString = value.substring(-(this.ht - 1), value.length - this.ht);
      } else {
        aString = value;
      }
      if (aString !== value) {
        this.strTrim(aString);
      }
    }
    if (this.ht === 0) {
      this.ht = 1;
      this.strTrim(aString);
    } else {
      this.ht = 0;
    }
    return aString;
  }

  // adjust pronouns and verbs & such

  conjugate(sStrg) {
    // rephrases sString
    var sString = sStrg;
    for (var i = 0; i < maxConj; i++) {
      // decompose
      sString = this.replaceStr(sString, conj1[i], "#@&" + i, 2);
    }
    for (i = 0; i < maxConj; i++) {
      // recompose
      sString = this.replaceStr(sString, "#@&" + i, conj2[i], 2);
    }
    // post process the resulting string
    for (i = 0; i < max2ndConj; i++) {
      // decompose
      sString = this.replaceStr(sString, conj3[i], "#@&" + i, 2);
    }
    for (i = 0; i < max2ndConj; i++) {
      // recompose
      sString = this.replaceStr(sString, "#@&" + i, conj4[i], 2);
    }
    return sString;
  }

  // Build our response string
  // get a random choice of response based on the key
  // Then structure the response

  
  #thisstr = "";


  phrase(sString, keystart) {
    let pass = 0;
    var startmin = keyword[keystart].start;
    var idrange = keyword[keystart].end - startmin + 1;
    var choice = keyword[keystart].start + Math.floor(Math.random() * idrange);
    if (choice === keyword[keystart].last && pass < 5) {
      pass++;
      this.phrase(sString, keystart);
    }
    keyword[keystart].last = choice;
    var rTemp = response[choice];
    var tempt = rTemp.charAt(rTemp.length - 1);
    if (tempt === "*" || tempt === "@") {
      var sTemp = this.padString(sString);
      var wTemp = sTemp.toUpperCase();
      var strpstr = wTemp.indexOf(" " + keyword[keystart].key + " ");
      strpstr += keyword[keystart].key.length + 1;
      let thisstr = this.conjugate(sTemp.substring(strpstr, sTemp.length));
      thisstr = this.strTrim(this.unpadString(thisstr));
      if (tempt === "*") {
        sTemp = this.replaceStr(rTemp, "<*", " " + thisstr + "?", 0);
      } else {
        sTemp = this.replaceStr(rTemp, "<@", " " + thisstr + ".", 0);
      }
    } else sTemp = rTemp;
    return sTemp;
  }

  // returns array index of first key found

  
  #keyid = 0;
 testkey(wString) {
    if (
      this.keyid < keyNotFound &&
      !(wString.indexOf(" " + keyword[this.keyid].key + " ") >= 0)
    ) {
        this.keyid++;
      this.testkey(wString);
    }
  }
 findkey(wString) {
    this.keyid = 0;
    this.testkey(wString);
    if (this.keyid >= keyNotFound) {
        this.keyid = keyNotFound;
    }
    return this.keyid;
  }
  // This is the entry point and the I/O of this code




  listen(User) {
    let wTopic = ""; // Last worthy responce
    let sTopic = ""; // Last worthy responce
  
    let wPrevious = ""; // so we can check for repeats
  
    let sInput = this.strTrim(User); // dress input formatting
    if (sInput !== "") {
      const wInput = this.padString(sInput.toUpperCase()); // Work copy
      let foundkey = maxKey; // assume it's a repeat input
      if (wInput !== wPrevious) {
        // check if user repeats himself
        foundkey = this.findkey(wInput); // look for a keyword.
      }
      if (foundkey === keyNotFound) {

        wPrevious = wInput; // save input to check repeats
        if (sInput.length < 10 && wTopic !== "" && wTopic !== wPrevious) {
          let lTopic = this.conjugate(sTopic);
          sTopic = "";
          wTopic = "";
          return 'OK... "' + lTopic + '". Tell me more.';
        } else {
          if (sInput.length < 15) {
            return "Tell me more...";
          } else {
            return this.phrase(sInput, foundkey);
          }
        }

      } else {
        if (sInput.length > 12) {
          sTopic = sInput;
          wTopic = wInput;
        }

        wPrevious = wInput; // save input to check repeats
        return this.phrase(sInput, foundkey); // Get our response
      }
    } else {
      return "I can't help, if you will not chat with me!";
    }
  }

 

}

export default Eliza1972;
