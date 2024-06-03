define([
    'toxilibs/random',
    'level'
], function (random, Level) {

    const level = new Level({
        name: 'length'
    })


    const randomLetter = random.unmistakableLetter
    let randomLetters = random.unmistakableLetters

    function addBads ({q, a}) {
        q.addBadChoices(a.length - 1, a.length + 1, a[0], a[1], 'digit')
    }


    level.addQuestion({
        generator: function (q) {
            let a = randomLetters(random.intBetween(2, 7))
            q.addCode({
                javascript: "let a = '" + a + "'\na.length",
                python: "a = '" + a + "'\nlen(a)",
                csharp: 'string a = "' + a + '";\na.Length',
            }, level.language)
            addBads({q, a})
        },
        timeoutTime: 10000,
        errorExpected: true,
        times: 2
    })


    level.addQuestion({
        generator: function (q) {
            let a = []
            let csharpArr = []
            for (let i = 0; i < random.intBetween(3, 7); i++) {
                a.push(random.pick(random.intBetween(1, 9), randomLetter()))
            }
            for (let i = 0; i < a.length; i++) {
                csharpArr.push(random.intBetween(-4, 9))
            }
            let aForDisplay = q.codeArrayToDisplay(a)
            let csharpString = csharpArr.join(", ");

            q.addCode({
                javascript: 'let a = ' + aForDisplay + '\na.length',
                python: 'a = ' + aForDisplay + '\nlen(a)',
                csharp: `int[] a = {${csharpString}};\na.Length`
            }, level.language)
            addBads({q, a})
        },
        errorExpected: true,
        timeoutTime: 12000,
        times: 2
    })


    return level

})
