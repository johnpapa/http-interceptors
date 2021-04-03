import axios from 'axios';

export function csrfHeaders() {
  let token = 'your-csrf-token-goes-here';

  axios.defaults.headers.common['x-csrf-token'] = token;
}
