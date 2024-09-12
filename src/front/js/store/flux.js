const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
		},
		actions: {
			getMessage: async () => {
					const uri = `${process.env.BACKEND_URL}/api/hello`
					const options = {headers: {'Content-types': 'application/json'}}
					const response = await fetch(uri, options)
					if (!response.ok) {
						console.log("Error loading message from backend", response.status, response.statusText);
						return;
					}
					const data = await response.json()
					setStore({ message: data.message })
					return data;
			},
		}
	};
};

export default getState;
/*
			getMessage: async () => {
				const uri = `${process.env.BACKEND_URL}/api/hello`;
				const options = {
					method: "GET"
				}
				const response = await fetch(uri, options)
				if (!response.ok){
					console.log("Error loading message from backend", reponse.status, response.statusText);
					return
				}
				const data  = await response.json()
				setStore({ message: data.message })
				return data;
*/