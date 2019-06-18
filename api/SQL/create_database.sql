/*

  DATABASE CREATION SCRIPT FOR project_a
  v0.1

  Please refer to documentation at this address to know how to use it :
  https://github.com/Debrej/project_a/tree/master/api/SQL

*/

/*region DATABASE CREATION*/

CREATE DATABASE IF NOT EXISTS project_a;
USE project_a;
GRANT ALL PRIVILEGES ON project_a.* TO 'project_a'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';

/*endregion*/

/*region ENTITY TABLES*/

/*region USER, TEAM, NOTIFICATION, SPECIALTY*/

/*
  A specialty is something specific at INSA or student organisation. There is the school year and the name of the specialty
 */
CREATE TABLE specialty(
  id_specialty INT(6) AUTO_INCREMENT,

  name VARCHAR(255) NOT NULL,
  year INT(2) NOT NULL,

  CONSTRAINT PK_SPECIALTY PRIMARY KEY (id_specialty)
);

/*
  User represents every person that has an account, whether this person is an admin, organizer, volunteer and so on
 */
CREATE TABLE user (
  id_user INT(6) AUTO_INCREMENT,

  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  surname VARCHAR(255),
  birthday DATE,

  phone_number VARCHAR(10),
  email VARCHAR(255) NOT NULL,

  licence_date DATE,
  licence_scan_url VARCHAR(255),

  profile_pic_url VARCHAR(255) DEFAULT 'images/default_pic_url',
  t_shirt_size ENUM('XXXS','XXS','XS','S','M','L','XL','XXL','XXXL'),

  id_specialty INT(6),

  alcoholic_beverage_consumption INT(4),
  food_and_beverage_consumption INT(4),
  balance DECIMAL(6,2),

  comment MEDIUMTEXT,
  experience MEDIUMTEXT,
  incapacity MEDIUMTEXT,

  validity_status BOOLEAN,

  CONSTRAINT PK_USER PRIMARY KEY (id_user),
  CONSTRAINT FK_USER_SPECIALTY FOREIGN KEY (id_specialty) REFERENCES specialty(id_specialty)
);

/*
  A team is a mean of grouping people together. Every user can be in multiple teams. For example a user can be in the team Admin, Bars and Truck Driving
 */
CREATE TABLE team(
  id_team INT(6) AUTO_INCREMENT,

  name VARCHAR(255),

  id_supervisor INT(6),

  CONSTRAINT PK_TEAM PRIMARY KEY (id_team),
  CONSTRAINT FK_TEAM_SUPERVISOR FOREIGN KEY (id_supervisor) REFERENCES user(id_user)
);

/*
  A notification is a mean for the users to be reminded of things they could easily go over or forget. A notification can be sent to a single user or to a team.
 */
CREATE TABLE notification(
  id_notification INT(6) AUTO_INCREMENT,

  content MEDIUMTEXT NOT NULL,

  id_user INT(6),
  id_team INT(6),

  CONSTRAINT PK_NOTIFICATION PRIMARY KEY (id_notification),
  CONSTRAINT FK_NOTIFICATION_USER FOREIGN KEY (id_user) REFERENCES user(id_user),
  CONSTRAINT FK_NOTIFICATION_TEAM FOREIGN KEY (id_team) REFERENCES team(id_team)
);

/*endregion*/

/*region LOCATION, EVENT, ACTIVITY, TASK AND COMMENT*/

/*
  A location represent the GPS coordinates for a specific location. It allows to quickly look up where the task, activity or equipment is located
 */
CREATE TABLE location(
  id_location INT(6) AUTO_INCREMENT,

  name VARCHAR(255) NOT NULL,
  gps_long DECIMAL(9,6) NOT NULL,
  gps_lat DECIMAL(9,6) NOT NULL,
  description MEDIUMTEXT,

  CONSTRAINT PK_LOCATION PRIMARY KEY (id_location)
);

