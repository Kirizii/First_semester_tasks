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


const abortControl = new AbortController();
const signal = abortControl.signal;
const data = [1, 1, 1, 64, 90];
console.time("Test time")
asyncFind(data, isEvenAsyn, signal).then((result) => {
    console.timeEnd("Test time")
    console.log("Знайдений елемент:", result);
}).catch((err) => {
    console.error("Помилка:", err);
});
setTimeout(() => {
    abortControl.abort();
}, 3000);