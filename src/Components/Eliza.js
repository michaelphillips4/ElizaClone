import data from "../Data/data.json";
import React, { useState } from 'react';

function Eliza() {

  const [chatter, setChatter] = useState([{ name: "Eliza", text: "Hello how can I help you today." }]);
  const [input, setInput] = useState("");


  const response = data.response;
  let maxKey = 36;
  let keyNotFound = maxKey - 1;
  let keyword = data.keyword;

/*   function key(key, idx, end) {
    this.key = key; // phrase to match
    this.idx = idx; // first response to use
    this.end = end; // last response to use
    this.last = end; // response used last time
  } */

  
  // Funtion to replaces all occurances of substring substr1 with substr2 within strng
  // if type == 0 straight string replacement
  // if type == 1 assumes padded strings and replaces whole words only
  // if type == 2 non case sensitive assumes padded strings to compare whole word only
  // if type == 3 non case sensitive straight string replacement

  var RPstrg = "";

  function replaceStr(strng, substr1, substr2, type) {
    var pntr = -1;
    let aString = strng;
    if (type === 0) {
      if (strng.indexOf(substr1) >= 0) {
        pntr = strng.indexOf(substr1);
      }
    } else if (type === 1) {
      if (strng.indexOf(" " + substr1 + " ") >= 0) {
        pntr = strng.indexOf(" " + substr1 + " ") + 1;
      }
    } else if (type === 2) {
      let bstrng = strng.toUpperCase();
      let bsubstr1 = substr1.toUpperCase();
      if (bstrng.indexOf(" " + bsubstr1 + " ") >= 0) {
        pntr = bstrng.indexOf(" " + bsubstr1 + " ") + 1;
      }
    } else {
      let bstrng = strng.toUpperCase();
      let bsubstr1 = substr1.toUpperCase();
      if (bstrng.indexOf(bsubstr1) >= 0) {
        pntr = bstrng.indexOf(bsubstr1);
      }
    }
    if (pntr >= 0) {
      RPstrg += strng.substring(0, pntr) + substr2;
      aString = strng.substring(pntr + substr1.length, strng.length);
      if (aString.length > 0) {
        replaceStr(aString, substr1, substr2, type);
      }
    }
    aString = RPstrg + aString;
    RPstrg = "";
    return aString;
  }

  // Function to pad a string.. head, tail & punctuation

  const punct = [".", ",", "!", "?", ":", ";", "&", '"', "@", "#", "(", ")"];

  function padString(strng) {
    let aString = " " + strng + " ";
    for (let i = 0; i < punct.length; i++) {
      aString = replaceStr(aString, punct[i], " " + punct[i] + " ", 0);
    }
    return aString;
  }



  // Function to strip padding

  function unpadString(strng) {
    var aString = strng;
    aString = replaceStr(aString, "  ", " ", 0); // compress spaces
    if (strng.charAt(0) === " ") {
      aString = aString.substring(1, aString.length);
    }
    if (strng.charAt(aString.length - 1) === " ") {
      aString = aString.substring(0, aString.length - 1);
    }
    for (let i = 0; i < punct.length; i++) {
      aString = replaceStr(aString, " " + punct[i], punct[i], 0);
    }
    return aString;
  }

  // Dress Input formatting i.e leading & trailing spaces and tail punctuation

  var ht = 0; // head tail stearing

  function strTrim(strng) {
    let aString;
    let loc;
    if (ht === 0) {
      loc = 0;
    } // head clip
    else {
      loc = strng.length - 1;
    } // tail clip  ht = 1
    if (strng.charAt(loc) === " ") {
      aString = strng.substring(-(ht - 1), strng.length - ht);
      aString = strTrim(aString);
    } else {
      var flg = false;
      for (let i = 0; i <= 5; i++) {
        flg = flg || strng.charAt(loc) === punct[i];
      }
      if (flg) {
        aString = strng.substring(-(ht - 1), strng.length - ht);
      } else {
        aString = strng;
      }
      if (aString !== strng) {
        strTrim(aString);
      }
    }
    if (ht === 0) {
      ht = 1;
      strTrim(aString);
    } else {
      ht = 0;
    }
    return aString;
  }

  // adjust pronouns and verbs & such

  function conjugate(sStrg) {
    // rephrases sString
    var sString = sStrg;
    for (var i = 0; i < data.conj1.length; i++) {
      // decompose
      sString = replaceStr(sString, data.conj1[i], "#@&" + i, 2);
    }
    for (i = 0; i < data.conj2.length; i++) {
      // recompose
      sString = replaceStr(sString, "#@&" + i, data.conj2[i], 2);
    }
    // post process the resulting string
    for (i = 0; i < data.conj3length; i++) {
      // decompose
      sString = replaceStr(sString, data.conj3[i], "#@&" + i, 2);
    }
    for (i = 0; i < data.conj4.length; i++) {
      // recompose
      sString = replaceStr(sString, "#@&" + i, data.conj4[i], 2);
    }
    return sString;
  }

  // Build our response string
  // get a random choice of response based on the key
  // Then structure the response

  var pass = 0;
  var thisstr = "";


  function phrase(sString, keyidx) {
    var idxmin = keyword[keyidx].idx;
    var idrange = keyword[keyidx].end - idxmin + 1;
    var choice = keyword[keyidx].idx + Math.floor(Math.random() * idrange);
    if (choice === keyword[keyidx].last && pass < 5) {
      pass++;
      phrase(sString, keyidx);
    }
    keyword[keyidx].last = choice;
    var rTemp = response[choice];
    var tempt = rTemp.charAt(rTemp.length - 1);
    if (tempt === "*" || tempt === "@") {
      var sTemp = padString(sString);
      var wTemp = sTemp.toUpperCase();
      var strpstr = wTemp.indexOf(" " + keyword[keyidx].key + " ");
      strpstr += keyword[keyidx].key.length + 1;
      thisstr = conjugate(sTemp.substring(strpstr, sTemp.length));
      thisstr = strTrim(unpadString(thisstr));
      if (tempt === "*") {
        sTemp = replaceStr(rTemp, "<*", " " + thisstr + "?", 0);
      } else {
        sTemp = replaceStr(rTemp, "<@", " " + thisstr + ".", 0);
      }
    } else sTemp = rTemp;
    return sTemp;
  }

  // returns array index of first key found

  var keyid = 0;

  function testkey(wString) {
    if (
      keyid < keyNotFound &&
      !(wString.indexOf(" " + keyword[keyid].key + " ") >= 0)
    ) {
      keyid++;
      testkey(wString);
    }
  }
  function findkey(wString) {
    keyid = 0;
    testkey(wString);
    if (keyid >= keyNotFound) {
      keyid = keyNotFound;
    }
    return keyid;
  }

  // This is the entry point and the I/O of this code

  var wTopic = ""; // Last worthy responce
  var sTopic = ""; // Last worthy responce

  var wPrevious = ""; // so we can check for repeats



  function listen(User) {
    let sInput = User;


    //clearTimeout(Rtimer);
    //  setTimeout(wakeup, 30000); // wake up call

    sInput = sInput.trim(); // dress input formating
    //sInput = strTrim(sInput); // dress input formating
    if (sInput !== "") {
      var wInput = padString(sInput.toUpperCase()); // Work copy
      var foundkey = maxKey; // assume it's a repeat input
      if (wInput !== wPrevious) {
        // check if user repeats himself
        foundkey = findkey(wInput); // look for a keyword.
      }
      if (foundkey === keyNotFound) {

        wPrevious = wInput; // save input to check repeats
        if (sInput.length < 10 && wTopic !== "" && wTopic !== wPrevious) {
          let lTopic = conjugate(sTopic);
          sTopic = "";
          wTopic = "";
          return 'OK... "' + lTopic + '". Tell me more.';
        } else {
          if (sInput.length < 15) {
            return "Tell me more...";
          } else {
            return phrase(sInput, foundkey);
          }
        }

      } else {
        if (sInput.length > 12) {
          sTopic = sInput;
          wTopic = wInput;
        }

        wPrevious = wInput; // save input to check repeats
        return phrase(sInput, foundkey); // Get our response
      }
    } else {
      return "I can't help, if you will not chat with me!";
    }
  }
  /*  function wakeup() {
     var strng1 = "    *** Are We going to Chat? ***";
     var strng2 = "  I can't help you without a dialog!";
     update(strng1, strng2);
   } */

  
  // array to post process correct our tenses of pronouns such as "I/me"

  // Keywords

  /* keyword[0] = new key("CAN YOU", 1, 3);
  keyword[1] = new key("CAN I", 4, 5);
  keyword[2] = new key("YOU ARE", 6, 9);
  keyword[3] = new key("YOU'RE", 6, 9);
  keyword[4] = new key("I DON'T", 10, 13);
  keyword[5] = new key("I FEEL", 14, 16);
  keyword[6] = new key("WHY DON'T YOU", 17, 19);
  keyword[7] = new key("WHY CAN'T I", 20, 21);
  keyword[8] = new key("ARE YOU", 22, 24);
  keyword[9] = new key("I CAN'T", 25, 27);
  keyword[10] = new key("I AM", 28, 31);
  keyword[11] = new key("I'M", 28, 31);
  keyword[12] = new key("YOU", 32, 34);
  keyword[13] = new key("I WANT", 35, 39);
  keyword[14] = new key("WHAT", 40, 48);
  keyword[15] = new key("HOW", 40, 48);
  keyword[16] = new key("WHO", 40, 48);
  keyword[17] = new key("WHERE", 40, 48);
  keyword[18] = new key("WHEN", 40, 48);
  keyword[19] = new key("WHY", 40, 48);
  keyword[20] = new key("NAME", 49, 50);
  keyword[21] = new key("CAUSE", 51, 54);
  keyword[22] = new key("SORRY", 55, 58);
  keyword[23] = new key("DREAM", 59, 62);
  keyword[24] = new key("ELIZA", 63, 63);
  keyword[25] = new key("TODAY", 63, 63);
  keyword[26] = new key("MAYBE", 64, 68);
  keyword[27] = new key("NO", 69, 73);
  keyword[28] = new key("YOUR", 74, 75);
  keyword[29] = new key("ALWAYS", 76, 79);
  keyword[30] = new key("THINK", 80, 82);
  keyword[31] = new key("ALIKE", 83, 89);
  keyword[32] = new key("YES", 90, 92);
  keyword[33] = new key("FRIEND", 93, 98);
  keyword[34] = new key("COMPUTER", 99, 105);
  keyword[35] = new key("NO KEY FOUND", 106, 112);
  keyword[36] = new key("REPEAT INPUT", 113, 116);
  keyword[37] = new key("HELLO", 117, 118);
  keyword[37] = new key("OKAY", 83, 119);
 */


  return <div>
    <main>
      <article>
        <p>

          <span className="animate-flicker"><b>Eliza</b> - {chatter[0].text}</span>
        </p>
        <p>

          <input type="text"
            size="65"
            value={input}
            onChange={(e) => setInput(e.target.value)} />

          <button onClick={() => {
            let res = input
            setInput("");
            const clone = [];
            clone.push({ name: "Eliza", text: listen(res) });
            clone.push({ name: "You", text: res });
            const temp = [...clone, ...chatter];
            setChatter(temp);
            localStorage.setItem("chatter", JSON.stringify(temp));
          }} >Send</button>
        </p>
      </article>
      <br />
      <article >
        <details>
          <summary>Conversation</summary>
          <ul id="conversation" >
            {
              chatter.slice(1, chatter.length).map((s, index) => <li className="animate-flicker" key={index}><b>{s.name}</b> -- {s.text} </li>)
            }
          </ul>
        </details>
      </article>
    </main>


  </div >


}


export default Eliza;