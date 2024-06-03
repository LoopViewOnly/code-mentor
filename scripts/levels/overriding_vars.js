define([
    'toxilibs/random',
    'level'
], function (random, Level) {

    const level = new Level({
        name: 'overriding_vars'
    })



    level.addQuestion({
        generator: function (q) {
            let a  = random.intBetween(0, 4)
            let aa = random.intBetween(0, 5)
            let b  = random.intBetween(0, 3)
            if (aa === a) {
                aa += 2
            }
            q.addCode({
                javascript: 'let a = ' + a + '\na = ' + aa + '\na + ' + b,
                python: 'a = ' + a + '\na = ' + aa + '\na + ' + b,
                csharp: 'int a = ' + a + ';\na = ' + aa + ';\na + ' + b,
            }, level.language)

            q.addBadChoices(a + b, a, aa, b, 'digit')
        }
    })


    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(0, 4)
            let b = random.intBetween(1, 3)
            let c = random.intBetween(0, 3) //FIXME make it different from b
            q.addCode({
                javascript: 'let a = ' + a + '\na = a + ' + b + '\na + ' + c,
                python: 'a = ' + a + '\na = a + ' + b + '\na + ' + c,
                csharp: 'int a = ' + a + ';\na = a + ' + b + ';\na + ' + c,
            }, level.language)

            q.addBadChoices(a + b, a, b, c, a + c, 'digit')
        }
    })


    return level

})
