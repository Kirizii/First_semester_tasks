"use strict"

function asyncFind(array, asyncPredicate, callback) {
    let index = 0;
    const next = () => {
        if (index >= array.length) {
            callback(null, undefined);
            return;
        }
        asyncPredicate(array[index], (err, result) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (result) {
                callback(null, array[index]);
            } else {
                index++;
                next();
            }
        });
    };
    next();
}
function isEvenAsyn(value, callback) {
    setTimeout(() => {
        callback(null, value % 2 === 0);
    }, 1500);
}

const data1 = [1, 1, 1, 1, 6];
console.time("Test 1 time");
asyncFind(data1, isEvenAsyn, (err, result) => {
    console.timeEnd("Test 1 time")
    if (err) {
        console.error("Помилка:", err);
    } else {
        console.log("Знайдений елемент:", result);
    }
});

const data2 = [-1, 5, 7, 4, 1];
console.time("Test 2 time");
asyncFind(data2, isEvenAsyn, (err, result) => {
    console.timeEnd("Test 2 time")
    if (err) {
        console.error("Помилка:", err);
    } else {
        console.log("Знайдений елемент:", result);
    }
});

const data3 = [1, 1, 1, 64, 90];
console.time("Test 3 time");
asyncFind(data3, isEvenAsyn, (err, result) => {
    console.timeEnd("Test 3 time")
    if (err) {
        console.error("Помилка:", err);
    } else {
        console.log("Знайдений елемент:", result);
    }
});