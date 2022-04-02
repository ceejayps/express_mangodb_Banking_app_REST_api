function solution(sequence) {
    let goal = 0;
let char = sequence.split('');
console.log(char)
char.forEach (  function async(elem)  {
  if (elem == '(' ){
      goal += 1;
  }
  else if (elem == '[' ){
      goal += 2;
  }
  else if(elem == '{' ){
      goal += 3;
  }
 else  if(elem == ')' ){
      goal -= 1;
  }
  else if(elem == ']' ){
      goal -= 2;
  }
    else  if(elem == '}' ){
      goal -= 3;
  }
   

  
});
if (goal < 0){ console.log( "false")}
    else { console.log( "true")}

}