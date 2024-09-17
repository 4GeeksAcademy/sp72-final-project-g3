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
			cover: [],
			songs: [],
			song: [],
			spotify: [],
			comments: null,
			image: null,
			uploadStatus: null
		},
		actions: {
			/*getMessage: async () => {
				const uri = `${process.env.BACKEND_URL}/api/hello`
				const options = { headers: { 'Content-types': 'application/json' } }
				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log("Error loading message from backend", response.status, response.statusText);
					return;
				}
				const data = await response.json()
				setStore({ message: data.message })
				return data;
			},*/
			postImage: async (imageFile) => {
				const uri = `${process.env.BACKEND_URL}/api/upload`;
				const formData = new FormData();
				formData.append('image', imageFile);  // 'file' es el nombre del campo esperado por el backend
				const options = {
					method: "POST",
					headers: {
						'Authorization': `Bearer ${token}`
					},
					body: formData
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("you got some backend problems", response.status, response.statusText);
					return;
				}
				const data = await response.json();
				setStore({ image: data.results });
				return data;
			},
			getUsers: async () => {
				const uri = `${process.env.BACKEND_URL}/api/users`
				const options = {
					method: "GET",
					headers: {
						'Content-Type': 'application/json'
					}
				}
				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log("WTF nothing to see here", response.status, response.statusText);
					return
				}
				const data = await response.json()
				setStore({ users: data.result })
			},
			getUser: async () => {
				const uri = `${process.env.BACKEND_URL}/api/users/${user_id}`
				const options = {
					method: "GET",
					headers: {
						'Content-Type': 'application/json'
					}
				}
				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log("WTF nothing to see here", response.status, response.statusText);
					return
				}
				const data = await response.json()
				setStore({ user: data.result })
			},
			login: async (email, password) => {
				const dataToSend = { email, password }
				const uri = `${process.env.BACKEND_URL}/api/login`
				const options = {
					method: "POST",
					body: JSON.stringify(dataToSend),
					headers: {
						'Content-Type': 'application/json',
					}
				}
				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log("WTF nothing to see here", response.status, response.statusText);
					return
				}
				const data = await response.json()
				setStore({ currentUser: data.results })
				localStorage.setItem("token", data.access_token);
				localStorage.setItem("user", data.results);
			},
			signUp: async (email, password, rol) => {
				const dataToSend = { email, password, rol }
				const uri = `${process.env.BACKEND_URL}/api/signup`
				const options = {
					method: "POST",
					body: JSON.stringify(dataToSend),
					headers: {
						'Content-Type': 'application/json',
					}
				}
				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log("WTF nothing to see here", response.status, response.statusText);
					return
				}
				const data = await response.json()
				setStore({ currentUser: data })
				localStorage.setItem("token", data.access_token);
				localStorage.setItem("user", data.results);
			},
			getArtists: async () => {

				const uri = `${process.env.BACKEND_URL}/api/artists`
				const options = {
					method: "GET"
				}
				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log("WTF nothing to see here", response.status, response.statusText);
					return
				}
				const data = await response.json()
				setStore({ artists: data.artists })
			},
			getArtist: async () => {
				const uri = `${process.env.BACKEND_URL}/api/users/${artist_id}`
				const options = {
					method: "GET"
				}
				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log("WTF nothing to see here", response.status, response.statusText);
					return
				}
				const data = await response.json()
				setStore({ artist: data.artist })
			},
			editArtist: async () => {
				const uri = `${process.env.BACKEND_URL}/api/users/${artist_id}`
				const options = {
					method: "PUT",
					headers: {
						'content-Type': 'aplication/json',
						"Authorization": `Bearer ${token}`
					}
				}
				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log("WTF nothing to see here", response.status, response.statusText);
					return
				}
				const data = await response.json()
				setStore({ artist: data.artist })
			},
			deleteArtist: async () => {
				const uri = `${process.env.BACKEND_URL}/api/users/${artist_id}`
				const options = {
					method: "DELETE",
					headers: {
						'content-Type': 'aplication/json',
						"Authorization": `Bearer ${token}`
					}
				}
				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log("WTF nothing to see here", response.status, response.statusText);
					return
				}
				const data = await response.json()
				setStore({ artist: data.artist })
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