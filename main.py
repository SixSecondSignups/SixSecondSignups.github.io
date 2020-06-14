from flask import Flask, send_from_directory
app = Flask(__name__, static_folder='', static_url_path='')

@app.route('/<path:path>')
def serve_page(path):
    print(path)
    return send_from_directory('', path)


app. run(host="0.0.0.0", port=5000)