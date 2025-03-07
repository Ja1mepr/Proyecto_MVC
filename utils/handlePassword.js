const bcryptjs = require('bcryptjs')

const encrypt = async (clearPassword) => {
    const result = await bcryptjs.hash(clearPassword, 10)
    return result
}

const compare = async (clearPassword, hashedPassword) => {
    const result = await bcryptjs.compare(clearPassword, hashedPassword)
    return result
}

module.exports = {encrypt, compare}