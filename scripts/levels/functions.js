define([
    'toxilibs/random',
    'level'
], function (random, Level) {

    const level = new Level({
        name: 'functions'
    })



    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(0, 5)
            let b = random.intBetween(0, 5)
            if (b === a) {
                b += 2
            }
            q.addCode({
                javascript: 'function hello (a, b) {\n\treturn a + b\n}\n\nhello(' + a + ', ' + b + ')',
                python: 'def hello (a, b):\n\treturn a + b\n\nhello(' + a + ', ' + b + ')',
                csharp: 'static int hello(int a, int b) {\n\treturn a + b;\n}\n\nhello(' + a + ', ' + b + ')',
            }, level.language)

            q.addBadChoices(a, b, a + b + 1, 'digit')
        }
    })


    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(1, 3)
            let b = random.intBetween(2, 3)
            if (b === a) {
                b += 1
            }
            q.addCode({
                javascript: 'function hello (a, b) {\n\treturn a * b\n}\n\nhello(' + a + ', ' + b + ')',
                python: 'def hello (a, b):\n\treturn a * b\n\nhello(' + a + ', ' + b + ')',
                csharp: 'static int hello(int a, int b) {\n\treturn a * b;\n}\n\nhello(' + a + ', ' + b + ')',
            }, level.language)

            q.addBadChoices(a, b, a * b + 1, 'digit')
        }
    })


    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(2, 5)
            q.addCode({
                javascript: 'function hello (a) {\n\treturn a * a\n}\n\nhello(' + a + ')',
                python: 'def hello (a):\n\treturn a * a\n\nhello(' + a + ')',
                csharp: 'static int hello(int a) {\n\treturn a * a;\n}\n\nhello(' + a + ')',
            }, level.language)

            q.addBadChoices(a, a * 2, 'aa', 'digit')
        }
    })


    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(1, 24)
            q.addCode({
                javascript: 'function hello (a) {\n\treturn a\n}\n\nhello(' + a + ')',
                python: 'def hello (a):\n\treturn a\n\nhello(' + a + ')',
                csharp: 'static int hello(int a) {\n\treturn a;\n}\n\nhello(' + a + ')',
            }, level.language)

            q.addBadChoices(a + 1, 'a', 'digit')
        }
    })


    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(0, 4)
            let b = random.intBetween(0, 4)
            if (b === a) {
                b += 2
            }
            q.addCode({
                javascript: 'function hello () {\n\treturn ' + a + '\n}\n\nhello() + ' + b,
                python: 'def hello ():\n\treturn ' + a + '\n\nhello() + ' + b,
                csharp: 'static int hello() {\n\treturn ' + a + ';\n}\n\nhello() + ' + b,
            }, level.language)

            q.addBadChoices(a, b, a * b + 1, 'digit')
        }
    })


    return level

})
