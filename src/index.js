import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import router from './router'

ReactDOM.render(router, document.getElementById('root'));

serviceWorker.unregister();
