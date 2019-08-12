const api = require('../Services/api')

const listCLients = async () => {
  const result = await api('/clients/list')
  return result.data
}

const createClient = async (client) => {
  const result = await api.post('/clients/create', {
    ...client
  })
  return result.data
}

const removeClients = async (idsToDelete) => {
  const result = await api.post('/clients/remove', {
    idsToDelete: idsToDelete
  })
  return result.data
}

const updateClient = async (client) => {
  const result = await api.put('/clients/edit', {
    ...client
  })
  return result.data
}

export default {
  listCLients,
  createClient,
  removeClients,
  updateClient
}
