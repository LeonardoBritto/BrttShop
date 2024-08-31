const jwt = require('jsonwebtoken')

const createTokenClient = async(client, req, res) => {
    const token = jwt.sign({
        user: client.user,
        id: client.id
    }, 'brttshop')
    
    res.status(200).json({message: 'Login successfully!', token: token})
}

module.exports = createTokenClient