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

async function awaitTest(data) {
    try {
        console.time("Await test time:")
        const result = await asyncFind(data, isEvenAsyn);
        console.timeEnd("Await test time:")
        console.log("Знайдений елемент(async-await):", result);
    } catch (err) {
        console.error("Помилка:", err);
    }
}

const data1 = [1, 1, 1, 1, 6];
console.time("Test 1 time");
asyncFind(data1, isEvenAsyn).then((result) => {
    console.timeEnd("Test 1 time")
    console.log("Знайдений елемент:", result);
}).catch((err) => {
    console.error("Помилка:", err);
});

const data2 = [-1, 5, 7, 4, 1];
console.time("Test 2 time");
asyncFind(data2, isEvenAsyn).then((result) => {
    console.timeEnd("Test 2 time")
    console.log("Знайдений елемент:", result);
}).catch((err) => {
    console.error("Помилка:", err);
});

const data3 = [1, 1, 1, 64, 90];
console.time("Test 3 time");
asyncFind(data3, isEvenAsyn).then((result) => {
    console.timeEnd("Test 3 time")
    console.log("Знайдений елемент:", result);
    }).catch((err) => {
    console.error("Помилка:", err);
    });


awaitTest(data2);
