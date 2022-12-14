import pool from "../../config/db.js"
import * as queries from "./queries.js"

export const getPilots = (req,res) =>{
    pool.query(queries.getPilots,(error,results) => {
        if (error) res.status(404).json({message:error.message})
        else res.status(200).json(results.rows)
    })
}

export const getGroundServiceChiefs = (req,res) =>{
    pool.query(queries.getGroundServiceChiefs,(error,results) => {
        if (error) res.status(404).json({message:error.message})
        else res.status(200).json(results.rows)
    })
}

export const getCabinPersonels = (req,res) =>{
    pool.query(queries.getCabinPersonels,(error,results) => {
        if (error) res.status(404).json({message:error.message})
        else res.status(200).json(results.rows)
    })
}

export const getCabinPersonelsWithCrewId = (req,res) =>{
    const id = req.params.id ;
    pool.query(queries.getCabinPersonelsWithCrewId,[id],(error,results) => {
        if (error) res.status(404).json({message:error.message})
        else res.status(200).json(results.rows)
    })
}

export const getGroundServicePersonels = (req,res) =>{
    pool.query(queries.getGroundServicePersonels,(error,results) => {
        if (error) res.status(404).json({message:error.message})
        else res.status(200).json(results.rows)
    })
}

export const getGroundServicePersonelsWithCrewId = (req,res) =>{
    const id = req.params.id ;
    pool.query(queries.getGroundServicePersonelsWithCrewId,[id],(error,results) => {
        if (error) res.status(404).json({message:error.message})
        else res.status(200).json(results.rows)
    })
}

export const getCabinCrews = (req,res) =>{
    pool.query(queries.getCabinCrews,(error,results) => {
        if (error) res.status(404).json({message:error.message})
        else res.status(200).json(results.rows)
    })
}

export const getGroundServiceCrews = (req,res) =>{
    pool.query(queries.getGroundServiceCrews,(error,results) => {
        if (error) res.status(404).json({message:error.message})
        else res.status(200).json(results.rows)
    })
}

export const addPilot = (req,res) =>{
    const {yearStarted,email,dob,name,phone,nationality,salary} = req.body
    pool.query(queries.checkEmployeeExist,[email,phone],(error,results)=>{
        if(error) res.status(404).json({message:error.message})
        else if(results.rows.length) res.status(404).json({message:"Employee already exists."})
        else {
            pool.query(queries.addPilot,[yearStarted,email,dob,name,phone,nationality,salary],(error,results)=>{
                if(error) res.status(404).json({message:error.message})
                else res.status(201).json(results.rows)
            })
        }
    })
}

export const addGroundServiceChief = (req,res) =>{
    const {yearStarted,email,dob,name,phone,nationality,salary} = req.body
    pool.query(queries.checkEmployeeExist,[email,phone],(error,results)=>{
        if(error) res.status(404).json({message:error.message})
        else if(results.rows.length) res.status(404).json({message:"Employee already exists."})
        else {
            pool.query(queries.addGroundServiceChief,[yearStarted,email,dob,name,phone,nationality,salary],(error,results)=>{
                if(error) res.status(404).json({message:error.message})
                else res.status(201).json(results.rows)
            })
        }
    })
}

export const addGroundServicePersonel = (req,res) =>{
    const {email,dob,name,phone,nationality,salary,crewId} = req.body
    pool.query(queries.checkEmployeeExist,[email,phone],(error,results)=>{
        if(error) res.status(404).json({message:error.message})
        else if(results.rows.length) res.status(404).json({message:"Employee already exists."})
        else {
            pool.query(queries.addGroundServicePersonel,[email,dob,name,phone,nationality,salary,crewId],(error,results)=>{
                if(error) res.status(404).json({message:error.message})
                else res.status(201).json(results.rows)
            })
        }
    })
}

export const addCabinPersonel = (req,res) =>{
    const {email,dob,name,phone,nationality,salary,crewId} = req.body
    pool.query(queries.checkEmployeeExist,[email,phone],(error,results)=>{
        if(error) res.status(404).json({message:error.message})
        else if(results.rows.length) res.status(404).json({message:"Employee already exists."})
        else {
            pool.query(queries.addCabinPersonel,[email,dob,name,phone,nationality,salary,crewId],(error,results)=>{
                if(error) res.status(404).json({message:error.message})
                else res.status(201).json(results.rows)
            })
        }
    })
}

export const addCabinCrew = (req,res) =>{
    const {name,pilotId} = req.body
    pool.query(queries.checkCabinCrewExist,[name],(error,results)=>{
        if(error) res.status(404).json({message:error.message})
        else if(results.rows.length) res.status(404).json({message:"Cabin crew already exists."})
        else {
            pool.query(queries.addCabinCrew,[name,pilotId],(error,results)=>{
                if(error) res.status(404).json({message:error.message})
                else res.status(201).json(results.rows)
            })
        }
    })
}

export const addGroundServiceCrew = (req,res) =>{
    const {name,gsCheifId} = req.body
    pool.query(queries.checkGroundServiceCrewExist,[name],(error,results)=>{
        if(error) res.status(404).json({message:error.message})
        else if(results.rows.length) res.status(404).json({message:"Ground service crew already exists."})
        else {
            pool.query(queries.addGroundServiceCrew,[name,gsCheifId],(error,results)=>{
                if(error) res.status(404).json({message:error.message})
                else res.status(201).json(results.rows)
            })
        }
    })
}

export const update = (req,res) =>{
    const {id} = req.params
    const values = [req.body.name,req.body.code,req.body.city,req.body.country,req.body.planeCapacity,req.body.yearBuilt, req.body.airportManagementId,id]
    pool.query(queries.update,values,(error,results) => {
        if(error) res.status(404).json({message:error.message})
        else if(!results.rows.length) res.status(404).json({message:"Airport not found."})
        else res.status(200).json({updatedAirport:results.rows[0]})
    })
}

export const deleteOne = (req,res) =>{
    const {id} = req.params
    pool.query(queries.deleteOne,[id],(error,results) => {
        if(error) res.status(404).json({message:error.message})
        else if(!results.rows.length) res.status(404).json({message:"Airport not found."})
        else res.status(200).json({deletedAirport:results.rows[0]})
    })
}