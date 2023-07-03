FROM node
# COPY ./package.json /var/www/package.json
COPY . /var/www
WORKDIR /var/www
RUN npm install
EXPOSE 3000
ENTRYPOINT [ "npm","start"]