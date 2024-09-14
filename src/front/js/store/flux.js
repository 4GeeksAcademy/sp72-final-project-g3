const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			currentUser: null,
			message: null,
			rol: {
				fan: [],
				artist: [],
				admin: [],
			},
			currentUser: [],
			user: [],
			login: [],
			signup: [],
			covers: [],
			cover:[],
			songs: [],
			song: [],
			spotify: [],
			comments: null,
			image: []
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
					return data;},
			postImage: async () => {
				const uri = `${process.env.BACKEND_URL}/api/upload`
				const options = {
					method: "POST"
				}
				const response = await fetch(uri, options)
				if (!response.ok){
					console.log("you got some backend problems", response.status, response.statusText);
					return
				}
				const data = await response.json()
				setStore({image: data.image})
				return data;
			},
			getUsers: async () => {
				const uri = `${process.env.BACKEND_URL}/api/users`
				const options = {
					method: "GET"
				}
				const response = await fetch(uri, options)
				if (!response.ok){
					console.log("WTF nothing to see here", response.status, response.statusText);
					return
				}
				const data = await response.json()
				setStore({users: data.users})
			},
			getUser: async () => {
				const uri = `${process.env.BACKEND_URL}/api/users/${user_id}`
				const options = {
					method: "GET"
				}
				const response = await fetch(uri, options)
				if (!response.ok){
					console.log("WTF nothing to see here", response.status, response.statusText);
					return
				}
				const data = await response.json()
				setStore({user: data.user})
			},
			login: async (email, password) => {
				const dataToSend = {email, password}
				const uri = `${process.env.BACKEND_URL}/api/login`
				const options = {
					method: "POST",
					body: JSON.stringify(dataToSend),
					headers: {
					  'Content-Type': 'application/json',
					}
				  }				  
				const response = await fetch(uri, options)
				if (!response.ok){
					console.log("WTF nothing to see here", response.status, response.statusText);
					return
				}
				const data = await response.json()
				setStore({currentUser: data.results})
				localStorage.setItem("token", data.access_token);
				localStorage.setItem("user", data.results);
			},
			signUp: async (email, password, rol) => {
				const dataToSend = {email, password, rol}
				const uri = `${process.env.BACKEND_URL}/api/signup`
				const options = {
					method: "POST",
					body: JSON.stringify(dataToSend),
					headers: {
					  'Content-Type': 'application/json',
					}
				  }				  
				const response = await fetch(uri, options)
				if (!response.ok){
					console.log("WTF nothing to see here", response.status, response.statusText);
					return
				}
				const data = await response.json()
				setStore({currentUser: data})
				localStorage.setItem("token", data.access_token);
				localStorage.setItem("user", data.results);
			},
			getArtists: async () => {
				
				const uri = `${process.env.BACKEND_URL}/api/artists`
				const options = {
					method: "GET"
				}
				const response = await fetch(uri, options)
				if (!response.ok){
					console.log("WTF nothing to see here", response.status, response.statusText);
					return
				}
				const data = await response.json()
				setStore({artists: data.artists})
			},
			getArtist: async () => {
				const uri = `${process.env.BACKEND_URL}/api/users/${artist_id}`
				const options = {
					method: "GET"
				}
				const response = await fetch(uri, options)
				if (!response.ok){
					console.log("WTF nothing to see here", response.status, response.statusText);
					return
				}
				const data = await response.json()
				setStore({artist: data.artist})
			},
			editArtist: async () => {
				const uri = `${process.env.BACKEND_URL}/api/users/${artist_id}`
				const options = {
					method: "PUT",
					headers:{
						'content-Type': 'aplication/json',
						"Authorization": `Bearer ${token}`
					}
				}
				const response = await fetch(uri, options)
				if (!response.ok){
					console.log("WTF nothing to see here", response.status, response.statusText);
					return
				}
				const data = await response.json()
				setStore({artist: data.artist})				
			},
			deleteArtist: async () => {
				const uri = `${process.env.BACKEND_URL}/api/users/${artist_id}`
				const options = {
					method: "DELETE",
					headers:{
						'content-Type': 'aplication/json',
						"Authorization": `Bearer ${token}`
					}
				}
				const response = await fetch(uri, options)
				if (!response.ok){
					console.log("WTF nothing to see here", response.status, response.statusText);
					return
				}
				const data = await response.json()
				setStore({artist: data.artist})
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