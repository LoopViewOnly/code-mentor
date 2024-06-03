define([
    'toxilibs/random',
    'level',
    'levels/commons/bad_choices'
], function (random, Level, badChoices) {

    const level = new Level({
        name: 'variables'
    })



    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(1, 5)
            let b = random.intBetween(1, 5)
            if (b === a) {
                b += 2
            }

            q.addCode({
                javascript: 'let a = ' + a + '\na + ' + b,
                python: 'a = ' + a + '\na + ' + b,
                csharp: 'int a = ' + a + ';\na + ' + b
            }, level.language)

            q.addBadChoices(badChoices.forSimpleMath(a, b))
        }
    })


    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(1, 5)
            let b = random.intBetween(1, 5)
            if (b === a) {
                b += 2
            }

            q.addCode({
                javascript: 'let a = ' + a + '\nlet b = ' + b + '\na + b',
                python:     'a = ' + a + '\nb = ' + b + '\na + b',
                csharp:     'int a = ' + a + ';\nint b = ' + b + ';\na + b'
            }, level.language)

            q.addBadChoices(badChoices.forSimpleMath(a, b))
        }
    })


    return level

})
