function fibo(n) {
    if (n === 0 || n === 1) {
        return n
    }
    return fibo(n - 1) + fibo(n - 2)
}
const result = fibo(4)
console.log(result);

function fiboLoop(n) {
    let i = 0
    let fibo = [1, 1]
    while (i < n-2) {
        fibo.push(fibo[i]+fibo[i+1])
        i++
    }
    return fibo
}
const result2 = fiboLoop(8)
console.log(result2);

function fak(number) {
    if (number === 1) {
        return number
    }
    return number * fak(number - 1)
}
const result3 = fak(6)
console.log(result3);
