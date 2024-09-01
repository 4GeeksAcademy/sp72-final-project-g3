"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Artists, Covers, Comments, Fans, Follows, Songs
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from datetime import datetime


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/users', methods=['GET'])
def handle_users():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Users)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = "you are getin all the Users"
        return response_body, 200


@api.route('/login', methods=["POST"])
def login():
    response_body = {}
    data = request.json
    email = data.get('email', None).lower()
    password = data.get('password', None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active == True)).scalar()
    if not user:
        response_body['message'] = 'Something is wrong, check your email/password or user innactive'
        return response_body, 401
    access_token = create_access_token(identity={'email': email,
                                                'user_id': user.id,
                                                'rol': user.rol})
    response_body['results'] = user.serialize()
    response_body['message'] = 'User logged'
    response_body['access_token'] = access_token
    return response_body, 201


@api.route('/signup', methods=['POST'])
def signup():
    response_body = {}
    data = request.json
    email = data.get('email', None)
    password = data.get('password', None)
    rol = data.get('rol', None)

    if not email or not password:
        response_body['message'] = 'Email and password required.'
        return jsonify(response_body), 400
    # crate fan or artist into database
    user = db.session.execute(db.select(Users).where(Users.email == email)).scalar()
    if user: 
        response_body['message'] = 'The user already exist'
        return response_body, 400
    dict_rol = {}
    if rol == 'fan':
        user = Users(email=email, password=password, rol=rol)
        db.session.add(user)
        db.session.commit()
        fan = Fans(user_id = user.id)
        db.session.add(fan)
        db.session.commit()
        dict_rol['fan_id'] = fan.id
    if rol == 'artist':
        user = Users(email=email, password=password, rol=rol)
        db.session.add(user)
        db.session.commit()
        artist = Artists(user_id = user.id)
        db.session.add(artist)
        db.session.commit()
        dict_rol['artist_id'] = artist.id
    if not dict_rol:
        response_body['message'] = 'Request rejected. Not a valid rol'
        return response_body, 400
    access_token = create_access_token(identity={'email': user.email,
                                                 'user_id': user.id,
                                                 'rol': user.rol})
    response_body['results'] = user.serialize()
    response_body['results'].update(dict_rol)
    response_body['message'] = f'User registered sucesfully with rol: {rol}'
    response_body['access_token'] = access_token
    return (response_body), 201


@api.route('/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_user(user_id):
    response_body = {}
    if request.method == 'GET':
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if not user:
            response_body['message'] = f'User whit id {user_id} not found'
            response_body['results'] = {}
            return response_body, 404
        response_body['results'] = user.serialize()
        response_body['message'] = f'User {user_id} exist'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if not user:
            response_body['message'] = f'User with id {user_id} not found'
            response_body['results'] = {}
            return response_body, 404
        email = data.get('email', None)
        if email:
            user_exist = db.session.execute(db.select(Users).where(Users.email == email, Users.id != user_id)).scalar()
            if user_exist:
                response_body['message'] = 'User with this email already exists'
                response_body['results'] = {}
                return response_body, 409
        user.email = email if email else user.email
        user.is_active = data.get('is_active', user.is_active)
        user.rol = data.get('rol', user.rol)
        db.session.commit()
        response_body['message'] = f'User {user_id} updated successfully'
        response_body['results'] = user.serialize()
        return response_body, 200

    if request.method == 'DELETE':
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if not user:
            response_body['message'] = f'User with id {user_id} not found'
            response_body['results'] = {}
            return response_body, 404
        db.session.delete(user)
        db.session.commit()
        response_body['message'] = f'User {user_id} deleted successfully'
        return response_body, 200


@api.route('/artists', methods=['GET'])
def handle_artists():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Artists)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = "Here are all the masterminds"
        return response_body, 200


@api.route('/artists/<int:artist_id>', methods=['GET'])
def handle_artist_get(artist_id):
    response_body = {}
    if request.method == 'GET':
        row = db.session.execute(db.select(Artists).where(Artists.id == artist_id)).scalar()
        if not row:
            response_body['results'] = {}
            response_body['message'] = f' this artist {artist_id} not exist'
            return response_body, 404
        response_body['results'] = row.serialize()
        response_body['message'] = f'There is the artist by ID {artist_id}'
        return response_body, 200


