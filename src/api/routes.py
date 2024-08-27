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


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/artists', methods=['GET'])
def handle_artists():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Artists)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = "recibí el GET request"
        return response_body, 200


@api.route('/artists/<int:artist_id>', methods=['GET', 'PUT', 'DELETE',])
def handle_artist(artist_id):
    response_body = {}
    if request.method == 'GET':
        row = db.session.execute(db.select(Artists).where(Artists.id == artist_id)).scalar()
        if not row:
            response_body['results'] = {}
            response_body['message'] = f'No existe el artista {artist_id}'
            return response_body, 404
        response_body['results'] = row.serialize()
        response_body['message'] = f'recibí el GET request {artist_id}'
        return response_body, 200
    if request.method == 'PUT':
        response_body['message'] = f'recibí el PUT request {artist_id}'
        return response_body, 200
    if request.method == 'DELETE':
        response_body['message'] = f'recibí el DELETE request {artist_id}'
        return response_body, 200


@api.route('/fans', methods=['GET'])
def handle_fans():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Fans)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = "recibí el GET request"
        return response_body, 200


@api.route('/fans/<int:fans_id>', methods=['GET', 'PUT', 'DELETE'])     
def handle_fan(fans_id):
    response_body = {}
    if request.method == 'GET':
        row = db.session.execute(db.select(Fans).where(Fans.id == fans_id)).scalars()
        if not row:
            response_body['results'] = {}
            response_body['message'] = f'No existe el fan {fans_id}'
            return response_body, 404
        response_body['results'] = row.serialize()
        response_body['message'] = f'recibi el get request {fans_id}'
        return response_body, 200
    if request.method == 'PUT':
        response_body['message'] = f'recibí el PUT request {fans_id}'
        return response_body, 200
    if request.method == 'DELETE':
        response_body['message'] = f'recibí el DELETE request {fans_id}'
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


@api.route('/songs', methods=['GET'])
def handle_songs():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Songs)).scalar() 