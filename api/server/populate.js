module.exports = function(sequelize, models){

    //region EVENTS

    models.Event.create({
        name: '24h de l\'INSA',
        description: 'le festival le plus charismatique de France',
        start_date: new Date('2019/05/17 20:00'),
        end_date: new Date('2019/05/19 23:30')
    });

    models.Event.create({
        name: 'Open Air',
        description: 'ça tourne mal',
        start_date: new Date('2019/05/06 12:00'),
        end_date: new Date('2019/05/06 18:00')
    });

    //endregion

    //region LOCATIONS

    models.Location.create({
        name: 'Bar AIP',
        description: 'c\'est le bar à coté de l\'AIP',
        gps_long: 45.783367,
        gps_lat: 4.876851
    });

    models.Location.create({
        name: 'QG catering',
        description: 'là où on stocke les 80 kg de frometon',
        gps_long: 45.784156,
        gps_lat: 4.874421
    });

    models.Location.create({
        name: 'QG orga',
        description: 'une fois y\'as eu une chèvre',
        gps_long: 45.783943,
        gps_lat: 4.873784
    });

    //endregion

    //region SPECIALTIES

    models.Specialty.create({
        name: 'TC',
        year: 3
    });

    models.Specialty.create({
        name: 'TC',
        year: 4
    });

    models.Specialty.create({
        name: 'TC',
        year: 5
    });

    models.Specialty.create({
        name: 'Génie Bullshit',
        year: 3
    });

    models.Specialty.create({
        name: 'Génie Bullshit',
        year: 4
    });

    models.Specialty.create({
        name: 'Génie Bullshit',
        year: 5
    });

    models.Specialty.create({
        name: 'IUT',
        year: 1
    });

    models.Specialty.create({
        name: 'IUT',
        year: 2
    });

    models.Specialty.create({
        name: 'Arthur',
        year: 23
    });

    models.Specialty.create({
        name: 'GM',
        year: 22
    });
    //endregion

    //region USERS

    models.User.create({
        first_name: 'Eric',
        last_name: 'Maurincomme',
        surname: 'Momo',
        birthday: new Date('1935/05/15'),
        phone_number: '0160465614',
        email: 'momo@insa-lyon.fr',
        licence_date: null,
        licence_scan_url: null,
        profile_pic_url: 'image/default_pic_url',
        tshirt_size: 'L',
        alcoholic_beverage_consumption: 0,
        food_and_beverage_consumption: 1,
        balance: 4000,
        comment: 'Je retourne vers l\'industrie',
        experience: 'Dirlo d\'l\'INSA',
        incapacity: null,
        specialtyId: 10
    });

    models.User.create({
        first_name: 'Thibaut',
        last_name: 'Bellanger',
        surname: 'Bigou',
        birthday: new Date('1998/08/06'),
        phone_number: '0645860897',
        email: 't.bellanger34@gmail.com',
        licence_date: new Date('2019/04/10'),
        licence_scan_url: null,
        profile_pic_url: 'image/default_pic_url',
        tshirt_size: 'XL',
        alcoholic_beverage_consumption: 15,
        food_and_beverage_consumption: 35,
        balance: -45,
        comment: 'Je suis le petit copain de la trésorière',
        experience: 'Négociant en fromage',
        incapacity: null,
        specialtyId: 1
    });

    models.User.create({
        first_name: 'Ludovic',
        last_name: 'Giry',
        surname: 'Lulu la tortue',
        birthday: new Date('1996/05/13'),
        phone_number: '0658096140',
        email: 'lc.giry@gmail.com',
        licence_date: new Date('2014/06/26'),
        licence_scan_url: null,
        profile_pic_url: 'image/default_pic_url',
        tshirt_size: 'XS',
        alcoholic_beverage_consumption: 12,
        food_and_beverage_consumption: 22,
        balance: 5,
        comment: 'j\'aimerai dire que... c\'est pas parque j\'ai un crâne moche que je suis moche',
        experience: 'président',
        incapacity: null,
        specialtyId: 3
    });

    models.User.create({
        first_name: 'Alexis',
        last_name: 'Luzy',
        surname: 'Malynx',
        birthday: new Date('1999/06/06'),
        phone_number: '0761096448',
        email: 'alexisluzy@gmail.com',
        licence_date: null,
        licence_scan_url: null,
        profile_pic_url: 'image/malynx.jpg',
        tshirt_size: 'L',
        alcoholic_beverage_consumption: 125,
        food_and_beverage_consumption: 3,
        balance: 55,
        comment: 'jaaaaaaaaaaaune',
        experience: '1  année de Qlture',
        incapacity: 'enorme sexe',
        specialtyId: 7
    });

    //endregion

    //region TEAMS

    models.Team.create({
        name: 'INSA',
        supervisor: 1
    });

    models.Team.create({
        name: 'Fromage',
        supervisor: 2
    });

    models.Team.create({
        name: 'Plus d\'ordi',
        supervisor: 3
    });

    models.Team.create({
        name: 'jaune',
        supervisor: 4
    });

    //endregion

    //region EQUIPMENT TYPE

    models.Equipment_Type.create({
        name: 'Véhicule'
    });

    models.Equipment_Type.create({
        name: 'Petit matériel'
    });

    //endregion

    //region EQUIPMENT

    models.Equipment.create({
        name: '12m3',
        description: 'un bien beau camtar',
        quantity: 1,
        pickup_location: 1,
        drop_location: 3,
        equipmentTypeId: 1
    });

    models.Equipment.create({
        name: 'Colson',
        description: 'de biens beaux colliers',
        quantity: 500,
        pickup_location: 3,
        drop_location: 3,
        equipmentTypeId: 2
    });

    models.Equipment.create({
        name: 'Balai',
        description: 'de biens beaux balais',
        quantity: 7,
        pickup_location: 3,
        drop_location: 3,
        equipmentTypeId: 2
    });

    //endregion

    //region SHIFT CATEGORIES

    models.Shift_Category.create({
        name: 'C\'est le rush'
    });

    models.Shift_Category.create({
        name: 'Post Manif'
    });

    //endregion

    //region SHIFTS

    models.Shift.create({
        start_date: new Date('2019/05/19 12:00:00'),
        end_date: new Date('2019/05/19 14:00:00'),
        charisma: 15,
        shiftCategoryId: 1
    });

    models.Shift.create({
        start_date: new Date('2019/05/19 20:00:00'),
        end_date: new Date('2019/05/19 22:00:00'),
        charisma: 30,
        shiftCategoryId: 1
    });

    models.Shift.create({
        start_date: new Date('2019/05/20 00:00:00'),
        end_date: new Date('2019/05/20 02:00:00'),
        charisma: 15,
        shiftCategoryId: 2
    });

    //endregion

    //region ACTIVITIES

    models.Activity.create({
        name: 'Ramener le fromage à la maison',
        description: 'on a acheté bcp bcp (bcp) de fromage et on doit le stocker dans le frigos',
        start_date: new Date('2019/05/11 12:00:00'),
        end_date: new Date('2019/05/11 18:00:00'),
        eventId: 1,
        supervisor: 2
    });

    models.Activity.create({
        name: 'Ranger le QG orga',
        description: 'la manif est fini c\'était bien rigolo mais maintenant au boulot on range tout',
        start_date: new Date('2019/05/19 20:00:00'),
        end_date: new Date('2019/05/20 18:00:00'),
        eventId: 1,
        supervisor: 3
    });

    //endregion

    //region TASKS

    models.Task.create({
        name: 'Acheter le clackos',
        description: 'on prend la liste de course et on achete ce qu\'il y a marqué',
        start_date: new Date('2019/05/11 12:00:00'),
        end_date: new Date('2019/05/11 14:00:00'),
        supervisor: 2,
        teamId: 2,
        locationId: 2,
        activityId: 1
    });

    models.Task.create({
        name: 'Acheter le fromedu',
        description: 'on prend le fromage dans le camion et on le met dans les frigos',
        start_date: new Date('2019/05/11 14:00:00'),
        end_date: new Date('2019/05/11 18:00:00'),
        supervisor: 2,
        teamId: 2,
        locationId: 2,
        activityId: 1
    });

    models.Task.create({
        name: 'Ranger l\'Agora',
        description: 'on range l\'agora',
        start_date: new Date('2019/05/19 20:00:00'),
        end_date: new Date('2019/05/20 16:00:00'),
        supervisor: 3,
        teamId: 1,
        locationId: 3,
        activityId: 2
    });

    models.Task.create({
        name: 'Ranger la salle dodo',
        description: 'on a pas envie de se faire niquer alors on va la ranger bien proprement',
        start_date: new Date('2019/05/20 06:00:00'),
        end_date: new Date('2019/05/20 08:00:00'),
        supervisor: 3,
        teamId: 1,
        locationId: 3,
        activityId: 2
    });

    //endregion

    //region COMMENT

    models.CommentObject.create({
        content: 'T\'es sûr qu\'un seul camion ça va suffire ?',
        date: new Date('2019/04/12 13:57:04'),
        userId: 3,
        activityId: null,
        taskId: 1
    });

    models.CommentObject.create({
        content: 'Ouais tkt, j\'en mangerai en sortant du magasin',
        date: new Date('2019/04/13 12:08:56'),
        userId: 2,
        activityId: null,
        taskId: 1
    });

    models.CommentObject.create({
        content: 'Ouais, rangez-moi tout ça avant que je ne parte dans le privé',
        date: new Date('2019/05/17 09:17:56'),
        userId: 1,
        activityId: 2,
        taskId: null
    });

    //endregion

    //region NOTIFICATIONS

    models.Notification.create({
        content: 'Vous avez un nouveau message.',
        user: 3,
        team: null
    });

    models.Notification.create({
        content: 'Vous avez un projet A en attente.',
        user: 2,
        team: null
    });

    models.Notification.create({
        content: 'Vous avez des FT à faire les enfants.',
        user: null,
        team: 1
    });

    //endregion

};