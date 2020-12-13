function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403) //forbidden
    }
}

const tokenGenKey = {
    'secretword': 'secretkey', 
    'tokenKey': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6InNhbmpheSIsInBhc3N3b3JkIjoic2FuamF5In0sImlhdCI6MTYwNzc4MDIxMX0.pS02ggGFZlfJ3m5pzDRVXdMxpYssWAcFiPdc44cEIpU',
}

module.exports = {
    tokenGenKey,
    verifyToken
}