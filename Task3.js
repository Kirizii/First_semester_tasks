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