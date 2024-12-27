"use strict"

function asyncFind(array, asyncPredicate, callback, debounceTime = 1500) {
    let index = 0;
    const next = () => {
        if (index >= array.length) {
            callback(null, undefined);
            return;
        }
        const startTime = Date.now();
        asyncPredicate(array[index], (err, result) => {
            const elapsedTime = Date.now() - startTime;
            const additionalDelay = Math.max(0, debounceTime - elapsedTime);
            setTimeout(() => {
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
            }, additionalDelay);
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
const data2 = [-1, 5, 7, 4, 1];
const data3 = [1, 1, 1, 64, 90];

function test(testNumber ,data){
    console.time(`Test ${testNumber} time`);
    asyncFind(data, isEvenAsyn, (err, result) => {
        console.timeEnd(`Test ${testNumber} time`)
        if (err) {
            console.error("Помилка:", err);
        } else {
            console.log("Знайдений елемент:", result);
        }
    },1600);
}
test(1, data1)
test(2, data2)
test(3, data3)