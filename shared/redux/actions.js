export const addContact = (username, id) => {
  return {
    type: 'addContact',
    username,
    id,
  }
}