@api.route('/artists/<int:artist_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def handle_artist(artist_id):
    response_body = {}
    current_user = get_jwt_identity()
    if current_user['rol'] != 'artist':
        response_body['results'] = {}
        response_body['message'] = f'The user is not an artist'
        return response_body, 404
    row = db.session.execute(db.select(Artists).where(Artists.id == artist_id)).scalar()
    if not row:
        response_body['message'] = f'Artist with id {artist_id} not found'
        response_body['results'] = {}
        return response_body, 404
    if current_user['user_id'] != row.user_id:
        response_body['results'] = {}
        response_body['message'] = f'unauthorized, you do not have the required role'
        return response_body, 403
    if request.method == 'PUT':
        data = request.json
        row = db.session.execute(db.select(Artists).where(Artists.id == artist_id)).scalar()
        row.name = fata.get('name', row.name)
        row.genre = data.get('genre', row.genre)
        row.foundation = data.get('foundation', row.foundation)
        row.country = data.get('country', row.country)
        row.description = data.get('description', row.description)
        row.artwork = data.get('artwork', row.artwork)
        row.website = data.get('website', row.website)
        row.youtube = data.get('youtube', row.youtube)
        row.instagram = data.get('instagram', row.instagram)
        row.tiktok = data.get('tiktok', row.tiktok)
        row.facebook = data.get('facebook', row.facebook)
        row.twitter = data.get('twitter', row.twitter)
        row.is_band = data.get('is_band', row.is_band)
        row.members = data.get('members', row.members)
        row.status = data.get('status', row.status)
        row.record_label = data.get('record_label', row.record_label)
        db.session.commit()
        response_body['message'] = f'Artist {artist_id} updated successfully'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        row = db.session.execute(db.select(Artists).where(Artists.id == artist_id)).scalar()
        db.session.delete(row)
        user.is_active = False
        db.session.commit()
        response_body['message'] = f'Artist {artist_id} deleted successfully'
        return response_body, 200


@api.route('/fans', methods=['GET'])
def handle_fans():
    response_body = {}
    if request.method == 'GET':
        row = db.session.execute(db.select(Fans)).scalars()
    if not row:
        response_body['results'] = {}
        response_body['message'] = f' this fan {fan_id} not exist'
        return response_body, 404
    results = [row.serialize() for row in row]
    response_body['results'] = results
    response_body['message'] = "Fan list"
    return response_body, 200


@api.route('/fans/<int:fan_id>', methods=['GET'])   
@jwt_required() 
def handle_fan_get(fan_id):
    response_body = {}
    current_user = get_jwt_identity()
    if current_user['rol'] != 'fan':
        response_body['results'] = {}
        response_body['message'] = f'the user is not a fan'
        return response_body, 404
    row = db.session.execute(db.select(Fans).where(Fans.id == fan_id)).scalar()
    if not row:
        response_body['message'] = f'Fan with id {fan_id} not found'
        response_body['results'] = {}
        return response_body, 404
    if current_user['user_id'] != row.user_id:
        response_body['results'] = {}
        response_body['message'] = f'unauthorized, you do not have the required role'
        return response_body, 403
    if request.method == 'GET':
        row = db.session.execute(db.select(Fans).where(Fans.id == fan_id)).scalar()
        if not row:
            response_body['results'] = {}
            response_body['message'] = f' this fan {fan_id_id} not exist'
            return response_body, 404
        response_body['results'] = row.serialize()
        response_body['message'] = f'Fan by ID {fan_id}'
        return response_body, 200


@api.route('/fans/<int:fan_id>', methods=['PUT', 'DELETE']) 
@jwt_required()    
def handle_fan(fan_id):
    response_body = {}
    current_user = get_jwt_identity()
    if current_user['rol'] != 'fan':
        response_body['results'] = {}
        response_body['message'] = f'El usuario no es un fan'
        return response_body, 404
    row = db.session.execute(db.select(Fans).where(Fans.id == fan_id)).scalar()
    if not row:
        response_body['results'] = {}
        response_body['message'] = f'No existe el fan {fan_id}'
        return response_body, 403
    if current_user['user_id'] != row.user_id:
        response_body['results'] = {}
        response_body['message'] = f'No tiene autorización para realizar esta acción'
        return response_body, 403
    if request.method == 'PUT':
        data = request.get_json()
        row = db.session.execute(db.select(Fans).where(Fans.id == fan_id)).scalar()
        row.name = data.get('name', row.name)
        row.nationality = data.get('nationality', row.nationality)
        row.about = data.get('about', row.about)
        row.profile_picture = data.get('profile_picture', row.profile_picture)
        row.date_of_birth = data.get('date_of_birth', row.date_of_birth)
        row.updated_at = datetime.utcnow()
        db.session.commit()
        response_body['results'] = row.serialize()
        response_body['message'] = f'recibí el PUT request {fan_id}'
        return response_body, 200
    if request.method == 'DELETE':
        row = db.session.execute(db.select(Fans).where(Fans.id == fan_id)).scalar()
        db.session.delete(row)
        user.is_active = False
        db.session.commit()
        response_body['results'] = {}
        response_body['message'] = f'El usuario ha sido desactivado'
        return response_body, 200
        # solo cambiar el active a false(no borrar)


@api.route('/comments', methods=['POST'])
@jwt_required()
def handle_comments():
    response_body = {}
    current_user = get_jwt_identity()
    if current_user['rol'] !='fan': # Qué sea usuario registrado con el rol adecuado.
        response_body['results'] = {}
        response_body['message'] = f'pedro pedro pedro pedro...'
        return response_body, 403
    if request.method == 'POST':
        data = request.json
        title = data.get('title', None)
        body = data.get('body', None)
        media_type = data.get('media_type', None)
        responses = data.get('responses', None)   
        date = data.get('date', None)
        user_id = data.get('user_id', None)
        cover_id = data.get('cover_id', None)    
        comments = Comments(title=title, body=body, media_type=media_type, responses=responses, date=date, user_id=user_id, cover_id=cover_id)
        db.session.add(comments)
        db.session.commit()
        response_body["message"] = f'you commented succesfully' 
        return response_body, 200


@api.route('/comments', methods=['GET'])
def handle_all_comments():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Comments)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = "you are getin all the Covers"
        return response_body, 200


