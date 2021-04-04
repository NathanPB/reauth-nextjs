const mongo = new Mongo()
const db = mongo.getDB("reauth")
db.client.insertOne({ "_id" : "demo_client_id", "clientSecret" : "demo_client_secret", "displayName" : "Very Intuitive Service", "redirectUris" : [ "http://localhost:3000/api/auth/callback" ], "skipConsent" : true })
