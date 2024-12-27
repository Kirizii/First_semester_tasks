"use strict"

const fs = require("fs");

async function* randomNumberGenerator() {
    while (true) {
        const randomNumber = Math.floor(Math.random() * 100);
        yield randomNumber;
        await new Promise((resolve) => setTimeout(resolve, 500));
    }
}

async function asyncIteratorWrite(filePath, generator, duration) {
    const writableStream = fs.createWriteStream(filePath);
    const startTime = Date.now();
    try {
        for await (const number of generator) {
            writableStream.write(`${number}\n`);
            if (Date.now() - startTime >= duration) {
                break;
            }
        }
    } catch (err) {
        console.error("Помилка під час запису:", err.message);
    } finally {
        writableStream.end();
    }

    writableStream.on("finish", () => {
        console.log("Запис завершено.");
    });

    writableStream.on("error", (err) => {
        console.error("Помилка запису:", err.message);
    });
}

(async () => {
    await asyncIteratorWrite("output.txt", randomNumberGenerator(), 6000);
})();