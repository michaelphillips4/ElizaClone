import ElizaMachine from './ElizaMachine';

test("findKeyWord Tests", () => {
  const e = new ElizaMachine();
  let res = e.findKeyWord("Can You tell me the weather.");
  expect(res.key).toEqual(" YOU ");
  expect(res.idx).toEqual(32);
  expect(res.end).toEqual(34);


  res = e.findKeyWord("I feel lost in this world.");
  expect(res.key).toEqual(" I FEEL ");
  expect(res.idx).toEqual(14);
  expect(res.end).toEqual(16);


  res = e.findKeyWord("The sun will not shine");
  expect(res).toEqual(undefined);
 

  res = e.findKeyWord("I feel lost in this world.");
  res = e.getChoice(res,0)
  expect(res).toContain("feel");


});


test("funfound part Tests", () => {
     
        const e = new ElizaMachine();
   let res = e.findKeyWord("I feel lost in this world.");
   let c = e.getChoice(res,0)
    res = e.getUnfoundPart(c,res,"I feel lost in this world.")
    expect(res).toContain("feel");
  
  
  });