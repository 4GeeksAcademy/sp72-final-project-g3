import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from .models import db, Users, Artists, Follows, Comments, Covers, Songs, Fans


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'darkly'  # Dark theme, for light theme use 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(Users, db.session))  # You can duplicate that line to add mew models
    admin.add_view(ModelView(Artists, db.session))
    admin.add_view(ModelView(Follows, db.session))
    admin.add_view(ModelView(Comments, db.session))
    admin.add_view(ModelView(Covers, db.session))
    admin.add_view(ModelView(Songs, db.session))
    admin.add_view(ModelView(Fans, db.session))
    