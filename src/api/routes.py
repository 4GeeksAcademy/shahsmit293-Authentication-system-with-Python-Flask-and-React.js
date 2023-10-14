"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup',methods=['POST'])
def create_user():
    body=request.json
    email=body["email"]
    password=body["password"]
    available_email=User.query.filter_by(email=email).one_or_none()
    if available_email is not None:
        raise APIException("data already available",400)
    new_user=User(email,password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize())

@api.route('/token',methods=['POST'])
def check_identity():
    body=request.json
    email=body["email"]
    password=body["password"]
    if email is None:
        raise APIException("no email in body",400)
    if password is None:
        raise APIException("no password in body",400)
    available_user=User.query.filter_by(email=email).one_or_none()
    if available_user is None:
        raise APIException("this user is not available",404)
    if available_user.password != password:
        raise APIException("please enter correct password",400)
    aceess_token=create_access_token(identity=available_user.id)
    return jsonify(aceess_token=aceess_token)
