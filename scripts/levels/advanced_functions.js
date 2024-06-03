define([
    'toxilibs/random',
    'level',
    'levels/commons/bad_choices'
], function (random, Level, badChoices) {

    const level = new Level({
        name: 'advanced_functions'
    })


    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(0, 5)
            let b = random.intBetween(0, 5)
            if (b === a) {
                b += 2
            }

            q.addCode({
                javascript: 'function hi (a, b) {\n\treturn a * b\n}\n\nhi(' + a + ', ' + b + ')',
                python: 'def hi (a, b):\n\treturn a * b\n\nhi(' + a + ', ' + b + ')',
                csharp: 'static int hi(int a, int b) {\n\treturn a * b;\n}\n\nhi(' + a + ', ' + b + ')',
            }, level.language)

            q.addBadChoices(badChoices.forSimpleMath(a, b))
        }
    })


    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(1, 4)
            let b = random.intBetween(2, 3)

            q.addCode({
                javascript: 'function hi (a, b) {\n\t' +
                    'if (a < b) {\n\t\treturn a + b\n\t} else {\n\t\treturn a * b\n\t}\n}\n\n' +
                    'hi(' + a + ', ' + b + ')',
                python: 'def hi (a, b):\n\tif (a < b)\n\t\treturn a + b\n\telse\n\t\treturn a * b\n\n' +
                    'hi(' + a + ', ' + b + ')',
                csharp: 'static int hi(int a, int b) {\n\t' +
                    'if (a < b) {\n\t\treturn a + b;\n\t} else {\n\t\treturn a * b;\n\t}\n}\n\n' +
                    'hi(' + a + ', ' + b + ')',
            }, level.language)

            q.addBadChoices(badChoices.forSimpleMath(a, b))
        },
        times: 2
    })


    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(1, 4)
            let b = random.intBetween(1, 4)
            let c = random.intBetween(1, 2)
            let d = random.intBetween(2, 3)
            q.addCode({
                javascript: 'function hi (a, b) {\n\t' +
                    'return a * b\n}\n\nfunction hello (a, b) {\n\treturn a + b\n}\n\n' +
                    'hi(' + c + ', ' + d + ') + hello(' + a + ', ' + b + ')',
                python: 'def hi (a, b):\n\treturn a * b\n\n' +
                    'def hello (a, b):\n\treturn a + b\n\n' +
                    'hi(' + c + ', ' + d + ') + hello(' + a + ', ' + b + ')',
                csharp: 'static int hi(int a, int b) {\n\t' +
                    'return a * b;\n}\n\nstatic int hello(int a, int b) {\n\treturn a + b;\n}\n\n' +
                    'hi(' + c + ', ' + d + ') + hello(' + a + ', ' + b + ')'
            }, level.language)

            q.addBadChoices(badChoices.forSimpleMath(a, b))
        },
        timeoutTime: 70000
    })

    return level

})
