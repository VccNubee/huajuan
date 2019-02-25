import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import router from './router'
import './index.css'
import 'antd/dist/antd.min.css'
ReactDOM.render(router, document.getElementById('root'));

serviceWorker.unregister();
