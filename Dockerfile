# DOCKER NODE IMAGE BASE
# Install Polymer CLI, https://www.polymer-project.org/3.0/docs/tools/polymer-cli
FROM nginx:1.12.0
ADD ./nginx.conf /etc/nginx/nginx.conf
ADD ./default.conf /etc/nginx/conf.d/default.conf

ADD /build/default/ /usr/share/nginx/html

EXPOSE 8080

WORKDIR /usr/share/nginx/html