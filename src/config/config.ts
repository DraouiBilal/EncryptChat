type configT = {uri:string,database:string}

const config:configT  = {
    uri:"mongodb://localhost/?maxPoolSize=20&w=majority",
    database:"EncryptChat"
}

export default config