/*
  Event represents the dates of the actual event, not taking into account the time before or after to organize, put things in place and take back everything
 */
CREATE TABLE event(
  id_event INT(6) AUTO_INCREMENT,

  name VARCHAR(255) NOT NULL,
  description MEDIUMTEXT,

  start_date DATETIME NOT NULL,
  end_date DATETIME NOT NULL,

  CONSTRAINT PK_EVENT PRIMARY KEY (id_event)
);

/*
  Activity is either an animation, a general task to be done on a long period of time, which can be subdivided in multiple tasks
  It can be for example animating a inflatable castle, running a bar or securing a checkpoint
 */
CREATE TABLE activity(
  id_activity INT(6) AUTO_INCREMENT,
  id_event INT(6),

  name VARCHAR(255) NOT NULL,
  description MEDIUMTEXT,

  start_date DATETIME NOT NULL,
  end_date DATETIME NOT NULL,

  id_supervisor INT(6),

  CONSTRAINT PK_ACTIVITY PRIMARY KEY (id_activity),
  CONSTRAINT FK_ACTIVITY_EVENT FOREIGN KEY (id_event) REFERENCES event(id_event),
  CONSTRAINT FK_ACTIVITY_SUPERVISOR FOREIGN KEY (id_supervisor) REFERENCES user(id_user)
);

/*
  A task is a small thing to do that can either be part of en activity, for example installing something, or a task that doesn't refer to an activity
 */
CREATE TABLE task(
  id_task INT(6) AUTO_INCREMENT,
  id_activity INT(6),

  name VARCHAR(255) NOT NULL,
  description MEDIUMTEXT,

  start_date DATETIME NOT NULL,
  end_date DATETIME NOT NULL,

  id_supervisor INT(6),
  id_location INT(6),
  id_team INT(6),

  CONSTRAINT PK_TASK PRIMARY KEY (id_task),
  CONSTRAINT FK_TASK_ACTIVITY FOREIGN KEY (id_activity) REFERENCES activity(id_activity),
  CONSTRAINT FK_TASK_SUPERVISOR FOREIGN KEY (id_supervisor) REFERENCES user(id_user),
  CONSTRAINT FK_TASK_LOCATION FOREIGN KEY (id_location) REFERENCES location(id_location),
  CONSTRAINT FK_TASK_TEAM FOREIGN KEY (id_team) REFERENCES team(id_team)
);

/*
  A comment on an activity or a task allow users to discuss the content of this activity or task
 */
CREATE TABLE comment(
  id_comment INT(6) AUTO_INCREMENT,

  id_user INT(6) NOT NULL,
  id_activity INT(6),
  id_task INT(6),

  content TINYTEXT NOT NULL,
  date DATETIME,

  CONSTRAINT PK_COMMENT PRIMARY KEY (id_comment),
  CONSTRAINT FK_COMMENT_USER FOREIGN KEY (id_user) REFERENCES user(id_user),
  CONSTRAINT FK_COMMENT_ACTIVITY FOREIGN KEY (id_activity) REFERENCES activity(id_activity),
  CONSTRAINT FK_COMMENT_TASK FOREIGN KEY (id_task) REFERENCES task(id_task)
);

/*endregion*/

/*region EQUIPMENT TYPE, EQUIPMENT*/

/*
  An equipment type represents a category of equipment such as vehicle, small equipment...
 */
CREATE TABLE equipment_type(
  id_equipment_type INT(6) AUTO_INCREMENT,

  name VARCHAR(255) NOT NULL,

  CONSTRAINT PK_EQUIPMENT_TYPE PRIMARY KEY (id_equipment_type)
);

/*
  An equipment can be either a big equipment like a vehicle or smaller equipment like adhesive tape which has a quantity
  There also are two location, where to pick it up and to drop it when you are finished
 */
