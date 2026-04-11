const express = require('express')
const router = express.Router()
const School = require('../models/data')
const getDistance = require('../models/distance')

router.get('/', (req, res) => {
  School.fetchAll().then(([rows]) => {
  res.render('home', { title: 'Home', schools: rows })
  }).catch((err) => {
    console.error('Error fetching schools:', err)
})
})

router.get('/addSchool', (req, res) => {
  res.render('add-details',{title: 'Add Details'})
})

router.post('/addSchool', (req, res) => {
  const { schoolName, city, latitude, longitude } = req.body
  console.log('Received data:', { schoolName, city, latitude, longitude })
  const school = new School(schoolName, city, latitude, longitude)
  school.save().then(()=>{
    res.redirect('/')
  })
 
})


router.get('/findSchool', (req, res) => {
   res.render('find-school-list', { title: 'List of Schools' })
})


router.post('/listSchool', (req, res) => {
  const { address, city, latitude, longitude} = req.body;
School.fetchAll().then(([rows]) => {
  // Step 1: Filter schools by city
 const filteredSchools = [];

rows.forEach((row) => {
  if (row.city.toLowerCase().includes(city.toLowerCase())) {
    filteredSchools.push(row);
  }
});
  // Step 2: Distance calculate
  const schools = filteredSchools.map((row) => {
    const dist = getDistance(
      latitude,
      longitude,
      row.latitude,
      row.longitude
    );
    return {
      ...row,
      distance: dist
    };
  });
 
  res.render('school-list', {
    title: 'List of Schools',
    schools: schools,
    address: address
  });

});
});

module.exports = router;
