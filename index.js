import { axios } from 'axios';

import { URLSearchParams } from 'url';
const params = new URLSearchParams({ img: 'src' });
axios.post(
  'https://memegen-link-examples-upleveled.netlify.app/',
  params.toString(),
);
