#use_nodejs_image
FROM node:18-alpine AS build

#make_working_dir
WORKDIR /app

#copy_package_json_files
COPY package.json package-lock.json ./

#install_dependencies
RUN npm install

#copy_all_files
COPY . .

#build_react_files
RUN npm run build

#use_nginx_image
FROM nginx:alpine

#copy_build_files_to_nginx_folder
COPY --from=build /app/build /usr/share/nginx/html

#expose_port_80
EXPOSE 80

#start_nginx
CMD ["nginx", "-g", "daemon off;"]
