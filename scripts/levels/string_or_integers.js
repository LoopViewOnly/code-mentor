define([
    'toxilibs/random',
    'level',
    'levels/commons/bad_choices'
], function (random, Level, badChoices) {

    const level = new Level({
        name: 'string_or_integers'
    })


    function withStringsGenerator (q) {
        let a = random.intBetween(0, 4)
        let b = random.intBetween(0, 5)
        q.addCode({
            javascript: "let a = '" + a + "'\nlet b = '" + b + "'\na + b",
            python: "a = '" + a + "'\nb = '" + b + "'\na + b",
            csharp: 'string a = "' + a + '";\nstring b = "' + b + '";\na + b'
        }, level.language)

        q.addBadChoices(a + b, a, b, 'digit')
    }


    level.addQuestion({
        generator: withStringsGenerator,
        errorExpected: true
    })


    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(0, 4)
            let b = random.intBetween(0, 5)
            if (b === a) {
                b += 2
            }
            q.addCode({
                javascript: 'let a = ' + a + '\nlet b = ' + b + '\na + b',
                python: 'a = ' + a + '\nb = ' + b + '\na + b',
                csharp: 'int a = ' + a + ';\nint b = ' + b + ';\na + b'
            }, level.language)

            q.addBadChoices(String(a) + b)
            q.addBadChoices(badChoices.forSimpleMath(a, b))
        }
    })


    level.addQuestion({
        generator: withStringsGenerator
    })


    return level

})
