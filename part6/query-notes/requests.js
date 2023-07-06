import axios from 'axios'

export const getNotes = () => axios.get('http://localhost:3001/api/notes').then(res => res.data)