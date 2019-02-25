import axios from 'axios'

function getGoodsDetail(id) {
		return axios.get(`/pc/goods/getGoodsDetail?goods_id=${id}`).then(res =>{
				return res.data
		})
}


export { getGoodsDetail }
