import App from './App.js';
import SavedDrafts from './components/SavedDrafts.js';

const app = App();
const drafts = SavedDrafts();

document.getElementById('root').appendChild(app);
document.getElementById('drafts').appendChild(drafts);
