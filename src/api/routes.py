"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Artists, Covers, Comments, Fans, Follows
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from datetime import datetime


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


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
        data = request.jason
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()



@api.route('/artists', methods=['GET'])
def handle_artists():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Artists)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = "recibí el GET request"
        return response_body, 200


@api.route('/artists/<int:artist_id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def handle_artist(artist_id):
    response_body = {}
    current_user = get_jwt_identity()
    if request.method == 'GET':
        row = db.session.execute(db.select(Artists).where(Artists.id == artist_id)).scalar()
        if not row:
            response_body['results'] = {}
            response_body['message'] = f' this artist {artist_id} not exist'
            return response_body, 404
        response_body['results'] = row.serialize()
        response_body['message'] = f'recibí el GET request {artist_id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row = db.session.execute(db.select(Artists).where(Artists.id == artist_id)).scalar()
        if not row:
            response_body['message'] = f'Artist with id {artist_id} not found'
            response_body['results'] = {}
            return response_body, 404
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
        if not row:
            response_body['message'] = f'Artist with id {artist_id} not found'
            response_body['results'] = {}
            return response_body, 404
        db.session.delete(artist)
        db.session.commit()
        response_body['message'] = f'Artist {artist_id} deleted successfully'
        return response_body, 200


        