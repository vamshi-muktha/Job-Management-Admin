const express = require("express");
const router = express.Router();
const Job = require("../models/jobs");

router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    const jobsWithPostedAgo = jobs.map(job => {
      const timeDiffMs = Date.now() - new Date(job.createdAt).getTime();
      const minutes = Math.floor(timeDiffMs / (1000 * 60));
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      let postedAgo = '';
      if (days > 0) postedAgo = `${days} day${days > 1 ? 's' : ''} ago`;
      else if (hours > 0) postedAgo = `${hours} hour${hours > 1 ? 's' : ''} ago`;
      else if (minutes > 0) postedAgo = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      else postedAgo = 'Just now';

      return {
        ...job.toObject(),
        postedAgo,
      };
    });

    res.render("pages/home", { user: req.user, jobs: jobsWithPostedAgo });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.render("pages/home", { user: req.user, jobs: [] });
  }
});


router.get("/searchbytitle", async (req, res) => {
  try {
    const titleQuery = req.query.title || "";
    const jobs = await Job.find({
      title: { $regex: new RegExp(titleQuery, "i") }
    }).sort({ createdAt: -1 });

    res.render("pages/home", { user: req.user, jobs });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.render("pages/home", { user: req.user, jobs: [] });
  }
});



router.get("/searchbycompany", async (req, res) => {
  try {
    const titleQuery = req.query.company || "";
    const jobs = await Job.find({
      company: { $regex: new RegExp(titleQuery, "i") }
    }).sort({ createdAt: -1 });
    console.log(jobs)
    res.render("pages/home", { user: req.user, jobs });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.render("pages/home", { user: req.user, jobs: [] });
  }
});

router.get("/searchbylocation", async (req, res) => {
  try {
    console.log(req.query.location)
    const titleQuery = req.query.location || "";
    const jobs = await Job.find({
      location: { $regex: new RegExp(titleQuery, "i") }
    }).sort({ createdAt: -1 });
    console.log(jobs)
    res.render("pages/home", { user: req.user, jobs });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.render("pages/home", { user: req.user, jobs: [] });
  }
});


router.get("/searchbyjobtype", async (req, res) => {
  try {
    const jobTypeQuery = req.query.jobtype || "";
    console.log("Job type search:", jobTypeQuery);

    const jobs = await Job.find({
      jobType: { $regex: new RegExp(jobTypeQuery, "i") }
    }).sort({ createdAt: -1 });

    res.render("pages/home", { user: req.user, jobs });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.render("pages/home", { user: req.user, jobs: [] });
  }
});


router.get("/searchbysalary", async (req, res) => {
  try {
    const min = parseInt(req.query.min) || 0;
    const max = parseInt(req.query.max) || 100;

    // Get all jobs
    const allJobs = await Job.find({});

    // Filter manually by converting "12lpa" to a number
    const filteredJobs = allJobs.filter(job => {
      const match = job.salaryMax.match(/(\d+)/);
      if (!match) return false;
      const salary = parseInt(match[1]); // Extract numeric part
      return salary >= min && salary <= max;
    });
    console.log(filteredJobs);
    res.render("pages/home", {
      user: req.user,
      jobs: filteredJobs,
      min,
      max
    });
    
  } catch (err) {
    console.error("Error filtering by salary:", err);
    res.render("pages/home", { user: req.user, jobs: [] });
  }
});



router.get("/aboutus", (req, res) => {
  res.render("pages/aboutus")
})

router.get("/testimonials", (req, res) => {
  res.render("pages/testimonials")
})

module.exports = router;
