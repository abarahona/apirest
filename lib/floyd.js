floyd = function(){

  var iter1 = iterator(array.slice(),1);
  var iter2 = iterator(array.slice(),2);
  
  iter1.next(); iter2.next(); //inicializo ambos en el primer elemento
  
  
  let tortoise = iter1.next().value;
  let hare = iter2.next().value;
  
  while (tortoise != hare) {
    tortoise = iter1.next().value;
    hare = iter2.next().value;
  }
  
  let mu = 0;
  tortoise = iter1.next(true).value;
  while (tortoise != hare) {
    tortoise = iter1.next().value;
    mu += 1;
  }
  
  let lam = 1
  hare = iter1.next().value;
  while (tortoise != hare) {
    hare = iter1.next().value;
    lam += 1;
  }
  
  return  [mu,lam]
}

function* iterator(arr,suma) {
  let index = 0;
  while(true){
    index+=suma;
    var reset = yield arr[index<arr.length? index : arr.length-1];
    if (reset) index = 0;
  }
}


// var array = [2,0,6,3,1,6,3,1];
//var array = [3, 4, 8, 0, 11, 9, 7, 2, 5, 6, 10, 1, 49, 49, 49, 49]
var array = [1, 2, 3, 1, 2, 3, 1, 2, 3]
var muLam = floyd();
console.log(muLam);
console.log(array.slice(muLam[0],muLam[0]+muLam[1] ) );