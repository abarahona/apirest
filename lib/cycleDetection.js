cycle = function (array) {
  var seen = {}
  for (var i=0; i<array.length; i++) {
    if (array[i] in seen)
      return [seen[array[i]], i-seen[array[i]]]
    seen[array[i]] = i
  }
  return []
}

class CycleDetection{
  constructor(){
  }

  /**
   * Se asume que valores repetidos significan un ciclo
   */
  detect(arr){
    let array = arr.split(',');
    return new Promise(( resolve, reject)=>{
      var mulam = cycle(array);
      resolve(array.slice(mulam[0], mulam[0]+mulam[1]));
    });
  };
}

module.exports = CycleDetection;