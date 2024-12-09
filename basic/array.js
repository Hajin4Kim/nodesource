const fruits = ["사과", " 망고", "바나나", "수박", "자두", "포도"];
console.log(fruits);

// 구조분해(Destructing)
let candyMachine = {
  status: {
    name: "node",
    count: 5,
  },
  getCandy: function () {
    this.status.count--;
    return this.status;
  },
};

// var getCandy = candyMachine.getCandy;
// var count = candyMachine.status.count;

const {
  getCandy,
  status: { count },
} = candyMachine;

console.log(getCandy);
console.log(count);

// var arr1 = fruits[0];
// var arr3 = fruits[3];
// var arr4 = fruits[4];
// console.log(arr1, arr3, arr4);

const array = ["node.js", {}, 10, true];

const [node, obj, bool] = array;
console.log(node, obj, bool);

// spread operator : ...(복제)
var array1 = ["num1", "num2"];
var array2 = ["num3", "num4"];
var sumArr = [array1, array2];

console.log(sumArr);
