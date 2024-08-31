const jwt = require('jsonwebtoken')

const createTokenClient = async(client, req, res) => {
    const token = jwt.sign({
        user: client.user,
    }, 'brttshop')
    
    res.status(200).json({message: 'Login successfully!', token: token})
}

module.exports = createTokenClient