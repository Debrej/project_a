/*

  DATABASE POPULATE SCRIPT FOR project_a
  v0.1

  Please refer to documentation at this address to know how to use it :
  https://github.com/Debrej/project_a/tree/master/api/SQL

*/


/*Populating EVENT table*/
INSERT INTO event (name, description, start_date, end_date) VALUES ('24h de l\'INSA', 'le festival le plus charismatique de france', '2019/05/17', '2019/05/19'),
																   ('Open Air', 'Ca tourne mal', '2019/05/06','2019/05/09');
/*Populating LOCATION table*/
INSERT INTO location (name, gps_long, gps_lat, description) VALUES ('BAR AIP', 45.783367, 4.876851, 'c\'est le bar AIP'),
                                                                   ('QG catering', 45.784156, 4.874421, 'là où on stocke les 80kg de frometon'),
                                                                   ('QG orga', 45.783943,4.873784, 'une fois y\'as eu une chèvre');
/*Populating SPECIALTY table*/
INSERT INTO specialty (name, year) VALUES ('TC', 3),('TC', 4),('TC', 5),
                                          ('Genie Bullshit', 3),('Genie Bullshit', 4),('Genie Bullshit', 5),
                                          ('IUT', 1),('IUT', 2),('Arthur',23),('GM',22);
/*Populating USER table*/
INSERT INTO user (first_name, last_name, surname, birthday, phone_number, email, licence_date, licence_scan_url, profile_pic_url, t_shirt_size, id_specialty, alcoholic_beverage_consumption, food_and_beverage_consumption, balance, comment, experience, incapacity, validity_status)
VALUES ('Eric','Maurincomme','Momo','1935/05/15','0160465614','momo@insa-lyon.fr', NULL, NULL, 'image/default_pic.jpg', 'L', 10, 0, 15, 4000, 'Je retourne vers l\'industrie', 'Directeur de l\'INSA', NULL, TRUE),
       ('Thibaut','Bellanger', 'Bigou', '1998/08/06', '0645860897', 't.bellanger34@gmail.com', '2018/04/10', NULL, 'image/default_pic.jpg', 'XL', 1, 15,35, -45.00, 'Je suis le petit copain d\'aline, la trésorière', 'j\'ai fait le catering', NULL, TRUE),
       ('Ludovic', 'Giry', 'Lulu la tortue', '1996/05/13', '0658096140', 'lc.giry@gmail.com', '2014/06/26', NULL, 'image/default_pic.jpg', 'XXS', 3, 12, 22, 5, 'j\'aimerai dire que... c\'est pas parque j\'ai un crâne moche que je suis moche', 'président', NULL, TRUE),
       ('Alexis', 'Luzy', 'Malynx', '1999/06/06', '0761096448', 'alexisluzy@gmail.com', NULL, NULL, 'image/malynx.jpg', 'L', 7, 125, 3, 55, 'jaaaaaaaaaaaune', '1 année de Qlture', 'enorme sexe', TRUE);

/*region TEAM, USER_TEAM */
INSERT INTO team (name, id_supervisor) VALUES ('INSA', 1), ('Fromage', 2), ('Plus d\'ordi', 3), ('Jaune', 4);

INSERT INTO user_team (id_user, id_team) VALUES (1,1),(2,1),(3,1),(2,2),(3,3);
/*endregion*/

/*region EQUIPMENT_TYPE,EQUIPMENT*/
INSERT INTO equipment_type (name) VALUES ('Vehicule'), ('Petit materiel');

INSERT INTO equipment (id_equipment_type, name, description, quantity, id_pickup_location, id_drop_location) VALUES (1, '12m3', 'Un bien beau camion', 1, 1, 1),
                                                                                                                    (2, 'Colson', 'De bien beaux colliers', 500, 3, 3),
                                                                                                                    (2, 'Balais', 'De bien beaux balais', 7, 3, 3);
/*endregion*/

/*region SHIFT_CATEGORY, SHIFT*/
INSERT INTO shift_category (name) VALUES ('C\'est le RUSH !'),('Post manif');

