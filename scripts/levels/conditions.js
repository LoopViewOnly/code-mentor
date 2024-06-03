define([
    'toxilibs/random',
    'level'
], function (random, Level) {

    const level = new Level({
        name: 'conditions'
    })


    function addBads ({q, a, b, c, d, e}) {
        q.addBadChoices(a, b, c, d, e, a + c, b + c, a + b, a + b + c)
    }


    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(0, 4)
            let b = random.intBetween(0, 4)
            let c = random.intBetween(1, 3)
            let d = random.intBetween(1, 3)
            let e = d + random.intBetween(1, 3)

            if (b === a) {
                b += 2
            }
            q.addCode({
                javascript: 'let a = ' + a + '\n' +
                    'if (' + d + ' < ' + e + ') {\n\ta = ' + b + '\n}\n' +
                    'a + ' + c,
                python: 'a = ' + a + '\nif ' + d + ' < ' + e + ':\n\ta = ' + b + '\n\na + ' + c,
                csharp: 'int a = ' + a + ';\n' +
                    'if (' + d + ' < ' + e + ') {\n\ta = ' + b + ';\n}\n' +
                    'a + ' + c,
            }, level.language)

            addBads({q, a, b, c, d, e})
        }
    })


    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(0, 4)
            let b = random.intBetween(0, 4)
            let c = random.intBetween(1, 3)
            let d = random.intBetween(1, 3)
            let e = d + random.intBetween(1, 3)

            if (b === a) {
                b += 2
            }
            q.addCode({
                javascript: 'let a = ' + a + '\n' +
                    'if (' + e + ' < ' + d + ') {\n\ta = ' + b + '\n}\n' +
                    'a + ' + c,
                python: 'a = ' + a + '\nif ' + e + ' < ' + d + ':\n\ta = ' + b + '\n\na + ' + c,
                csharp: 'int a = ' + a + ';\n' +
                    'if (' + e + ' < ' + d + ') {\n\ta = ' + b + ';\n}\n' +
                    'a + ' + c,
            }, level.language)

            addBads({q, a, b, c, d, e})
        }
    })


    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(0, 4)
            let b = random.intBetween(0, 4)
            let c = random.intBetween(1, 3)
            let d = random.intBetween(1, 3)
            let e = d + random.intBetween(1, 3)
            if (b === a) {
                b += 2
            }
            q.addCode({
                javascript: 'let a = 0\nif (' + d + ' < ' + e + ') {\n\t' +
                    'a = ' + a + '\n} else {\n\t' +
                    'a = ' + b + '\n}\na + ' + c,
                python: 'if ' + d + ' < ' + e + ':\n\ta = ' + a + '\nelse:\n\ta = ' + b + '\n\na + ' + c,
                csharp: 'int a = 0;\nif (' + d + ' < ' + e + ') {\n\t' +
                    'a = ' + a + ';\n} else {\n\t' +
                    'a = ' + b + ';\n}\na + ' + c,
            }, level.language)

            addBads({q, a, b, c, d, e})
        }
    })


    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(0, 5)
            let b = random.intBetween(0, 5)
            let c = random.intBetween(1, 3)
            let d = random.intBetween(1, 3)
            let e = d + random.intBetween(1, 3)
            if (b === a) {
                b += 2
            }
            q.addCode({
                javascript: 'let a = 0\nif (' + e + ' < ' + d + ') {\n\t' +
                    'a = ' + a + '\n} else {\n\t' +
                    'a = ' + b + '\n}\na + ' + c,
                python: 'if ' + e + ' < ' + d + ':\n\ta = ' + a + '\nelse:\n\ta = ' + b + '\n\na + ' + c,
                csharp: 'int a = 0;\nif (' + e + ' < ' + d + ') {\n\t' +
                    'a = ' + a + ';\n} else {\n\t' +
                    'a = ' + b + ';\n}\na + ' + c,
            }, level.language)

            addBads({q, a, b, c, d, e})
        }
    })


    level.addQuestion({
        generator: function (q) {
            let condition1 = random.intBetween(1, 9)
            let condition2 = random.pick(condition1, random.intBetween(1, 9))

            let a = random.intBetween(1, 4)
            let b = random.intBetween(1, 4)
            let c = random.intBetween(1, 3)
            if (b === a) {
                b += 2
            }
            q.addCode({
                javascript: 'let a = 0\nif (' + condition1 + ' === ' + condition2 + ') {\n\t' +
                    'a = ' + a + '\n} else {\n\t' +
                    'a = ' + b + '\n}\na + ' + c,
                python: 'if ' + condition1 + ' == ' + condition2 + ':\n\t' +
                    'a = ' + a + '\nelse:\n\ta = ' + b + '\n\na + ' + c,
                csharp: 'int a = 0;\nif (' + condition1 + ' == ' + condition2 + ') {\n\t' +
                    'a = ' + a + ';\n} else {\n\t' +
                    'a = ' + b + ';\n}\na + ' + c,
            }, level.language)

            addBads({q, a, b, c, d: a, e: a})
        }
    })


    return level

})
