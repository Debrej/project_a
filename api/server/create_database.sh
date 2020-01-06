#!/usr/bin/env bash
echo "Enter the root password for mysql"
mysql -u root -p <<EOF
CREATE DATABASE project_a;
CREATE USER 'project_a'@'localhost' IDENTIFIED WITH mysql_native_password BY 'project_a';
GRANT ALL PRIVILEGES ON project_a.* TO 'project_a'@'localhost';
EOF