CREATE TABLE equipment(
  id_equipment INT(6) AUTO_INCREMENT,
  id_equipment_type INT(6),

  name VARCHAR(255) NOT NULL ,
  description TINYTEXT,
  quantity INT(4) NOT NULL,
  id_pickup_location INT(6) NOT NULL,
  id_drop_location INT(6) NOT NULL,

  CONSTRAINT PK_EQUIPMENT PRIMARY KEY (id_equipment),
  CONSTRAINT FK_EQUIPEMENT_EQUIPMENT_TYPE FOREIGN KEY (id_equipment_type) REFERENCES equipment_type(id_equipment_type),
  CONSTRAINT FK_EQUIPEMENT_PICKUP_LOCATION FOREIGN KEY (id_pickup_location) REFERENCES location(id_location),
  CONSTRAINT FK_EQUIPEMENT_DROP_LOCATION FOREIGN KEY (id_drop_location) REFERENCES location(id_location)
);

/*endregion*/

/*region SHIFT CATEGORY, SHIFT*/

/*
  A shift category is used to ease the organisation of the shifts. For year long organization of an event, it is useful to be able to separate the shifts
 */
CREATE TABLE shift_category(
  id_shift_category INT(6) AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,

  CONSTRAINT PK_SHIFT_CATEGORY PRIMARY KEY (id_shift_category)
);

/*
  A shift is the division of time used by everything that requires timing, tasks, activities and availabilities for users. It is associated with a level of charisma, which represents the important shifts
 */
CREATE TABLE shift(
  id_shift INT(6) AUTO_INCREMENT,
  id_shift_category INT(6) NOT NULL,

  start_date DATETIME NOT NULL,
  end_date DATETIME NOT NULL,

  charisma INT(3) NOT NULL,

  CONSTRAINT PK_SHIFT PRIMARY KEY (id_shift),
  CONSTRAINT FK_SHIFT_SHIFT_CATEGORY FOREIGN KEY (id_shift_category) REFERENCES shift_category(id_shift_category)
);

/*endregion*/

/*endregion*/

/*region LINKING TABLES*/

/*region ASSIGMENT*/

/*
  Assignment for user means that the user is assigned to a task, so it is on their planning
 */
CREATE TABLE assignment_user(
  id_task INT(6),
  id_shift INT(6),
  id_user INT(6),

  CONSTRAINT PK_ASSIGNMENT_USER PRIMARY KEY (id_task, id_user, id_shift),
  CONSTRAINT FK_ASSIGNMENT_USER_TASK FOREIGN KEY (id_task) REFERENCES task(id_task),
  CONSTRAINT FK_ASSIGNMENT_USER_SHIFT FOREIGN KEY (id_shift) REFERENCES shift(id_shift),
  CONSTRAINT FK_ASSIGNMENT_USER_USER FOREIGN KEY (id_user) REFERENCES user(id_user)
);

/*
  Assignment for equipment means that the equipment is assigned to a task, so it is on its planning
 */
CREATE TABLE assignment_equipment(
  id_task INT(6),
  id_shift INT(6),
  id_equipment INT(6),

  CONSTRAINT PK_ASSIGNMENT_EQUIPMENT PRIMARY KEY (id_task, id_equipment, id_shift),
  CONSTRAINT FK_ASSIGNMENT_EQUIPMENT_TASK FOREIGN KEY (id_task) REFERENCES task(id_task),
  CONSTRAINT FK_ASSIGNMENT_EQUIPMENT_SHIFT FOREIGN KEY (id_shift) REFERENCES shift(id_shift),
  CONSTRAINT FK_ASSIGNMENT_EQUIPMENT_EQUIPMENT FOREIGN KEY (id_equipment) REFERENCES equipment(id_equipment)
);

/*endregion*/

/*region REQUIREMENT*/

/*
  Requirement for a team or a user means that the task creator asks for a number of people either specific or not to be assigned to it
 */
