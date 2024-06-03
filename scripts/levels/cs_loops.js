define([
    'toxilibs/random',
    'level',
    'levels/commons/bad_choices'
], function (random, Level, badChoices) {

    const level = new Level({
        name: 'cs_loops'
    })



    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(0, 3)
            let b = random.intBetween(5, 10)
            let answer = ""
            let wrong = ""
            for (let index = a; index < b; index++) {
                answer += `${index} ` 
                wrong += `${index + 1} ` 
            }
            answer = answer.trim()
            wrong = wrong.trim()
            q.addCode({
                javascript: `'${answer}'`,
                csharp: `for(int i = ${a}; i < ${b}; i++){\n\tConsole.Write(i + " ");\n}`
            }, level.language)

            q.addBadChoices(answer.slice(0, -2), answer.slice(2), answer.slice(4), wrong)
        },
        times: 3
    })


    level.addQuestion({
        generator: function (q) {
            let a = random.intBetween(0, 3)
            let b = random.intBetween(8, 12)
            let mod = random.intBetween(2, 3)
            let answer = ""
            let wrong = ""
            for (let index = a; index < b; index++) {
                if (index % mod == 0){
                    answer += `${index} ` 
                    wrong += `${index + 1} ` 
                }
            }
            answer = answer.trim()
            wrong = wrong.trim()
            q.addCode({
                javascript: `'${answer}'`,
                csharp: `for(int i = ${a}; i < ${b}; i++){\n\tif( i % ${mod} == 0){\n\t\tConsole.Write(i + " ");\n\t}\n}`
            }, level.language)

            q.addBadChoices(answer.slice(0, -2), answer.slice(2), answer.slice(4), wrong)
        },
        times: 2
    })

    return level

})
