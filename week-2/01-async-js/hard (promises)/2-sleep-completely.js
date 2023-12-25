/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep(milliseconds) {
    
    return new Promise(function(resolve) {
        let startTime = Date.now();
        for(i = 0 ; i < 1000 ; i--){
            let endTime = Date.now();
            if(endTime - startTime == milliseconds){
                resolve();
                break;
            }
        }
    })
}

sleep(3000).then(() => {'heyaa'});
console.log('hello');
module.exports = sleep;
