import axios from "axios"

const nodeUrl = process.env.REACT_APP_NODE_URL
const flaskUrl = process.env.REACT_APP_FLASK_URL

export const login = (email, password) => {
    return axios.post(nodeUrl + '/users/login/', {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data)
        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }
  
        return response.data
      })
  }

export const getCabins = async () => {
    const token = localStorage.getItem('user').replaceAll('"', '')
    console.log(token)
    try {
        const res = await axios.get(flaskUrl + '/cabins', { headers: { 'Authorization': token }});
        return res.data
    } catch (err) {
        return err
    }

}
export const getServices = async () => {
    try {
        const res = await axios.get(flaskUrl + '/services');
        return res.data
    } catch (err) {
        return err.response.msg
    }

}

export const addOrder = async (service, date, cabin) => {
    try {
        const token = localStorage.getItem('user').replaceAll('"', '')
        const formattedDate = ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + '-' + date.getFullYear();
        console.log(service, formattedDate, cabin)
        const body = {
            "service": service,
            "cabin_id": cabin,
            "date": formattedDate
        }
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }
        const res = await axios.post(flaskUrl + '/orders', body, headers)
        return res.data
    } catch (err) {
        return err.response.msg
    }
}

export const getOrders = async () => {
    const token = localStorage.getItem('user').replaceAll('"', '')
    console.log(token)
    try {
        const res = await axios.get(flaskUrl + '/orders', { headers: { 'Authorization': token }});
        return res.data
    } catch (err) {
        return err
    }

}

export const updateOrder = async (service, date, id) => {
    try {
        const token = localStorage.getItem('user').replaceAll('"', '')
        const formattedDate = ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + '-' + date.getFullYear();
        
        const body = {
            "service": service,
            "date": formattedDate
        }
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }
        const res = await axios.put(flaskUrl + '/orders/' + id, body, headers)
        return res.data
    } catch (err) {
        return err.response.msg
    }
}

export const deleteOrder = async (id) => {
    try {
        
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                
            }
        }
        const res = await axios.delete(flaskUrl + '/orders/' + id, headers)
        return res.data
    } catch (err) {
        return err.response.msg
    }
}