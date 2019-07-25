FROM mongo

COPY init.json /init.json
CMD mongoimport --host 127.0.0.1 --port=27017 --db courseapp --collection products --type json --file /init.json --jsonArray
