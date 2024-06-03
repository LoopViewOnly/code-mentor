define([
    'toxilibs/random',
    'level'
], function (random, Level) {

    const level = new Level({
        name: 'booleans'
    })


    function addBads ({q, a, b}) {
        if (level.language === 'python' || level.language === 'csharp') {
            q.addBadChoices(true, false, a, b, a + b, a - b, '==')
        } else {
            q.addBadChoices(true, false, a, b, a + b,  Math.abs(a - b), '===')
        }
    }


    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(1, 29)
            let b = random.pick(a, random.intBetween(1, 29))
            q.addCode({
                javascript: a + ' === ' + b,
                python:     a + ' == ' + b,
                csharp: a + ' == ' + b,
            }, level.language)
            addBads({q, a, b})
        },
        timeoutTime: 10000,
        errorExpected: true,
        times: 2
    })


    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(1, 29)
            let b = random.pick(a, random.intBetween(1, 29))
            q.addCode({
                javascript: a + ' !== ' + b,
                python:     a + ' != ' + b,
                csharp: a + ' != ' + b
            }, level.language)
            addBads({q, a, b})
        },
        timeoutTime: 10000,
        errorExpected: true,
        times: 2
    })


    //FIXME this question deals with types, string_or_integers too. But no dependency required.
    // if string_or_integers has not or will not be run, is this question interesting ?
    // we have a strong theme ('types') dispatched in several modules

    // TODO not working with python version, because there is no "===" operator
    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(1, 29)
            let b = random.pick(a, random.intBetween(1, 29))
            q.addCode({
                javascript: a + " === '" + b + "'",
                python:     a + " == '" + b + "'",
                csharp: a + " == '" + b + "'"
            }, level.language)
            addBads({q, a, b})
        },
        timeoutTime: 20000
    })


    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(1, 29)
            let b = random.intBetween(1, 29)
            if (b === a) {
                b += 2
            }
            q.addCode({
                javascript: a + ' < ' + b,
                python:     a + ' < ' + b,
                csharp: a + ' < ' + b
            }, level.language)
            addBads({q, a, b})
        },
        timeoutTime: 13000
    })


    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(1, 29)
            let b = random.pick(a, random.intBetween(1, 29))
            let comparisonSign = random.pick('!', '=')
            q.addCode({
                javascript: 'let a = ' + a + '\na ' + comparisonSign + '== ' + b,
                python:     'a = ' + a + '\na '     + comparisonSign + '= '  + b,
                csharp: 'int a = ' + a + ';\na ' + comparisonSign + '= ' + b,
            }, level.language)

            addBads({q, a, b})

        },
        times: 2,
        timeoutTime: 12000
    })


    return level

})
