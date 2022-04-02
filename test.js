function solution(sequence) {
let goal = 0;
let char = sequence.split('').forEach (  function (elem)  {
  if (elem == '(' ){
    goal += 10;
    if(goal < 0) return false
  }
  else if (elem == '[' ){goal += 20;
    if(goal < 0 || goal%2 !=0) return false
  }
  else if(elem == '{' ){goal += 3;
    if(goal < 0 || goal%2 !=0) return false   
  }
 else  if(elem == ')' ){ goal -= 10;
      if(goal < 0 || goal%2 !=0) return false
  }
  else if(elem == ']' ){goal -= 20;
      if(goal < 0 || goal%2 !=0) return false
  }
    else  if(elem == '}' ){ goal -= 3;
      if(goal < 0 || goal%2 !=0) return false
  }});
if (goal != 0){ console.log( "false")}
    else { console.log( "true")}
    console.log(`final ${goal}`)
}
solution("((()))")