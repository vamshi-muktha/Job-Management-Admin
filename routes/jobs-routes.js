const express = require("express");
const router = express.Router();
const Job = require('../models/jobs');
const { isLoggedIn } = require("../utils/middleware");
const User = require("../models/user")

router.post("/create", isLoggedIn, async (req, res) => {
  const company = req.body.company;
  const rawMin = parseInt(req.body.salaryMin);
const rawMax = parseInt(req.body.salaryMax);

const salaryMin = `₹${(rawMin / 100000).toFixed(1)}LPA`;
const salaryMax = `₹${(rawMax / 100000).toFixed(1)}LPA`;

  console.log(company);
    try {
        const job = new Job({
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          jobType: req.body.jobType,
          salaryMin: salaryMin,
          salaryMax: salaryMax,
          deadline: req.body.deadline,
          description: req.body.description,
          createdBy: req.user._id,
          tlogo: `https://logo.clearbit.com/${company}.com`

        });
    
        await job.save();
        res.redirect('/');
      } catch (err) {
        console.error(err);
        res.send('Error creating job');
      }
})

router.get('/jobs/searchbycompany', async (req, res) => {
  // const company = req.query.company;
  // const jobs = await Job.find({ company: new RegExp(company, 'i') }); // case-insensitive match
  // res.render('pages/home', { jobs, user: req.user }); // pass the filtered jobs
});

router.get('/:id/apply', isLoggedIn, async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.send('Job not found');
  res.render('pages/apply', { job, user: req.user });
});


router.post('/:id/apply', isLoggedIn, async (req, res) => {
  const jobId = req.params.id;
  const user = await User.findById(req.user._id);

  if (!user.appliedJobs.includes(jobId)) {
    user.appliedJobs.push(jobId);
    await user.save();
  }

  res.redirect('/'); // or redirect to thank you page
});

router.get('/my-jobs', isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('appliedJobs');
    res.render('pages/my-jobs', { jobs: user.appliedJobs, user });
  } catch (err) {
    console.error(err);
    res.send('Error fetching applied jobs');
  }
});





module.exports = router;