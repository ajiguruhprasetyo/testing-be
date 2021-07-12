/**
 * Direction:
 * Remove duplicated data from array
 * 
 * Expected Result:
 * [1, 2, 3, 4, 5]
 */
const data = [1, 4, 2, 3, 5, 3, 2, 4];

function result(data) {
  // Your Code Here
    var uniqueArray = [];

    for(i=0; i < data.length; i++){
        if(uniqueArray.indexOf(data[i]) === -1) {
            const nonDuplicate = uniqueArray.push(data[i]);
            [data[nonDuplicate],data[i]] = [data[i], data[nonDuplicate]];
        }
    }
    return uniqueArray;
}

console.log(result(data));
