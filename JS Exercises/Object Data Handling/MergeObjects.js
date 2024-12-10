const mergeObjs = (obj1, obj2) => Object.assign(obj1, obj2);

console.log(mergeObjs({ a: 1, b: 2 }, { b: 3, c: 4 }));