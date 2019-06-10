/**                         CHALLENGE:
* The function delay(ms) should return a promise. That promise should resolve after ms milliseconds, so that we can add .then to it, like this:

   __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ 
 /  function delay(ms) {                                 \
|     // your code                                        |
|   }                                                     |
|                                                         |
|  delay(3000).then(() => alert('runs after 3 seconds')); |
 \ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ /
 */

function delay(ms) {
  // return new Promise(resolve => setTimeout(resolve, ms))
  return new Promise(resolve =>
    setTimeout(() => resolve("resolved"), ms)
  )
}

delay(3000).then(() =>  console.log("Done"))