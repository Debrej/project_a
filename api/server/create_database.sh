#!/usr/bin/env bash
echo "Select the project user password: "
read -s project_a_pwd

echo "Enter the root password for mysql"
mysql -u root -p <<EOF
CREATE DATABASE project_a;
CREATE USER 'project_a'@'localhost' IDENTIFIED WITH mysql_native_password BY '$project_a_pwd';
GRANT ALL PRIVILEGES ON project_a.* TO 'project_a'@'localhost';
EOF

echo '{
  "pwd_project_a": "$project_a_pwd"
}' > assets/json/pwd.json