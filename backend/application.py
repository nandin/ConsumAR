from flask import Flask, request, jsonify, json
from datetime import datetime
import firebase_admin
from firebase_admin import credentials
from firebase_admin import auth
from bson.objectid import ObjectId

application = Flask(__name__)
client = MongoClient("ds239638.mlab.com",39638)

db = client["five-star"]
db.authenticate("fivestar-admin","five")

cred = credentials.Certificate("cert.json")
firebase_admin.initialize_app(cred)

def check_login(user_login):
    print(user_login)
    auth_token = str(user_login["auth_token"])
    try:
        decoded_token = auth.verify_id_token(auth_token)
    except ValueError:
        return "Fail"
    uid = decoded_token['uid']
    # username = auth
    user_match = db.usrs.find_one({
        "username" : str(auth.get_user(uid).display_name)
    })

    if(user_match == None):
        return False
    return True
@application.route('/api/v1/register', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':
        user_register = request.form.to_dict()
        print(user_register)
        auth_token = str(user_register["auth_token"])
        try:
            decoded_token = auth.verify_id_token(auth_token)
        except ValueError:
            return "Fail"
        uid = decoded_token['uid']
        # hash_f = hashlib.md5((str(user_register["firebase_id"]) + str(user_register["username"])  + "pollr").encode("utf-8"))

        db.usrs.insert_one({
            "username": str(auth.get_user(uid).display_name),
            "session_id": auth_token,
            "items":[]
            "ratings":[]
        })


    return "Success!"
@application.route('/api/v1/login', methods=['POST'])
def login():
    if request.method == 'POST':
        user_login = request.form.to_dict()
        print(user_login)
        auth_token = str(user_login["auth_token"])
        try:
            decoded_token = auth.verify_id_token(auth_token)
        except ValueError:
            return "Fail"
        uid = decoded_token['uid']
        # username = auth
        user_match = db.usrs.find_one({
            "username" : str(auth.get_user(uid).display_name)
        })

        if(user_match == None):
            return "Fail"
        # print(user_match["password"],user_login["password"])
        # if(user_match["auth_token"] == user_login["password"]):
        #     registration_id = user_match["firebase_id"]
        #     return user_match["hash_f"]
        return "Success"
@application.route('/api/v1/rating_set', methods=['POST'])
def rating_set():
    if request.method == 'POST':
        user_login = request.form.to_dict()
        if not check_login(user_login):
            return "Fail"
        username = str(auth.get_user(uid).display_name)
        i_name = db.items.find_one({"name":user_login["item"]})["name"]
        db.users.update({"username":username},{"$push":{"ratings":
            {
                "item": i_name,
                "rating":user_login["score"],
                "review":user_login["review"]
            }
        }})
        db.items.update({"_id":idd},{"$push":{"ratings":
            {
                "user": username,
                "rating":user_login["score"],
                "review":user_login["review"]
            }
        }})
        db.items.update({"name":i_name},{"$inc":{"total_reviews":1}})
        db.items.update({"name":i_name},{"$inc":{"curr_score":user_login["score"]}})
        total_reviews = db.items.find_one({"_id":idd})["total_reviews"]
        curr_score = db.items.find_one({"_id":idd})["curr_score"]
        new_score = curr_score/total_reviews
        db.items.update({"_id":idd},{"$set":{"average_rating":new_score})
        return "Success"
    return "Fail"
@application.route('/api/v1/item_rating_get', methods=['POST'])
def item_rating_get():
    #run ml stuff
    item = "DietCoke"
    if request.method == 'POST':
        user_login = request.form.to_dict()
        if not check_login(user_login):
            return "Fail"
        avg_rating = db.items.find_one({"name":item})["avg_rating"]
        resp = {}
        resp["avg_rating"] = avg_rating
        return jsonify(resp)
    return "Fail"

@application.route('/api/v1/item_rating_more_get', methods=['POST'])
def item_rating_more_get():
    if request.method == 'POST':
        user_login = request.form.to_dict()
        if not check_login(user_login)
            return "Fail"
        rslts = db.items.find_one({"name":user_login["name"]})["ratings"]
        return jsonify(rslts)

@application.route('/api/v1/purchase_history_get', methods=['POST'])
def purchase_history_get():
    if request.method == 'POST':
        user_login = request.form.to_dict()
        if not check_login(user_login)
            return "Fail"
        username = str(auth.get_user(uid).display_name)
        rslts = db.users.find_one({"username": username})["ratings"]
        return jsonify(rslts)
    return "Fail"

if __name__ == '__main__':
    application.run(host='0.0.0.0',debug=True)