CREATE TABLE requirement(
  id_requirement INT(6) AUTO_INCREMENT,
  id_task INT(6),

  id_user INT(6),
  id_team INT(6),

  quantity INT(3),

  CONSTRAINT PK_REQUIREMENT PRIMARY KEY (id_requirement),
  CONSTRAINT FK_REQUIREMENT_TASK FOREIGN KEY (id_task) REFERENCES task(id_task),
  CONSTRAINT FK_REQUIREMENT_USER FOREIGN KEY (id_user) REFERENCES user(id_user),
  CONSTRAINT FK_REQUIREMENT_TEAM FOREIGN KEY (id_team) REFERENCES team(id_team)
);

/*endregion*/

/*region OTHER TABLES*/

/*
  Availability is a mean to know when a user is available to be assigned
 */
CREATE TABLE availability(
  id_shift INT(6),
  id_user INT(6),

  CONSTRAINT PK_AVAILABILITY PRIMARY KEY (id_shift, id_user),
  CONSTRAINT FK_AVAILABILITY_SHIFT FOREIGN KEY (id_shift) REFERENCES shift(id_shift),
  CONSTRAINT FK_AVAILABILITY_USER FOREIGN KEY (id_user) REFERENCES user(id_user)
);

/*
  A user can be in multiple team
 */
CREATE TABLE user_team(
  id_user INT(6),
  id_team INT(6),

  CONSTRAINT PK_USER_TEAM PRIMARY KEY (id_user, id_team),
  CONSTRAINT FK_USER_TEAM_USER FOREIGN KEY (id_user) REFERENCES user(id_user),
  CONSTRAINT FK_USER_TEAM_TEAM FOREIGN KEY (id_team) REFERENCES team(id_team)
);

/*
  A task has multiple shift
 */
CREATE TABLE task_shift(
 id_task INT(6),
 id_shift INT(6),

 CONSTRAINT PK_TASK_SHIFT PRIMARY KEY (id_task,id_shift),
 CONSTRAINT FK_TASK_SHIFT_TASK FOREIGN KEY (id_task) REFERENCES task(id_task),
 CONSTRAINT FK_TASK_SHIFT_SHIFT FOREIGN KEY (id_shift) REFERENCES shift(id_shift)
);

/*
  A task has multiple equipment with quantity attached
 */
CREATE TABLE task_equipment(
  id_task INT(6),
  id_equipment INT(6),

  quantity INT(3),

  CONSTRAINT PK_TASK_EQUIPMENT PRIMARY KEY (id_task, id_equipment),
  CONSTRAINT FK_TASK_EQUIPMENT_TASK FOREIGN KEY (id_task) REFERENCES task(id_task),
  CONSTRAINT FK_TASK_EQUIPMENT_EQUIPMENT FOREIGN KEY (id_equipment) REFERENCES equipment(id_equipment)
);

/*
  An activity has multiple equipment with quantity attached
 */
CREATE TABLE activity_equipment(
  id_activity INT(6),
  id_equipment INT(6),

  quantity INT(3),

  CONSTRAINT PK_ACTIVITY_EQUIPMENT PRIMARY KEY (id_activity, id_equipment),
  CONSTRAINT FK_ACTIVITY_EQUIPMENT_ACTIVITY FOREIGN KEY (id_activity) REFERENCES task(id_task),
  CONSTRAINT FK_ACTIVITY_EQUIPMENT_EQUIPMENT FOREIGN KEY (id_equipment) REFERENCES equipment(id_equipment)
);

/*
  An activity can have multiple locations
 */
CREATE TABLE activity_location(
  id_activity INT(6),
  id_location INT(6),

  CONSTRAINT PK_ACTIVITY_LOCATION PRIMARY KEY (id_activity, id_location),
  CONSTRAINT FK_ACTIVITY_LOCATION_ACTIVITY FOREIGN KEY (id_activity) REFERENCES activity(id_activity),
  CONSTRAINT FK_ACTIVITY_LOCATION_LOCATION FOREIGN KEY (id_location) REFERENCES location(id_location)
);

/*endregion*/

/*endregion*/