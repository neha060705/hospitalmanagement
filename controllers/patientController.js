
const Patient = require("../models/Patient");

exports.createPatient = async (req,res)=>{
  try{
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  }catch(err){
    res.status(400).json({message:err.message});
  }
};

exports.getPatients = async (req,res)=>{
  try{
    const patients = await Patient.find();
    res.json(patients);
  }catch(err){
    res.status(500).json({message:err.message});
  }
};

exports.getPatientById = async (req,res)=>{
  try{
    const patient = await Patient.findById(req.params.id);
    if(!patient) return res.status(404).json({message:"Patient not found"});
    res.json(patient);
  }catch(err){
    res.status(500).json({message:err.message});
  }
};

exports.updatePatient = async (req,res)=>{
  try{
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {new:true});
    if(!patient) return res.status(404).json({message:"Patient not found"});
    res.json(patient);
  }catch(err){
    res.status(400).json({message:err.message});
  }
};

exports.deletePatient = async (req,res)=>{
  try{
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if(!patient) return res.status(404).json({message:"Patient not found"});
    res.json({message:"Patient deleted"});
  }catch(err){
    res.status(500).json({message:err.message});
  }
};

exports.searchPatient = async (req,res)=>{
  try{
    const {name} = req.query;
    const patients = await Patient.find({
      fullName: {$regex:name, $options:"i"}
    });
    res.json(patients);
  }catch(err){
    res.status(500).json({message:err.message});
  }
};
