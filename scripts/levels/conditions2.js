define([
    'toxilibs/random',
    'level'
], function (random, Level) {

    const level = new Level({
        name: 'conditions2'
    })


    // level.addQuestion({
    //     generator: function (q) {
    //         let condition1 = random.intBetween(1, 7)
    //         let condition2 = random.intBetween(4, 15)
    //         let condition3 = random.intBetween(1, 9)
    //         let condition4 = random.intBetween(1, 9)
    //         if (condition1 === condition2) {
    //             condition1 += 2
    //         }
    //         if (condition3 === condition4) {
    //             condition3 += 2
    //         }
    //         let a = random.intBetween(1, 5)
    //         let b = random.intBetween(1, 5)
    //         let c = random.intBetween(1, 5)
    //         let d = random.intBetween(1, 4)
    //         if (b === a) {
    //             b += 2
    //         }
    //         if (a === c) {
    //             c += 2
    //         }
    //         if (b === c) {
    //             c += 1
    //         }
    //         q.addCode({
    //             javascript: 'let a = 0\nif (' + condition1 + ' < ' + condition2 + ') {\n\t' +
    //                 'a = ' + a + '\n} else if (' + condition3 + ' < ' + condition4 + ') {\n\t' +
    //                 'a = ' + b + '\n} else {\n\ta = ' + c + '\n}\na + ' + d,
    //             python: 'if ' + condition1 + ' < ' + condition2 + ':\n\ta = ' + a + '\n' +
    //                 'elif ' + condition3 + ' < ' + condition4 + ':\n\ta = ' + b + '\n' +
    //                 'else:\n\ta = ' + c + '\n\na + ' + d,
    //             csharp: 'int a = 0;\nif (' + condition1 + ' < ' + condition2 + ') {\n\t' +
    //                 'a = ' + a + ';\n} else if (' + condition3 + ' < ' + condition4 + ') {\n\t' +
    //                 'a = ' + b + ';\n} else {\n\ta = ' + c + ';\n}\na + ' + d,
    //         }, level.language)

    //         q.addBadChoices(a, b, c, d, a + d, b + d, c + d)
    //     },
    //     times: 3
    // })

    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(1, 5)
            let b = random.intBetween(1, 5)
            let c = random.intBetween(3, 9)
            let d = random.intBetween(1, 4)
            let f = random.intBetween(1, 3)
            if (b === d) {
                b += 2
            }
            if (d === c) {
                c += 2
            }
            if (b === c) {
                c += 1
            }
            q.addCode({
                javascript: 'let a = '+ a + '\nif (a' + ' > ' + b +' && a < ' + c +') {\n\t' +
                    'a = ' + b + '\n} else if (a === ' + c + ' || a === '+ d +') {\n\t' +
                    'a = ' + c + '\n} else {\n\ta = ' + d+ '\n}\na + ' + f,
                python: 'a = '+ a + '\nif a' + ' > ' + b +' and a < ' + c +':\n\t' +
                'a = ' + b + '\nelif a == ' + c + ' or a == '+ d +':\n\t' +
                'a = ' + c + '\nelse:\n\ta = ' + d+ '\na + ' + f,
                csharp: 'int a = '+ a + ';\nif (a' + ' > ' + b +' && a < ' + c +') {\n\t' +
                    'a = ' + b + ';\n} else if (a == ' + c + ' || a == '+ d +') {\n\t' +
                    'a = ' + c + ';\n} else {\n\ta = ' + d+ ';\n}\na + ' + f,
            }, level.language)

            q.addBadChoices(a, b, c, d, a + d, b + d, c + d)
        },
        times: 3
    })

    return level

})


// int a = 0;
// if (a > 3 && a < 7){
//     a = 3;
// }
// else if(a == 4 || a == 5){
//     a = 6;
// }
// else{
//     a = 1;
// }
// Console.WriteLine(a + 5);