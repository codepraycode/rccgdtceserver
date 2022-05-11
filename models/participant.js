const { DataTypes } = require("sequelize");
const { AppModel } = require('./utils');
const { APP_URL } = require('../config/config');


const Schema = {
    // Attributes
    _id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // setting default to automatically populate
        primaryKey: true
    },
    passport: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "first name is required"
            },
            notNull: {
                msg: "first name is required"
            }
        }
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "last name is required"
            },
            notNull: {
                msg: "last name is required"
            }
        }
    },
    other_name: {
        type: DataTypes.STRING,
        defaultValue: ' '
    },
    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.first_name} ${this.last_name} ${this.other_name}`.trim();
        },
        set(value) {
            throw new Error('Do not try to set the `fullName` value!');
        }
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [
                    ['male', 'female']
                ],
                msg: "Must be either 'male' or 'female' "
            },
            notNull: {
                msg: "Must be either 'male' or 'female' "
            }
        }

    },

    participant_category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [
                    ['lower_junior', 'upper_junior', 'lower_teen', 'super_teen']
                ],
                msg: "Must be either 'lower_junior', 'upper_junior','lower_teen', or 'super_teen'"
            },
            notNull: {
                msg: "Must be either 'lower_junior', 'upper_junior','lower_teen', or 'super_teen'"
            }
        }

    },

    date_of_birth: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Date of birth is required"
            },
            isDate: {
                msg: "Date of birth is expected to ba a date string (yyyy-mm-dd)"
            },
            notNull: {
                msg: "Date of birth is required"
            }
        }
    },
    // age,
    // province_id: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: {
    //             msg: "Province is required"
    //         },
    //         notNull: {
    //             msg: "Province is required"
    //         }
    //     }
    // },

    zone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Zone is required"
            },
            notNull: {
                msg: "Zone is required"
            }
        }
    },
    area: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Area is required"
            },
            notNull: {
                msg: "Area is required"
            }
        }
    },
    parish: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Prea is required"
            },
            notNull: {
                msg: "Prea is required"
            }
        }
    },

    quiz_category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [
                    ['quiz_competition', 'bible_recitation', 'essay_writting', 'debate', 'spelling_bee']
                ],
                msg: "Must be either 'quiz_competition', 'bible_recitation','essay_writting','debate', 'spelling_bee' "
            },
            notNull: {
                msg: "Must be either 'quiz_competition', 'bible_recitation','essay_writting','debate', 'spelling_bee' "
            }
        }

    },

    birth_certificate: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    letter_of_recommendation: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    regional_coordinator: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Regional Coordinator is required"
            },
            notNull: {
                msg: "Regional Coordinator is required"
            }
        }
    },
    provincial_coordinator: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Provincial Coordinator is required"
            },
            notNull: {
                msg: "Provincial Coordinator is required"
            }
        }
    },
}

class Participant extends AppModel {
    static filterJSON(instance) {
        let file_fields = ['passport', 'birth_certificate', 'letter_of_recommendation']

        if (Array.isArray(instance)) {
            let response = instance.map(each => {
                let { createdAt, updatedAt, ...rest } = each.dataValues;

                file_fields.forEach(each => {
                    let value = rest[each]

                    if (value) {
                        rest[each] = `${APP_URL}/${value}`;
                    }


                })

                return rest
            })


            return response;
        }


        let { createdAt, updatedAt, ...rest } = instance.toJSON(); //.toJson();



        Object.entries(rest).forEach(([field, value]) => {

            if (file_fields.includes(field)) {
                if (value) {
                    rest[field] = `${APP_URL}/${value}`;
                }
            };
        });


        return rest;
    }
}

module.exports = (sequelize) => {
    Participant.init({...Schema }, {
        sequelize, // We need to pass the connection instance
        timestamps: true, // adding timestamps
        modelName: 'Participant', // We need to choose the model name
        tableName: 'Participants',
    });


    return Participant;
};