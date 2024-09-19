import { PiFileCThin } from "react-icons/pi";

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
			currentUser: null,
			user: [],
			login: [],
			signup: [],
			covers: [],
			populars: [],
			cover:[],
			songs: [],
			song: [],
			spotify: [],
			votes: [],
			mostcomments: [],
			image: [],
			comments: null,
			image: null,
			uploadStatus: null,
			artist: []
		},
		actions: {
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
			getCurrentUser: async () => {
                const uri = `${process.env.BACKEND_URL}/auth/user`;
                const options = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
                const response = await fetch(uri, options);
                if (!response.ok) {
                    console.error("Error fetching current user:", response.status, response.statusText);
                    return;
                }
                const data = await response.json();
                setStore({ currentUser: data.user });
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
			getArtist: async (artist_id) => {
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
				setStore({ artist: data.results })
			},
			editArtist: async (artist_id, updatedArtistData) => {
				const uri = `${process.env.BACKEND_URL}/api/users/${artist_id}`
				const options = {
					method: "PUT",
					headers: {
						'content-Type': 'aplication/json',
						"Authorization": `Bearer ${localStorage.getItem('token')}`
					},
					body: JSON.stringify(updatedArtistData),
				};
				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log("WTF nothing to see here", response.status, response.statusText);
					return;
				}
				const data = await response.json()
				setStore({ artist: data.results })
				return true;
			},
			deleteArtist: async (artist_id) => {
				const uri = `${process.env.BACKEND_URL}/api/users/${artist_id}`
				const options = {
					method: "DELETE",
					headers: {
						"Authorization": `Bearer ${localStorage.getItem('token')}`,
					}
				}
				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log("WTF nothing to see here", response.status, response.statusText);
					return;
				}
				console.log("Artist deleted")
			},
			getComments: async () => {
				const uri = `${process.env.BACKEND_URL}/api/comments`
				const options = {
					method: "GET"
				}
				const response = await fetch(uri, options)
				if (!response.ok){
					console.log('Error loading message from backend", response.status, response.statusText')
					return
				}
				const data = await response.json();
				setStore({ comments: data.results })
				if (getStore().comments.length <= 3){
					setStore({mostcomments: data.results})
				} else {
					const lastIndex = Math.floor(Math.random() * (getStore().comments.length -2)) + 2;
					const mostcomments = [data.results[0], data.results[1], data.results[lastIndex]];
					setStore({mostcomments: mostcomments})

				}
			
			},
			getCovers: async () => {
				const uri = `${process.env.BACKEND_URL}/api/covers`
				const options = {
					method: 'GET'
				};
				const response = await fetch(uri, options)
				if (!response.ok){
					console.log('Error loading message from backend", reponse.status, response.statusText')
					return
				}
				const data = await response.json();
				setStore({ covers: data.results })
				if (getStore().covers.length <= 3){
					setStore({populars: data.results})
				} else {
					const lastIndex = Math.floor(Math.random() * (getStore().covers.length - 2)) + 2;
					const populars = [data.results[0], data.results[1], data.results[lastIndex]];
					setStore({populars: populars})
					
				}
				
			},
			getCover: async (cover_id) => {
				const uri = `${process.env.BACKEND_URL}/api/covers/${cover_id}`
				const options = {
					method: 'GET'
				};
				const response = await fetch(uri, options)
				if (!response.ok){
					console.log('Error loading message from backend", reponse.status, response.statusText')
					return
				};
				const data = await response.json();
				console.log(data);
				setStore({ cover: data.results })
			},
			Logout: () => {
				setStore({currentUser: ''})
				localStorage.removeItem("token");
				localStorage.removeItem("user");
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