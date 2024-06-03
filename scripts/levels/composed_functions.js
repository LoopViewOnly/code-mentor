define([
    'toxilibs/random',
    'level'
], function (random, Level) {

    const level = new Level({
        name: 'composed_functions'
    })


    function addBads ({q, a, b, c}) {
        q.addBadChoices((a * b) + c, (a * c) + b, (b * c) + a, a + b + c, a * b * c, a * b, a + b, 'digit')
    }


    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(1, 3)
            let b = random.intBetween(2, 3)
            let c = random.intBetween(1, 4)
            q.addCode({
                javascript: 'function hi (a, b) {\n\treturn a * b\n}\n\n' +
                    'function hello (a, b) {\n\treturn a + b\n}\n\n' +
                    'let a = hi(' + a + ', ' + b + ')\n' +
                    'hello(a, ' + c + ')',
                python: 'def hi (a, b):\n\treturn a * b\n\n' +
                    'def hello (a, b):\n\treturn a + b\n\n' +
                    'a = hi(' + a + ', ' + b + ')\n' +
                    'hello(a, ' + c + ')',
                csharp: 'static int hi(int a, int b) {\n\treturn a * b;\n}\n\n' +
                    'static int hello(int a, int b) {\n\treturn a + b;\n}\n\n' +
                    'int a = hi(' + a + ', ' + b + ');\n' +
                    'hello(a, ' + c + ')',
            }, level.language)

            addBads({q, a, b, c})
        },
        timeoutTime: 70000
    })


    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(1, 3)
            let b = random.intBetween(2, 3)
            let c = random.intBetween(1, 4)
            q.addCode({
                javascript: 'function hi (a, b) {\n\treturn a * b\n}\n\n' +
                    'function hello (a, b) {\n\treturn a + b\n}\n\n' +
                    'hello(hi(' + a + ', ' + b + '), ' + c + ')',
                python: 'def hi (a, b):\n\treturn a * b\n\n' +
                    'def hello (a, b):\n\treturn a + b\n\n' +
                    'hello(hi(' + a + ', ' + b + '), ' + c + ')',
                csharp: 'static int hi(int a, int b) {\n\treturn a * b;\n}\n\n' +
                    'static int hello(int a, int b) {\n\treturn a + b;\n}\n\n' +
                    'hello(hi(' + a + ', ' + b + '), ' + c + ')',
            }, level.language)

            addBads({q, a, b, c})
        },
        timeoutTime: 70000
    })


    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(1, 4)
            let b = random.intBetween(2, 3)
            let c = random.intBetween(1, 2)
            q.addCode({
                javascript: 'function hi (a, b) {\n\treturn a * b\n}\n\n' +
                    'function hello (a, b) {\n\treturn hi(a, b + ' + c + ')\n}\n\n' +
                    'hello(' + a + ', ' + b + ')',
                python: 'def hi (a, b):\n\treturn a * b\n\n' +
                    'def hello (a, b):\n\treturn hi(a, b + ' + c + ')\n\n' +
                    'hello(' + a + ', ' + b + ')',
                csharp: 'static int hi(int a, int b) {\n\treturn a * b;\n}\n\n' +
                    'static int hello(int a, int b) {\n\treturn hi(a, b + ' + c + ');\n}\n\n' +
                    'hello(' + a + ', ' + b + ')',
            }, level.language)

            addBads({q, a, b, c})
        },
        timeoutTime: 90000
    })


    return level

})
