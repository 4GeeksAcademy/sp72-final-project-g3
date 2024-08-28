from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), default=True, unique=False, nullable=False)
    rol = db.Column(db.Enum('fans', 'artist', 'admin', name='rol'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def __repr__(self):
        return f'<User {self.id} - {self.rol} - {self.email}>'

    def serialize(self):
        return {'id': self.id,
                'email': self.email,
                'is_active': self.is_active,
                'rol':self.rol}


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    body = db.Column(db.Text(), nullable=False)
    media_type = db.Column(db.Enum('img', 'png', 'mp4', 'link', name='media_type'), nullable=False)
    responses = db.Column(db.Text(), nullable=False)
    status = db.Column(db.Boolean(), unique=False, nullable=False)
    date = db.Column(db.Date, unique=False, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('comment_to', lazy='select'))
    cover_id = db.Column(db.Integer, db.ForeignKey('covers.id'))
    cover_to = db.relationship('Covers', foreign_keys=[cover_id], backref=db.backref('comment_to', lazy='select'))

    def __repr__(self):
        return f'<Comment {self.id}'

    def serialize(self):
        return {'id': self.id,
                'title': self.title,
                'body': self.body,
                'media_type': self.media_type,
                'responses': self.responses,
                'status': self.status,
                'date': self.date,
                'created_at': self.created_at,
                'comment_to': [row.serialize() for row in self.comment_to]}


class Fans(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    profile_picture = db.Column(db.String, unique=False, nullable=False)
    about = db.Column(db.String(300), unique=False, nullable=False)
    date_of_birth = db.Column(db.Date(), unique=True, nullable=False)
    name = db.Column(db.String, unique=False, nullable=False)
    nationality = db.Column(db.String, unique=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('fans_to', lazy='select'))
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'))
    comment_to = db.relationship('Comments', foreign_keys=[comment_id], backref=db.backref('comment_to', lazy='select'))

    def __repr__(self):
        return f'<Fan {self.id} - {self.name}'

    def serialize(self):
        return {'id': self.id,
                'profile_picture': self.profile_picture,
                'about': self.about,
                'date_of_birth': self.date_of_birth,
                'name': self.name,
                'nationality': self.nationality,
                'created_at': self.created_at,
                'updated_at': self.updated_at}


class Votes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vote = db.Column(db.Integer, nullable=False)
    vote_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('votes_to', lazy='select'))
    cover_id = db.Column(db.Integer, db.ForeignKey('covers.id'))
    cover_to = db.relationship('Covers', foreign_keys=[cover_id], backref=db.backref('votes_to', lazy='select'))


    def __repr__(self):
        return f'<Vote {self.id} - User {self.user_id}>'

    def serialize(self):
        return {'id': self.id,
            'vote': self.vote,
            'vote_date': self.vote_date,
            'cover_to': [row.serialize() for row in self.cover_to]}


class Songs(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=True)
    genre = db.Column(db.String, nullable=True)
    releaseDate = db.Column(db.Date, nullable=False)
    lyrics = db.Column(db.String, nullable=True)
    isrc = db.Column(db.String, unique=False, nullable=True)   

    def __repr__(self):
        return f'<Song {self.id} - {self.title}>'

    def serialize(self):
        return {'id': self.id,
            'title': self.title,
            'genre': self.genre,
            'releaseDate': self.releaseDate,
            'lyrics': self.lyrics,
            'isrc': self.isrc}


class Artists(db.Model):
    __tablename__ = 'artists'
    id = db.Column(db.Integer, primary_key=True)
    genre = db.Column(db.String, unique=False, nullable=True)
    foundation = db.Column(db.Date, nullable=False)
    country = db.Column(db.String, unique=False, nullable=True)
    description = db.Column(db.String(600), nullable=False)
    artwork = db.Column(db.String, unique=False, nullable=False)
    website = db.Column(db.String, unique=False, nullable=False)
    youtube = db.Column(db.String, unique=False, nullable=False)
    instagram = db.Column(db.String, unique=False, nullable=False)
    tiktok = db.Column(db.String, unique=False, nullable=False)
    facebook = db.Column(db.String, unique=False, nullable=False)
    twitter = db.Column(db.String, unique=False, nullable=False)
    is_band = db.Column(db.Boolean(), unique=False, nullable=False)
    members = db.Column(db.String, unique=False, nullable=False)
    status = db.Column(db.Boolean(), unique=False, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    record_label = db.Column(db.String, unique=False, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('artist_to', lazy='select'))

    def __repr__(self):
        return f'<User Artists{self.id}>'

    def serialize(self):
        return {'id':self.id,
                'genre':self.genre,
                'foundation':self.foundation,
                'country':self.country,
                'description':self.description,
                'artwork':self.artwork,
                'website':self.website,
                'youtube':self.youtube,
                'instagram':self.instagram,
                'tiktok':self.tiktok,
                'facebook':self.facebook,
                'twitter':self.twitter,
                'is_band':self.is_band,
                'members':self.members,
                'status':self.status,
                'created_at':self.created_at,
                'record_label':self.record_label}


class Covers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    release_date = db.Column(db.Date, nullable=False)
    genre = db.Column(db.String, unique=False, nullable=True)
    description = db.Column(db.String, unique=False, nullable=True)
    published_url = db.Column(db.String, nullable=True)
    valuation = db.Column(db.Integer, nullable=True)
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'))
    artist_to = db.relationship('Artists', foreign_keys=[artist_id], backref=db.backref('cover_to', lazy='select'))
    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'))
    song_to = db.relationship('Songs', foreign_keys=[song_id], backref=db.backref('cover_to', lazy='select'))


    def __repr__(self):
        return f'<Covers {self.id} - {self.artist_id} - {self.song_id}>'

    def serialize(self):
        return {'id': self.id,
            'release_date': self.release_date,
            'genre': self.genre,
            'description': self.description,
            'published_url': self.published_url,
            'valuation': self.valuation,
            'comment_to': [row.serialize() for row in self.comment_to]}


class Follows(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'))
    artist_to = db.relationship('Artists', foreign_keys=[artist_id], backref=db.backref('follow_to', lazy='select'))
    fan_id = db.Column(db.Integer, db.ForeignKey('fans.id'))
    fan_to = db.relationship('Fans', foreign_keys=[fan_id], backref=db.backref('follow_to', lazy='select'))

    def __repr__(self):
        return f'<Followers {self.id} - {self.artist_id} - {self.fan_id}>'

    def serialize(self):
        return {"id": self.id,
                "artist_id": self.artist_id,
                "fan_id": self.fan_id,
                "created_at": self.created_at,
                "updated_at": self.updated_at}
