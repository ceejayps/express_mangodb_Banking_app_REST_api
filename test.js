/*
Given a string 'sequence' consisting of the characters 
'(', ')', '{', '}', '[' and ']' Your task is to determine
whether or not the sequence is a valid bracket sequence.
The Valid bracket sequence is defined in the following way:
• An empty bracket sequence is a valid bracket sequence.
• If s is a valid bracket sequence then (s) , [s] and {s} are also valid.
• If A and B are valid bracket sequences then AB is also
valid.
*/

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




