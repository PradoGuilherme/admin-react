const api = require('../Services/api')

const listCLients = async () => {
  const result = await api('/clients/list')
  return result.data
}

const createClient = async (client) => {
  console.log('TCL: createClient -> client', client)
  const result = await api.post('/clients/create', {
    ...client
  })
  console.log('TCL: createClient -> result', result)
  return result.data
}

const removeClients = async (idsToDelete) => {
  const result = await api.post('/clients/remove', {
    idsToDelete: idsToDelete
  })
  return result.data
}

export default { listCLients, createClient, removeClients }
