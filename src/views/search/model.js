import axios from 'axios'

function searchHongren(kw) {
		return axios.get(`/search/searchHongren?KW=${kw}`).then(res => {
				return res.data
		})
}

function searchGoods(kw, offset) {
		return axios.get(`/search/searchGoods?KW=${kw}&offset=${offset}`).then(res => {
				return res.data
		})

}

export { searchGoods, searchHongren }
