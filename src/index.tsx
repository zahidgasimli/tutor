import ReactDOM from 'react-dom';
import Setup from './boot/setup';
import './index.css';
import 'react-image-lightbox/style.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Setup />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
