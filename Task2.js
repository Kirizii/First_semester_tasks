"use strict"

function asyncFind(array, asyncPredicate) {
    return new Promise((resolve, reject) => {
        let index = 0;
        const next = () => {
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
    }, 1500);})
}

async function awaitTest(testNumber ,data) {
    try {
        console.time(`Await test ${testNumber} time`)
        const result = await asyncFind(data, isEvenAsyn);
        console.timeEnd(`Await test ${testNumber} time`)
        console.log("Знайдений елемент(async-await):", result);
    } catch (err) {
        console.error("Помилка:", err);
    }
}

function test(testNumber ,data){
    console.time(`Test ${testNumber} time`);
    asyncFind(data, isEvenAsyn).then((result) => {
        console.timeEnd(`Test ${testNumber} time`)
        console.log("Знайдений елемент:", result);
    }).catch((err) => {
        console.error("Помилка:", err);
    });}

const data1 = [1, 1, 1, 1, 6];
const data2 = [-1, 5, 7, 4, 1];
const data3 = [1, 1, 1, 64, 90];

test(1, data1)
test(2, data2)
test(3, data3)

awaitTest(1, data1);
awaitTest(2, data2);
awaitTest(3, data3)
