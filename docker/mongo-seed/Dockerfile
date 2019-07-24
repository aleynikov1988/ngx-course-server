FROM mongo

COPY init.json /init.json
CMD mongoimport --host 0.0.0.0:27017 --db courseapp --collection products --type json --file /init.json --jsonArray
