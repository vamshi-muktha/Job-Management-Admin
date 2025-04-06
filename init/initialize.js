const mongoose = require('mongoose');
const Job = require('../models/jobs');
const connectDB = require('./database');

const seedJobs = [
  {
    title: 'Frontend Developer',
    company: 'TechNova',
    tlogo: 'https://logo.clearbit.com/technova.com',
    description: 'Develop UI components using Reactjs Build REST APIs using Nodejs.Build REST APIs using Nodejs Build REST APIs using Nodejs.',
    experience: '1-3 years',
    jobType: 'Full-time',
    status: 'open',
    location: 'Bangalore',
    salaryMax: '₹8 LPA'
  },
  {
    title: 'Backend Engineer',
    company: 'CodeWorks',
    tlogo: 'https://logo.clearbit.com/codeworks.com',
    description: 'Build REST APIs using Nodejs Build REST APIs using Nodejs.Develop UI components using Reactjs Build REST APIs using Nodejs.',
    experience: '2-4 years',
    jobType: 'Full-time',
    status: 'in progress',
    location: 'Hyderabad',
    salaryMax: '₹10 LPA'
  },
  {
    title: 'Full Stack Developer',
    company: 'InnovateX',
    tlogo: 'https://logo.clearbit.com/innovatex.com',
    description: 'Work on MERN stack Work on MERN stack Build REST APIs using Nodejs.Design user interfaces and experiences Build REST APIs using Nodejs',
    experience: '3+ years',
    jobType: 'Remote',
    status: 'completed',
    location: 'Remote',
    salaryMax: '₹12 LPA'
  },
  {
    title: 'UI/UX Designer',
    company: 'PixelCraft',
    tlogo: 'https://logo.clearbit.com/pixelcraft.com',
    description: 'Design user interfaces and experiences Build REST APIs using Nodejs.Work on MERN stack Work on MERN stack  Build REST APIs using Nodejs.',
    experience: '1-2 years',
    jobType: 'Internship',
    status: 'open',
    location: 'Chennai',
    salaryMax: '₹7 LPA'
  },
  {
    title: 'DevOps Engineer',
    company: 'CloudEdge',
    tlogo: 'https://logo.clearbit.com/cloudedge.io',
    description: 'Manage CI/CD pipelines and infra Build REST APIs using Nodejs.Automated and manual testing Build REST APIs using Nodejs.',
    experience: '2-5 years',
    jobType: 'Full-time',
    status: 'open',
    location: 'Pune',
    salaryMax: '₹11 LPA'
  },
  {
    title: 'QA Engineer',
    company: 'Testify',
    tlogo: 'https://logo.clearbit.com/testify.com',
    description: 'Automated and manual testing Build REST APIs using Nodejs.Manage CI/CD pipelines and infra Build REST APIs using Nodejs',
    experience: '1-3 years',
    jobType: 'Full-time',
    status: 'in progress',
    location: 'Noida',
    salaryMax: '₹6.5 LPA'
  },
  {
    title: 'Product Manager',
    company: 'Visionary',
    tlogo: 'https://logo.clearbit.com/visionary.com',
    description: 'Coordinate between dev and design Build REST APIs using Nodejs.Build React Native mobile apps Build REST APIs using Nodejs',
    experience: '4+ years',
    jobType: 'Full-time',
    status: 'open',
    location: 'Bangalore',
    salaryMax: '₹15 LPA'
  },
  {
    title: 'Mobile Developer',
    company: 'Appify',
    tlogo: 'https://logo.clearbit.com/appify.com',
    description: 'Build React Native mobile apps Build REST APIs using Nodejs.Coordinate between dev and design Build REST APIs using Nodejs',
    experience: '1-2 years',
    jobType: 'Full-time',
    status: 'completed',
    location: 'Remote',
    salaryMax: '₹9 LPA'
  },
  {
    title: 'Data Scientist',
    company: 'DataWiz',
    tlogo: 'https://logo.clearbit.com/datawiz.com',
    description: 'Work with ML models & data pipelines Build REST APIs using Nodejs.nalyze and improve IT systems Build REST APIs using Nodejs',
    experience: '2-4 years',
    jobType: 'Full-time',
    status: 'open',
    location: 'Hyderabad',
    salaryMax: '₹13 LPA'
  },
  {
    title: 'System Analyst',
    company: 'SysTech',
    tlogo: 'https://logo.clearbit.com/systech.com',
    description: 'Analyze and improve IT systems Build REST APIs using Nodejs.Work with ML models & data pipelines Build REST APIs using Nodejs',
    experience: '3+ years',
    jobType: 'Part-time',
    status: 'open',
    location: 'Delhi',
    salaryMax: '₹8.5 LPA'
  },
  
    {
      title: 'Backend Engineer',
      company: 'CodeSphere',
      tlogo: 'https://logo.clearbit.com/codesphere.com',
      description: 'Build scalable backend systems using Nodejs and MongoDB.Ensure uptime and monitor critical production systems',
      experience: '2-4 years',
      jobType: 'Full-time',
      status: 'open',
      location: 'Hyderabad',
      salaryMax: '₹10 LPA'
    },
    {
      title: 'Full Stack Developer',
      company: 'DevNest',
      tlogo: 'https://logo.clearbit.com/devnest.com',
      description: 'Work on both frontend and backend features using MERN stack.Ensure uptime and monitor critical production systems',
      experience: '1-3 years',
      jobType: 'Full-time',
      status: 'open',
      location: 'Chennai',
      salaryMax: '₹9.5 LPA'
    },
    {
      title: 'Software Engineer',
      company: 'InnovateX',
      tlogo: 'https://logo.clearbit.com/innovatex.com',
      description: 'Design and implement core modules of cloud applications.Ensure uptime and monitor critical production systems',
      experience: '0-2 years',
      jobType: 'Full-time',
      status: 'open',
      location: 'Mumbai',
      salaryMax: '₹6 LPA'
    },
    {
      title: 'Mobile App Developer',
      company: 'AppForge',
      tlogo: 'https://logo.clearbit.com/appforge.com',
      description: 'Develop cross-platform apps using React Native.Ensure uptime and monitor critical production systems',
      experience: '1-2 years',
      jobType: 'Full-time',
      status: 'open',
      location: 'Delhi',
      salaryMax: '₹8.5 LPA'
    },
    {
      title: 'QA Engineer',
      company: 'TestGrid',
      tlogo: 'https://logo.clearbit.com/testgrid.com',
      description: 'Automate tests using Selenium and ensure software quality.Ensure uptime and monitor critical production systems',
      experience: '2-4 years',
      jobType: 'Full-time',
      status: 'open',
      location: 'Pune',
      salaryMax: '₹7 LPA'
    },
    {
      title: 'Data Analyst',
      company: 'DataDrip',
      tlogo: 'https://logo.clearbit.com/datadrip.com',
      description: 'Analyze business data and create dashboards using Power BI.Ensure uptime and monitor critical production systems',
      experience: '1-3 years',
      jobType: 'Full-time',
      status: 'open',
      location: 'Gurgaon',
      salaryMax: '₹9 LPA'
    },
    {
      title: 'DevOps Engineer',
      company: 'CloudGen',
      tlogo: 'https://logo.clearbit.com/cloudgen.com',
      description: 'Maintain CI/CD pipelines and manage cloud infrastructure.Ensure uptime and monitor critical production systems',
      experience: '3-5 years',
      jobType: 'Full-time',
      status: 'open',
      location: 'Noida',
      salaryMax: '₹12 LPA'
    },
    {
      title: 'UI/UX Designer',
      company: 'PixelWave',
      tlogo: 'https://logo.clearbit.com/pixelwave.com',
      description: 'Design user-friendly interfaces and enhance user experience.Ensure uptime and monitor critical production systems',
      experience: '0-2 years',
      jobType: 'Full-time',
      status: 'open',
      location: 'Ahmedabad',
      salaryMax: '₹6.5 LPA'
    },
    {
      title: 'AI Engineer',
      company: 'NeuralNetics',
      tlogo: 'https://logo.clearbit.com/neuralnetics.com',
      description: 'Build machine learning models using Python and TensorFlow.Ensure uptime and monitor critical production systems',
      experience: '2-4 years',
      jobType: 'Full-time',
      status: 'open',
      location: 'Bangalore',
      salaryMax: '₹13 LPA'
    },
    {
      title: 'Cybersecurity Analyst',
      company: 'SecureSky',
      tlogo: 'https://logo.clearbit.com/securesky.com',
      description: 'Monitor and secure company systems against threats.Ensure uptime and monitor critical production systems',
      experience: '2-3 years',
      jobType: 'Full-time',
      status: 'open',
      location: 'Kolkata',
      salaryMax: '₹11 LPA'
    },
    {
      title: 'Technical Writer',
      company: 'DocuCraft',
      tlogo: 'https://logo.clearbit.com/docucraft.com',
      description: 'Write technical documentation and user manuals.Ensure uptime and monitor critical production systems',
      experience: '1-2 years',
      jobType: 'Full-time',
      status: 'open',
      location: 'Mumbai',
      salaryMax: '₹5.5 LPA'
    },
    {
      title: 'Product Manager',
      company: 'Prodify',
      tlogo: 'https://logo.clearbit.com/prodify.com',
      description: 'Lead product development and roadmap planning.Ensure uptime and monitor critical production systems',
      experience: '3-6 years',
      jobType: 'Full-time',
      status: 'open',
      location: 'Bangalore',
      salaryMax: '₹14 LPA'
    },
    {
      title: 'System Administrator',
      company: 'InfraLogic',
      tlogo: 'https://logo.clearbit.com/infralogic.com',
      description: 'Manage and maintain internal IT infrastructure.Ensure uptime and monitor critical production systems',
      experience: '2-4 years',
      jobType: 'Full-time',
      status: 'open',
      location: 'Hyderabad',
      salaryMax: '₹8 LPA'
    },
    {
      title: 'Game Developer',
      company: 'FunBytes',
      tlogo: 'https://logo.clearbit.com/funbytes.com',
      description: 'Create and maintain 2D/3D games using Unity.Ensure uptime and monitor critical production systems',
      experience: '1-3 years',
      jobType: 'Full-time',
      status: 'open',
      location: 'Chennai',
      salaryMax: '₹10 LPA'
    },
    {
      title: 'Cloud Architect',
      company: 'SkyStruct',
      tlogo: 'https://logo.clearbit.com/skystruct.com',
      description: 'Design scalable cloud architectures on AWS and Azure.Ensure uptime and monitor critical production systems',
      experience: '5+ years',
      jobType: 'Full-time',
      status: 'open',
      location: 'Pune',
      salaryMax: '₹18 LPA'
    },
    {
      title: 'Blockchain Developer',
      company: 'BlockTrail',
      tlogo: 'https://logo.clearbit.com/blocktrail.com',
      description: 'Develop decentralized applications and smart contracts.Ensure uptime and monitor critical production systems',
      experience: '2-4 years',
      jobType: 'Full-time',
      status: 'open',
      location: 'Delhi',
      salaryMax: '₹15 LPA'
    },
    {
      title: 'Technical Support Engineer',
      company: 'HelpNest',
      tlogo: 'https://logo.clearbit.com/helpnest.com',
      description: 'Assist customers with technical issues and troubleshooting. Ensure uptime and monitor critical production systems',
      experience: '0-2 years',
      jobType: 'Full-time',
      status: 'open',
      location: 'Gurgaon',
      salaryMax: '₹5.2 LPA'
    },
    {
      title: 'Business Analyst',
      company: 'BizCraft',
      tlogo: 'https://logo.clearbit.com/bizcraft.com',
      description: 'Analyze business needs and propose data-driven solutions.Ensure uptime and monitor critical production systems',
      experience: '1-3 years',
      jobType: 'Full-time',
      status: 'open',
      location: 'Ahmedabad',
      salaryMax: '₹7.8 LPA'
    },
    {
      title: 'SRE (Site Reliability Engineer)',
      company: 'ScaleOps',
      tlogo: 'https://logo.clearbit.com/scaleops.com',
      description: 'Ensure uptime and monitor critical production systems. Ensure uptime and monitor critical production systems',
      experience: '3-5 years',
      jobType: 'Full-time',
      status: 'open',
      location: 'Noida',
      salaryMax: '₹13 LPA'
    },
    {
      title: 'Research Scientist',
      company: 'DeepCompute',
      tlogo: 'https://logo.clearbit.com/deepcompute.com',
      description: 'Conduct research in deep learning and NLP. Ensure uptime and monitor critical production systems',
      experience: '4-6 years',
      jobType: 'Full-time',
      status: 'open',
      location: 'Bangalore',
      salaryMax: '₹16 LPA'
    }
  
  
];

async function initializeData() {
  await connectDB();

  await Job.deleteMany({});
  await Job.insertMany(seedJobs);

  console.log('🌱 10 Jobs seeded successfully!');
  mongoose.disconnect();
}

initializeData();



