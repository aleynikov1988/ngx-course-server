FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongodb --db courseapp --collection products --drop --type json --file /init.json --jsonArray
