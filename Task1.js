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