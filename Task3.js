"use strict"

function asyncFind(array, asyncPredicate, abortSignal) {
    return new Promise((resolve, reject) => {
        let index = 0;
        const next = () => {
            if (abortSignal.aborted) {
                reject(new Error("Операцію було скасовано"));
                return;
            }
            if (index >= array.length) {
                resolve(undefined);
                return;
            }
            asyncPredicate(array[index])
                .then((result) => {
                    if (result) {
                        resolve(array[index]);
                    } else {
                        index++;
                        next();
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        };
        next();
    });
}

function isEvenAsyn(value) {
    return new Promise((resolve) =>{
        setTimeout(() => {
            resolve(value % 2 === 0);
        }, 1000);})
}

function test(testNumber,data,abortTimeout){
    const abortControl = new AbortController();
    const signal = abortControl.signal;
    console.time(`Test ${testNumber} time`)
    asyncFind(data, isEvenAsyn, signal).then((result) => {
        console.timeEnd(`Test ${testNumber} time`)
        console.log("Знайдений елемент:", result);
    }).catch((err) => {
        console.error("Помилка:", err);
    });
    setTimeout(() => {
        abortControl.abort();
    }, abortTimeout);
}

const data1 = [1, 1, 64, 90];
const data2 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 64, 90];
test(1,data1,3000)
test(2,data2,3000)