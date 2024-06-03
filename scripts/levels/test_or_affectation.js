define([
    'toxilibs/random',
    'level'
], function (random, Level) {

    const level = new Level({
        name: 'test_or_affectation'
    })


    function addBads ({q, a, b, c}) {
        q.addBadChoices(a, b, c, a + c, b + c, a + b, a + b + c)
    }


    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(1, 4)
            let b = random.intBetween(0, 4)
            let c = random.intBetween(1, 2)
            if (b === a) {
                b += 2
            }
            q.addCode({
                javascript: 'let a = ' + a + '\na = ' + b + '\na + ' + c,
                python: 'a = ' + a + '\na = ' + b + '\na + ' + c,
                csharp: 'int a = ' + a + ';\na = ' + b + ';\na + ' + c,
            }, level.language)

            addBads({q, a, b, c})
        }
    })


    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(1, 6)
            let b = random.intBetween(1, 19)
            let c = random.intBetween(1, 2)
            q.addCode({
                javascript: 'let a = ' + a + '\na === ' + b + '\na + ' + c,
                python: 'a = ' + a + '\na == ' + b + '\na + ' + c,
                csharp: 'int a = ' + a + ';\na == ' + b + ';\na + ' + c
            }, level.language)
            addBads({q, a, b, c})
        },
        times: 2
    })


    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(0, 5)
            let b = random.intBetween(0, 5)
            let c = random.intBetween(1, 2)
            if (b === a) {
                b += 2
            }
            q.addCode({
                javascript: 'let a = ' + a + '\na = ' + b + '\na + ' + c,
                python: 'a = ' + a + '\na = ' + b + '\na + ' + c,
                csharp: 'int a = ' + a + ';\na = ' + b + ';\na + ' + c
            }, level.language)
            addBads({q, a, b, c})
        },
        times: 2
    })


    return level

})
