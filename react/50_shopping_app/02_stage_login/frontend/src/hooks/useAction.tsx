import {useState,useEffect} from 'react';
import ShoppingItem from '../models/ShoppingItem';

interface State {
	list:ShoppingItem[];
}

interface UrlRequest {
	request:Request;
	action:string;
}

const useAction = ():{state:State,
					  add:(item:ShoppingItem) => void,
					  remove:(id:number) => void,
					  edit:(item:ShoppingItem) => void} => {
	
	const [state,setState] = useState<State>({
		list:[]
	})
	
	const [urlRequest,setUrlRequest] = useState<UrlRequest>({
		request:new Request("",{}),
		action:""
	})
	
	useEffect(() => {
		getList()
	},[]);
	
	useEffect(() => {
		
		const fetchData = async () => {
			const response = await fetch(urlRequest.request);
			if(!response) {
				console.log("Server did not respond");
				return;
			}
			if(response.ok) {
				switch(urlRequest.action) {
					case "getlist": {
						const temp = await response.json();
						if(!temp) {
							console.log("Failed to parse shopping list");
							return;
						}
						const list = temp as ShoppingItem[];
						setState({
							list:list
						})
						return;
					}
					case "additem": {
						getList();
						return;
					}
					case "removeitem": {
						getList();
						return;
					}
					case "edititem": {
						getList();
						return;
					}
					default:{
						return;
					}
				}
			} else {
				console.log("Server responded with a status "+response.status+" "+response.statusText)
			}
		}
		
		fetchData();
		
	},[urlRequest])

	const getList = () => {
		setUrlRequest({
			request:new Request("/api/shopping"),
			action:"getlist"
		})
	}
	
	const add = (item:ShoppingItem) => {
		setUrlRequest({
			request:new Request("/api/shopping",{
				"method":"POST",
				"headers":{
					"Content-Type":"application/json"
				},
				"body":JSON.stringify(item)
			}),
			action:"additem"
		})
	}
	
	const remove = (id:number) => {
		setUrlRequest({
			request:new Request("/api/shopping/"+id,{
				"method":"DELETE"
			}),
			action:"removeitem"
		})
	}
	
	const edit = (item:ShoppingItem) => {
		setUrlRequest({
			request:new Request("/api/shopping/"+item.id,{
				"method":"PUT",
				"headers":{
					"Content-Type":"application/json"
				},
				"body":JSON.stringify(item)
			}),
			action:"edititem"
		})
	}
	
	return {state,add,remove,edit};
}

export default useAction;