@api.route('/comments/<int:comment_id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required() 
def handle_comment(comment_id):
    response_body = {}
    current_user = get_jwt_identity()
    if request.method == 'GET':
        row = db.session.execute(db.select(Comments).where(Comments.id == comment_id)).scalar()
        if not row:
            response_body['message'] = f'Comment with id {comment_id} not found'
            response_body['results'] = {}
            return response_body, 404
        response_body['results'] = row.serialize()
        response_body['message'] = f'Comment {comment_id} retrieved successfully'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row = db.session.execute(db.select(Comments).where(Comments.id == comment_id)).scalar()
        if not row:
            response_body['message'] = f'Comment with id {comment_id} not found'
            response_body['results'] = {}
            return response_body, 404
        row.title = data.get('title', row.title)
        row.body = data.get('body', row.body)
        row.media_type = data.get('media_type', row.media_type)
        row.responses = data.get('responses', row.responses)
        row.date = data.get('date', row.date)
        db.session.commit()
        response_body['message'] = f'Comment {comment_id} updated successfully'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        row = db.session.execute(db.select(Comments).where(Comments.id == comment_id)).scalar()
        if not row:
            response_body['message'] = f'Comment with id {comment_id} not found'
            response_body['results'] = {}
            return response_body, 404
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Comment {comment_id} deleted successfully'
        return response_body, 200

@api.route('/votes', methods=['POST'])
@jwt_required()
def handle_votes():
    response_body = {}
    current_user = get_jwt_identity()
    if current_user['rol'] != 'fan': # Qué sea usuario registrado con el rol adecuado.
        response_body['results'] = {}
        response_body['message'] = f'El usuario no es un fan'
        return response_body, 404
    if request.method == 'POST':
        data = request.json
        vote = data.get('vote', None)
        vote_date = data.get('vote_date', None)
        user_id = data.get('user_id', None)
        cover_id = data.get('cover_id', None)       
        if not fan:
            response_body['results'] = {}
            response_body["message"] = "your not allowed to do that."
            return response_body, 400
        votes = Votes(vote=vote, vote_date=vote_date, user_id=user_id, cover_id=cover_id)
        db.session.add(votes)
        db.session.commit()
        response_body["message"] = f'you {user_id} voted {cover_id} succesfully' # Qué muestre el voto validado. {fan.id} votado a {cover.id}
        return response_body, 200


@api.route('/votes/<int:vote_id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def handle_vote(vote_id):
    response_body = {}
    if request.method == 'GET':
        row = db.session.execute(db.select(Votes).where(Votes.id == vote_id)).scalar()
        if not row:
            response_body['message'] = f'Vote with id {vote_id} not found'
            response_body['results'] = {}
            return response_body, 404
        response_body['results'] = row.serialize()
        response_body['message'] = f'Vote {vote_id} retrieved successfully'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row = db.session.execute(db.select(Votes).where(Votes.id == vote_id)).scalar()
        if not row:
            response_body['message'] = f'Vote with id {vote_id} not found'
            response_body['results'] = {}
            return response_body, 404
        row.vote = data.get('vote', row.vote)
        db.session.commit()
        response_body['message'] = f'Vote {vote_id} updated successfully'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        row = db.session.execute(db.select(Votes).where(Votes.id == vote_id)).scalar()
        if not row:
            response_body['message'] = f'Vote with id {vote_id} not found'
            response_body['results'] = {}
            return response_body, 404
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Vote {vote_id} deleted successfully'
        return response_body, 200


@api.route('/songs', methods=['POST'])
@jwt_required()
def handle_songs():
    response_body = {}
    current_user = get_jwt_identity()
    if current_user['rol'] != 'artist': # Qué sea usuario registrado con el rol adecuado.
        response_body['results'] = {}
        response_body['message'] = f'El usuario no es un artista'
        return response_body, 403
    if request.method == 'POST':
        data = request.json
        id = data.get('id', None)
        title = data.get('title', None)
        genre = data.get('genre', None)
        releaseDate = data.get('releaseDate', None)
        lyrics = data.get('lyrics', None)
        isrc = data.get('isrc', None)    
        if not title:
            response_body['results'] = {}
            response_body["message"] = "Song title is missing"
            return response_body, 400
        songs = Songs(title=title, genre=genre, releaseDate=releaseDate, lyrics=lyrics, isrc=isrc)
        db.session.add(songs)
        db.session.commit()
        response_body["message"] = f'you created {songs.title} succesfully' # Qué muestre el nombre de la canción creada
        return response_body, 200


@api.route('/songs', methods=['GET'])
def handle_all_songs():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Songs)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = "you are getin all the Songs"
        return response_body, 200


@api.route('/songs/<int:song_id>', methods=['GET'])
def handle_song_get(song_id):
    response_body = {}
    if request.method == 'GET':
        row = db.session.execute(db.select(Songs).where(Songs.id == song_id)).scalar()
        if not row:
            response_body['message'] = f'Song with id {song_id} not found'
            response_body['results'] = {}
            return response_body, 404
        response_body['results'] = row.serialize()
        response_body['message'] = f'Song {song_id} retrieved successfully'
        return response_body, 200


@api.route('/songs/<int:song_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def handle_song(song_id):
    response_body = {}
    current_user = get_jwt_identity()
    if current_user['rol'] != 'artist': # Qué sea usuario registrado con el rol adecuado.
        response_body['results'] = {}
        response_body['message'] = f'El usuario no es un artista'
        return response_body, 404
    if request.method == 'PUT':
        data = request.json
        row = db.session.execute(db.select(Songs).where(Songs.id == song_id)).scalar()
        if not row:
            response_body['message'] = f'Song with id {song_id} not found'
            response_body['results'] = {}
            return response_body, 404
        row.title = data.get('title', row.title)
        row.genre = data.get('genre', row.genre)
        row.releaseDate = data.get('releaseDate', row.releaseDate)
        row.lyrics = data.get('lyrics', row.lyrics)
        row.isrc = data.get('isrc', row.isrc)
        db.session.commit()
        response_body['message'] = f'Song {song_id} updated successfully'
        response_body['results'] = row.serialize()
        return response_body, 200

    if request.method == 'DELETE':
        row = db.session.execute(db.select(Songs).where(Songs.id == song_id)).scalar()
        if not row:
            response_body['message'] = f'Song with id {song_id} not found'
            response_body['results'] = {}
            return response_body, 404
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Song {song_id} deleted successfully'
        return response_body, 200


@api.route('/covers', methods=['POST'])
@jwt_required()
def handle_covers():
    response_body = {}
    current_user = get_jwt_identity()
    if current_user['rol'] != 'artist':
        response_body['results'] = {}
        response_body['message'] = f'El usuario no es un artista'
        return response_body, 404
    if request.method == 'POST':
        data = request.json
        name = data.get('name', None)
        release_date = data.get('release_date', None)
        genre = data.get('genre', None)
        description = data.get('description', None)
        published_url = data.get('published_url', None)
        valuation = data.get('valuation', None)
        if not release_date:
            response_body['results'] = {}
            response_body["message"] = "release_date is missing"
            return response_body, 400
        covers = Covers(name=name, release_date=release_date, genre=genre, description=description, published_url=published_url, valuation=valuation)
        db.session.add(covers)
        db.session.commit()
        response_body["message"] = "El cover ha sido subido correctamente"
        return response_body, 200


@api.route('/covers', methods=['GET'])
def handle_all_covers():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Covers)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = "you are getin all the Covers"
        return response_body, 200


@api.route('/covers/<int:cover_id>', methods=['GET'])
def handle_cover_get(cover_id):
    response_body = {}
    if request.method == 'GET':
        row = db.session.execute(db.select(Covers).where(Covers.id == cover_id)).scalar()
        if not row:
            response_body['results'] = {}
            response_body['message'] = f'Cover with id {cover_id} not found'
            return response_body, 404
        response_body['results'] = row.serialize()
        response_body['message'] = f'Cover {cover_id} retrieved successfully'
        return response_body, 200


@api.route('/covers/<int:cover_id>', methods=['PUT', 'DELETE'])
@jwt_required() 
def handle_cover(cover_id):
    response_body = {}
    current_user = get_jwt_identity()
    if current_user['rol'] != 'artist':
        response_body['results'] = {}
        response_body['message'] = f'El usuario no es un fan'
        return response_body, 404
    row = db.session.execute(db.select(Covers).where(Covers.id == cover_id)).scalar()
    if not row:
            response_body['message'] = f'Cover with id {cover_id} not found'
            response_body['results'] = {}
            return response_body, 404
    if request.method == 'PUT':
        data = request.json
        row = db.session.execute(db.select(Covers).where(Covers.id == cover_id)).scalar()
        row.release_date = data.get('release_date', row.release_date)
        row.genre = data.get('genre', row.genre)
        row.description = data.get('description', row.description)
        row.published_url = data.get('published_url', row.published_url)
        row.valuation = data.get('valuation', row.valuation)
        db.session.commit()
        response_body['results'] = row.serialize()
        response_body['message'] = f'Cover {cover_id} updated successfully'
        return response_body, 200
    if request.method == 'DELETE':
        row = db.session.execute(db.select(Covers).where(Covers.id == cover_id)).scalar()
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Cover {cover_id} deleted successfully'
        return response_body, 200


@api.route('/follows/<int:follow_id>', methods=['POST'])
@jwt_required()
def handle_follow_post(follow_id):
    response_body = {}
    current_user = get_jwt_identity()
    if request.method == 'POST':
        data = request.json
        created_at = data.get('created_at', None)
        updated_at = data.get('updated_ad', None)
        artist_id = data.get('artist_id', None)
        fan_id = data.get('fan_id', None)
        follows = Covers(created_at=created_at, updated_at=updated_at, artist_id=artist_id, fan_id=fan_id)
        db.session.add(follow)
        db.session.commit()
        response_body["message"] = "El cover ha sido subido correctamente"
        return response_body, 200

@api.route('/follows/<int:follow_id>', methods=['GET', 'DELETE'])
@jwt_required() 
def handle_follow(follow_id):
    response_body = {}
    current_user = get_jwt_identity()
    if request.method == 'GET':
        row = db.session.execute(db.select(Follows).where(Follows.id == follow_id)).scalar()
        if not row:
            response_body['message'] = f'Follow with id {follow_id} not found'
            response_body['results'] = {}
            return response_body, 404
        response_body['results'] = row.serialize()
        response_body['message'] = f'Follow {follow_id} retrieved successfully'
        return response_body, 200
    if request.method == 'DELETE':
        row = db.session.execute(db.select(Follows).where(Follows.id == follow_id)).scalar()
        if not row:
            response_body['message'] = f'Follow with id {follow_id} not found'
            response_body['results'] = {}
            return response_body, 404
        db.session.delete(follow)
        db.session.commit()
        response_body['message'] = f'Follow {follow_id} deleted successfully'
        return response_body, 200