INSERT INTO shift (id_shift_category, start_date, end_date, charisma) VALUES (1,'2019/05/19 12:00/00','2019/05/19 14:00:00',15),(2,'2019/05/19 20:00:00', '2019/05/20 00:00:00',30),(2,'2019/05/20 00:00:00','2019/05/20 04:00:00',15);
/*endregion*/

/*Populating ACTIVITY table*/
INSERT INTO activity (id_event, name, description, start_date, end_date, id_supervisor) VALUES (1, 'ramener le fromage à la maison', 'on a acheté bcp bcp (bcp) de fromage et on doit le stocker dans le frigos', '2019/05/11 12:00:00', '2019/05/11 18:00:00', 2),
                                                                                               (1, 'ranger le QG orga', 'la manif est fini c\'était bien rigolo mais maintenant au boulot on range tout', '2019/05/19 20:00:00', '2019/05/20 18:00:00', 3);
/*Populating TASK table*/
INSERT INTO task (id_activity, name, description, start_date, end_date, id_supervisor, id_location, id_team) VALUES (1, 'acheter le fromage', 'on prend la liste de course et on achete ce qu\'il y a marqué', '2019/05/11 12:00:00', '2019/05/11 14:00:00', 2, 2, 2),
                                                                                                                    (1, 'stocker le fromage', 'on prend le fromage dans le camion et on le met dans les frigos', '2019/05/11 14:00:00', '2019/05/11 18:00:00', 2, 2, 2),
                                                                                                                    (2, 'ranger l\'agora', 'on range l\'agora', '2019/05/19 20:00:00', '2019/05/20 16:00:00', 3, 3, 1),
                                                                                                                    (2, 'ranger la salle dodo', 'on a pas envie de se faire niquer alors on va la ranger bien proprement', '2019/05/20 06:00:00', '2019/05/20 08:00:00', 3, 3, 1);

/*region ACTIVITY_EQUIPMENT, ACTIVITY_LOCATION*/
INSERT INTO activity_equipment (id_activity,id_equipment,quantity) VALUES (1,1,1),(2,2,50),(2,3,1);

INSERT INTO activity_location (id_activity, id_location) VALUES (1, 2), (1, 3), (2, 3);
/*endregion*/

/*region TASK_EQUIPMENT, TASK_SHIFT*/

INSERT INTO task_equipment (id_task,id_equipment, quantity) VALUES (1, 1, 14),(2,1,1),(3,3,0);

INSERT INTO task_shift (id_task, id_shift) VALUES (1,1), (1,3), (2,2);
/*endregion*/

/*Populating AVAILABILITY table */
INSERT INTO availability (id_shift, id_user) VALUES (1,1),(2,1),(2,3),(3,1);

/*region ASSIGNMENT_EQUIPMENT, ASSIGNMENT_USER, REQUIREMENT*/
INSERT INTO assignment_equipment (id_task, id_shift, id_equipment) VALUES (1,1,1),(3,2,2),(4,3,3);

INSERT INTO assignment_user (id_task,id_shift, id_user) VALUES (1,1,3),(1,1,1),(2,2,2);

INSERT INTO requirement (id_task, id_user, id_team, quantity) VALUES (1,NULL,2,2),(3,2,NULL,4),(3,3,NULL,NULL);
/*endregion*/

/*Populating COMMENT table*/
INSERT INTO comment (id_user, id_activity, id_task, date, content) VALUES (3,NULL,1,'2019/04/12 13:57:04','T\'es sûr qu\'un seul camion ça va suffire ?'),
									  (2,NULL,1,'2019/04/13 12:08:56','Ouais tkt, j\'en mangerai en sortant du magasin'),
									  (1,2,NULL,'2019/05/17 09:17:56','Ouais, rangez-moi tout ça avant que je ne parte dans le privé');

/*¨Populating NOTIFICATION table*/
INSERT INTO notification (content, id_user, id_team) VALUES ('Vous avez un nouveau message.',3,NULL),
                                                            ('Vous avez un projet_A en attente.',2,NULL),
                                                            ('Vous avez des FT à faire les enfants !',NULL,1);



















