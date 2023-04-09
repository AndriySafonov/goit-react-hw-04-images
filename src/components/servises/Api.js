

import axios from 'axios';

export async function FetchApi(searchQuery, page) {
  const KEY = `33719885-4078ecd8a7ef8c07d3287ea16`;
  const BASE_URL = `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  const response = await axios.get(BASE_URL);

  return response;
}



// export function fetchSearchImage(page, searchQuery) {
//     const API_URL = 'https://pixabay.com/api/';
//     const KEY = '?key=32918808-7bed14219e5e11c2127636ebd';

//     return fetch(`${API_URL}${KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`).then(response => {
//         console.log(response);
//         if (!response.ok) {
//             throw new Error(response.statusText);
//         }

//         return response.json();
//     });
// }
// export default FetchApi;
