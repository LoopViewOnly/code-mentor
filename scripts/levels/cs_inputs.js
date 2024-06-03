define([
    'toxilibs/random',
    'level',
    'levels/commons/bad_choices'
], function (random, Level, badChoices) {

    const randomLetters = random.unmistakableLetters
    const level = new Level({
        name: 'cs_inputs'
    })


    level.addQuestion({
        generator: function (q) {
            let a = randomLetters(4)

            q.addCode({
                javascript: `let name = "${a}"\nname`,
                csharp: `string name = Console.ReadLine(); // Input: '${a}'\nConsole.WriteLine(name);`
            }, level.language)
        },
    })

    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(1, 100)

            q.addCode({
                javascript: 'let n = '+ a + '\n n ',
                csharp: `int n = int.Parse(Console.ReadLine()); // Input: ${a}\nConsole.WriteLine(n);`
            }, level.language)
        },
    })

    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(1, 100)
            let b = random.intBetween(1, 5)

            q.addCode({
                javascript: 'let n = '+ a + '\n n + '+ b,
                csharp: `int n = int.Parse(Console.ReadLine()); // Input: ${a}\nConsole.WriteLine(n + ${b});`
            }, level.language)
        },
        times: 2
    })

    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(1, 10)
            let b = random.intBetween(1, 10)

            q.addCode({
                javascript: a+b,
                csharp: `int n1 = int.Parse(Console.ReadLine()); // Input: ${a}\nint n2 = int.Parse(Console.ReadLine()); // Input: ${b}\nConsole.WriteLine(n1 + n2);`
            }, level.language)
        },
        times: 2
    })

    level.addQuestion({
        generator: function (q) {
            let a = random.pick(random.intBetween(1, 10), randomLetters(2))
            let b = random.pick(random.intBetween(1, 10), randomLetters(2))

            q.addCode({
                javascript: `'${a}${b}'`,
                csharp: `string n1 = Console.ReadLine(); // Input: '${a}'\nstring n2 = Console.ReadLine(); // Input: '${b}'\nConsole.WriteLine(n1 + n2);`
            }, level.language)
        },
        times: 3
    })

    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(1, 5)

            q.addCode({
                javascript: `'Error'`,
                csharp: `int x = Console.ReadLine(); // Input: '${a}'\nConsole.WriteLine(x + 1);`
            }, level.language)
            q.addBadChoices(a, a+1, a*2, a-1, 'a')
        }
    })


    return level

})
