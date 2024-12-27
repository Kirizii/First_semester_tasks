"use strict"

function asyncFind(array, asyncPredicate, parallelism = 2) {
    return new Promise((resolve, reject) => {
        let completed = 0;
        let found = false;
        const promises = new Set();
        const next = () => {
            if (found || completed >= array.length) {
                return;
            }
            if (promises.size < parallelism) {
                const index = completed++;
                const promise = asyncPredicate(array[index])
                    .then((result) => {
                        if (result && !found) {
                            found = true;
                            resolve(array[index]);
                        }
                    })
                    .catch(reject)
                    .finally(() => {
                        promises.delete(promise);
                        next();
                    });
                promises.add(promise);
                next();
            } else if (promises.size === 0 && completed >= array.length) {
                resolve(undefined);
            }
        };
        next();
    });
}

function isEvenAsyn(value) {
    return new Promise((resolve) =>{
        setTimeout(() => {
        resolve(value % 2 === 0);
    }, 1500);})
}

async function awaitTest(testNumber ,data, parallelism) {
    try {
        console.time(`Await test ${testNumber} time`)
        const result = await asyncFind(data, isEvenAsyn,parallelism);
        console.timeEnd(`Await test ${testNumber} time`)
        console.log("Знайдений елемент(async-await):", result);
    } catch (err) {
        console.error("Помилка:", err);
    }
}

function test(testNumber ,data, parallelism){
    console.time(`Test ${testNumber} time`);
    asyncFind(data, isEvenAsyn, parallelism).then((result) => {
        console.timeEnd(`Test ${testNumber} time`)
        console.log("Знайдений елемент:", result);
    }).catch((err) => {
        console.error("Помилка:", err);
    });}

const data1 = [1, 1, 1, 1, 6];
const data2 = [-1, 5, 7, 4, 1];
const data3 = [1, 1, 1, 64, 90];

test(1, data1, 2)
test(2, data2, 2)
test(3, data3, 4)

awaitTest(1, data1, 2);
awaitTest(2, data2, 2);
awaitTest(3, data3, 2)
