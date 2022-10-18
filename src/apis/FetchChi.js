import axios from 'axios';

export default axios.create({
	baseURL: "https://api.artic.edu/api/v1"
})

//IDs
//16564
//23096
//20347
//28067
//109275
//109260
//23968
//229379
//24096
//47149
//229406
//229361
//230609
//64818
//149784
//147634
//181213
//149068
//149069
//235740

export const chiOptions = {
	method: 'GET',
  };

export const fetchData = async (url, options) =>{
	const response = await fetch(url, options)
	const data = await response.json();

	return data;
}