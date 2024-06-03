define([
    'toxilibs/random',
    'level'
], function (random, Level) {

    const level = new Level({
        name: 'easy_maths'
    })


    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(1, 6)
            let b = random.intBetween(1, 6)
            q.addJSCode(a + ' + ' + b)
            q.addBadChoices([a, b, a + b + 1])
        }
    })


    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(1, 4)
            let b = random.intBetween(2, 4)
            q.addJSCode(a + ' * ' + b)
            q.addBadChoices([a, b + 1, a + b + 1, a + b])
        }
    })


    return level

})
