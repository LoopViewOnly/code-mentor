define([
    'toxilibs/random',
    'level'
], function (random, Level) {

    const level = new Level({
        name: 'string_concatenation'
    })


    const randomLetter  = random.unmistakableLetter
    const randomLetters = random.unmistakableLetters

    function addBads ({q, a, b}) {
        q.addBadChoices(a, b, a[0], b[0], a[1], b[1])
    }


    level.addQuestion({
        generator: function (q) {
            let a = randomLetters(2)
            let b = randomLetters(2)

            q.addCode({
                javascript: "let a = '" + a + "'\nlet b = '" + b + "'\na + b",
                python: "a = '" + a + "'\nb = '" + b + "'\na + b",
                csharp: 'string a = "' + a + '";\nstring b = "' + b + '";\na + b',
            }, level.language)

            addBads({q, a, b})

        },
        errorExpected: true
    })


    level.addQuestion({
        generator: function (q) {
            let a = randomLetters(2)
            let b = random.intBetween(10, 99)
            q.addCode({
                javascript: "let a = '" + a + "'\nlet b = '" + b + "'\na + b",
                python: "a = '" + a + "'\nb = '" + b + "'\na + b",
                csharp: 'string a = "' + a + '";\nstring b = "' + b + '";\na + b',
            }, level.language)

            q.addBadChoices(a, b, a[0], a[1], b + 1, b - 1)
        }
    })


    level.addQuestion({
        generator: function (q) {
            let a = randomLetters(2)
            let n = random.intBetween(10, 99)
            let b = randomLetter() + n
            q.addCode({
                javascript: "let a = '" + a + "'\nlet b = '" + b + "'\na + b",
                python: "a = '" + a + "'\nb = '" + b + "'\na + b",
                csharp: 'string a = "' + a + '";\nstring b = "' + b + '";\na + b'
            }, level.language)

            addBads({q, a, b})
            q.addBadChoices(n)

        }
    })


    return level

})
