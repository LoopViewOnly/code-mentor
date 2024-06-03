define(function () {


    function forSimpleMath (a, b) {
        return [
            a,
            b,
            Math.max(1, a + b - 1),
            a + b + 1,
            Math.max(1, a + b - 2),
            a + b + 2,
            a * b,
            a * b + 1,
            Math.max(1, a * b - 1),
            a * b + 2,
            Math.max(1, a * b - 2),
            Math.max(Math.abs(b - a)),
            'digit'
        ]
    }


    return {
        forSimpleMath
    }

})
