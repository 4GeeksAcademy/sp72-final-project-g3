import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import '../../styles/artistpage.css';
import { useParams } from 'react-router-dom';

export const ArtistPage = () => {
  const { store, actions } = useContext(Context);
  const { artist_id } = useParams(); 
  const [editMode, setEditMode] = useState(false); 
  const [formData, setFormData] = useState({});
  useEffect(() => {
    actions.getArtist(artist_id); 
    actions.getCurrentUser();      
  }, [artist_id]);

  useEffect(() => {
    if (store.artist) {
      setFormData({
        name: store.artist.name,
        genre: store.artist.genre,
        country: store.artist.country,
        description: store.artist.description,
        website: store.artist.website,
        // Necesito poner el resto de datos del artista, (si me da tiempo)
      });
    }
  }, [store.artist]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async () => {
    const success = await actions.editArtist(artist_id, formData);
    if (success) setEditMode(false); // Si la actualización fue exitosa, salir del modo edición
  };

  const handleDelete = async () => {
    const success = await actions.deleteArtist(artist_id);
    if (success) {
      console.log("Artist deleted, redirect to home or another page");
    }
  };

  return (
    <div className="artist-page">
      {store.artist && (
        <div>
          <div className="artist-header">
            <div className="artist-image">
              <img src={store.artist.artwork} alt={store.artist.name} />
            </div>
            <div className="artist-info">
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                />
              ) : (
                <h1>{store.artist.name}</h1>
              )}
              <p>{store.artist.genre}</p>
              <p>{store.artist.country}</p>
              <p>{store.artist.description}</p>
              <a href={store.artist.website}>Website</a>
            </div>
          </div>

          {/* Modo edición */}
          {store.currentUser && store.currentUser.user_id === store.artist.user_id && (
            <div className="artist-actions">
              {editMode ? (
                <>
                  <button onClick={handleEditSubmit}>Save</button>
                  <button onClick={() => setEditMode(false)}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => setEditMode(true)}>Edit</button>
                  <button onClick={handleDelete}>Delete</button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

