export const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

export async function getData(url, query) {
  try {
    const response = await fetch(`${url}/${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Problem with server. Please contact administrator');
  }
}
