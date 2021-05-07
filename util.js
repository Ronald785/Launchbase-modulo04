module.exports = {
    age: function age(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)
    
        //2021 - 2001 = 20
        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()
    
        // 10 - 4 ou 10 - 10 Nem se for o mês é garantido
        if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
            age = age - 1
        } 
    
        return age
    },
    date: function birth(timestamp) {
        const date = new Date(timestamp)

        //yyyy
        const year = date.getUTCFullYear()
        //mm
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        //dd
        const day = `0${date.getUTCDate()}`.slice(-2)

        //return yyyy-mm-dd
        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }
    }
}