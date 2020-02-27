
import { API } from '../api';


const getToken = async (data) => {

    return new Promise((resolve, reject)=>{
        const cb = {
            success: (res) => resolve(res),
            error: (err) => reject(err)
        }
        API.getToken(data, cb);
    })

}

export default getToken;