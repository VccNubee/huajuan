import axios from 'axios'

function getVideoDetail(id) {
		return axios.get(`/pc/video/getVideoDetaiData?video_id=${id}`).then(res =>{
				return res.data
		})
}


export { getVideoDetail }
