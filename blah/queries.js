const { request } = require('http') 
const fs = require('fs')
const weekday = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"]

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host:'localhost',
    database:'MiniProjS4',
    password:'Password',
    port:'5432'
})
 
const getUsers = (request, response) => {
  var {FROM_DATE,TO_DATE,FROM_TIME,TO_TIME,T_CODE} = (request.body)
    pool.query('SELECT * FROM CMPN_UPDATE_TABLE WHERE FROM_DATE=$1 AND TO_DATE=$2 AND FROM_TIME>=$3 AND TO_TIME<=$4 AND T_CODE=$5 ', [FROM_DATE,TO_DATE,FROM_TIME,TO_TIME,T_CODE], (error, results) => {
      if (error) {
        throw error
        }
        if (results.rows.length === 0) {
          getUserById(request, response);
        }
      response.status(200).json(results.rows)
    })
  }
  const getUserById = (request, response) => {
    const { FROM_DATE, TO_DATE , FROM_TIME, TO_TIME, T_CODE } = request.body;
    const d = new Date(FROM_DATE);
    const tablename = T_CODE + "_" + weekday[d.getDay()];
    
    const query = `SELECT * FROM ${tablename} WHERE FROM_TIME>=$1 AND TO_TIME<=$2`;
  
    pool.query(query, [FROM_TIME, TO_TIME], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });  
    console.log(tablename);
  }
  
  
  
  const createUser = (request, response) => {
    const { FROM_DATE,TO_DATE,FROM_TIME,TO_TIME,T_CODE,AVAILABLE,REASON } = request.body
  
    pool.query('INSERT INTO CMPN_UPDATE_TABLE VALUES ($1,$2,$3,$4,$5,$6,$7)', [FROM_DATE,TO_DATE,FROM_TIME,TO_TIME,T_CODE,AVAILABLE,REASON], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: $5`)
    })
  }
  
  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { FROM_DATE,TO_DATE,FROM_TIME,TO_TIME,T_CODE,AVAILABLE,REASON} = request.body
  
    pool.query(
      'UPDATE CMPN_UPDATE_TABLE SET FROM_TIME = $3, TO_TIME = $4,AVAILABLE=$6,REASON=$7 WHERE T_CODE = $5 and FROM_DATE=$1  and TO_DATE=$2',
      [FROM_DATE,TO_DATE,FROM_TIME,TO_TIME,T_CODE,AVAILABLE,REASON],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }
  
  const deleteUser = (request, response) => {
    const { from_date,to_date,t_code} = request.body
  
    pool.query('DELETE FROM cmpn_update_table WHERE d_code = $3  and from_date=$1  and to_date=$2', [from_date,to_date,t_code], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }
  
  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }

  