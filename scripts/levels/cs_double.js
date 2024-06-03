define([
    'toxilibs/random',
    'level',
    'levels/commons/bad_choices'
], function (random, Level, badChoices) {

    const level = new Level({
        name: 'cs_double'
    })



    level.addQuestion({
        generator: function (q) {
            let a = 2.5
            let b = random.intBetween(1, 5)
            if (b === a) {
                b += 2
            }

            q.addCode({
                javascript: 'let a = ' + a + ';\na + ' + b,
                csharp: 'double a = ' + a + ';\na + ' + b
            }, level.language)

            q.addBadChoices(badChoices.forSimpleMath(a, b))
        }
    })


    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(1, 8)
            let b = 0.25
            if (b === a) {
                b += 2
            }

            q.addCode({
                javascript:     'let a = ' + a + '\nlet b = ' + b + '\na + b',
                csharp:     'int a = ' + a + ';\ndouble b = ' + b + ';\na + b'
            }, level.language)

            q.addBadChoices(badChoices.forSimpleMath(a, b))
        }
    })


    return level

})
