define([
    'toxilibs/random',
    'level'
], function (random, Level) {

    const level = new Level({
        name: 'arrays_position'
    })


    const randomLetter = random.unmistakableLetter



    level.addQuestion({
        generator: function (q) {
            const a = []
            const len = random.intBetween(3, 7)
            a.push(random.intBetween(1, 9))
            for (let i = 0; i < len-1; i++) {
                a.push(random.pick(random.intBetween(1, 9), randomLetter()))
            }
            const csharpArr = []
            csharpArr.push(a[0])
            for (let i = 0; i < len-1; i++) {
                csharpArr.push(random.intBetween(-2, 9))
            }
            let csharpString = csharpArr.join(", ");
            q.addCode({
                javascript: 'let a = ' + q.codeArrayToDisplay(a) + '\na[0]',
                python:     'a = ' + q.codeArrayToDisplay(a) + '\na[0]',
                csharp: `int[] a = {${csharpString}};\na[0]`,
            }, level.language)

            q.addBadChoices(a.length, ...a, 'digit')
        },
        timeoutTime: 15000,
        errorExpected: true,
        times: 2
    })


    level.addQuestion({
        generator: function (q) {
            let a = []
            for (let i = 0; i < random.intBetween(3, 7); i++) {
                a.push(random.intBetween(1, 9))
            }
            let b = random.intBetween(1, a.length - 1)
            q.addCode({
                javascript: 'let a = ' + q.codeArrayToDisplay(a) + '\na[' + b + ']',
                python: 'a = ' + q.codeArrayToDisplay(a) + '\na[' + b + ']',
                csharp: 'int[] a = {' + q.codeArrayToDisplay(a).slice(1, -1) + '};\na[' + b + ']',
            }, level.language)

            q.addBadChoices(a.length, ...a, 'digit')
        },
        times: 2
    })


    level.addQuestion({
        generator: function (q) {
            let a = []
            let l = random.intBetween(4, 6)
            for (let i = 0; a.length < l; i++) {
                let letter = randomLetter()
                if (a.indexOf(letter) === -1) {
                    a.push(letter)
                }
            }
            let b = random.intBetween(0, a.length - 1)
            q.addCode({
                javascript: 'let a = ' + q.codeArrayToDisplay(a) + "\na.indexOf('" + a[b] + "')",
                python:     'a = ' + q.codeArrayToDisplay(a) + "\na.index('" + a[b] + "')",
                csharp: 'char[] a = {' + q.codeArrayToDisplay(a).slice(1, -1) + "};\nArray.IndexOf(a, '" + a[b] + "')"
            }, level.language)

            q.addBadChoices(a.length, b, a[0], a[1], 'digit')
        },
        timeoutTime: 15000,
        errorExpected: true
    })


    return level

})
