const db  = require('../utils/databaseUtils')

module.exports = class School {
  constructor(schoolName, city, latitude, longitude) {
    this.schoolName = schoolName
    this.city = city
    this.latitude = latitude
    this.longitude = longitude
  }

  save() {
    return db.execute('INSERT INTO schools (schoolName, city, latitude, longitude) VALUES (?, ?, ?, ?)',
    [this.schoolName, this.city, this.latitude, this.longitude])
  }

  static fetchAll() {
    return db.execute('SELECT * FROM schools')  
  }

}

