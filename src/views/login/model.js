import axios from 'axios'

function loginRec() {
		return axios.get('/pc/pcIndex/loginRec').then(res => {
				return res.data
		})
}

export {loginRec}
